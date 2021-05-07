import { Repository } from "typeorm";
import { Request, Response } from 'express';
import { UploadedFile } from "express-fileupload";

import { Image } from "@models/entities";
import { ResponseService } from "@src/services";
import { CreateImageInput, GetImageOutput } from '@models/dtos';

import sharp from 'sharp';
import { ControllerFn } from "@src/models/types";

import getPixels from 'get-pixels';

export class ImageService {

    constructor(
        private imageRepository: Repository<Image>,
        private responseService: ResponseService
    ) { }

    listImage(): ControllerFn { 
        const responseService = this.responseService;
        const imageRepository = this.imageRepository;
        const imageToImageOutput = this.imageToImageOutput;

        return (_: Request, res: Response) => {
            imageRepository.findAndCount().then(result => {
                const [ images, rowCount ] = result;
                const data = images.map(imageToImageOutput);
                res.send(responseService.SuccessWithCount(data, rowCount));
            }).catch(error => {
                res.send(responseService.InternalServerError(error));
            });
        }
    }

    createImage(): ControllerFn {
        const responseService = this.responseService;
        const imageRepository = this.imageRepository;
        const splitFileName = this.splitFileName;

        return (req: Request, res: Response) => {
            
            if (!req.files) {
                res.send(responseService.BadRequest('No file uploaded'));
                return;
            }

            const THUMBNAIL_WIDTH = 480;
            const { files: { upload } } = req;

            let file: UploadedFile;
            if (Array.isArray(upload)) {
                file = upload[0];
            } else {
                file = upload;
            }

            const [ originalFileName, fileExtension ] = splitFileName(file.name);

            if (file.mimetype.split('/')[0] !== 'image') {
                res.send(responseService.BadRequest('should be in image format'));
                return;
            }

            const imageInfo = {
                fileName: file.name,
                id: null,
                url: null,
                thumbnailUrl: null
            }

            const image: CreateImageInput = { name: originalFileName, extension: fileExtension };

            imageRepository.insert(image).then(result => {
                const { identifiers: [ { id: fileName } ] } = result;

                imageInfo.id = fileName;
                imageInfo.url = `/api/static/image/${fileName}.${fileExtension}`;
                imageInfo.thumbnailUrl = `/api/static/image/thumbnail/${fileName}.${fileExtension}`;

                file.mv(`./assets/image/${fileName}.${fileExtension}`);
                return sharp(file.data).resize({ 
                    width: THUMBNAIL_WIDTH, 
                    fit: sharp.fit.cover 
                }).toFile(`./assets/image/thumbnail/${fileName}.${fileExtension}`);
            }).then(_ => {
                res.send(responseService.Success(imageInfo));
            }).catch(error => {
                res.send(responseService.FailedToSave(error));
            });
        }
    }

    deleteImage(): ControllerFn {
        const responseService = this.responseService;
        const imageRepository = this.imageRepository;
        
        return (req: Request, res: Response) => {
            const { id } = req.params;

            imageRepository.delete({ id }).then(result => {
                console.log(result);
                res.send(responseService.Success());
            }).catch(error => {
                console.log(error);
                res.send(responseService.DeleteRestrictedError());
            });
        }
    }

    runEyeDrop(): ControllerFn {

        const responseService = this.responseService;
        const imageRepository = this.imageRepository;

        const rgbToHex = (r, g, b) => {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        const componentToHex = (c) => {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        const getPixel = (path: string): Promise<any> => {
            return new Promise((resolve, reject) => {
                getPixels(path, (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
            });
        }

        return (req: Request, res: Response) => {
            const { id } = req.params;
            const { x, y, width, height } = req.body;

            if (!id || !x || !y || !width || ! height) {
                res.send(responseService.BadRequest());
                return;
            }

            imageRepository.findOne(id).then(result => {
                const { id, extension } = result;
                return getPixel(`./assets/image/thumbnail/${id}.${extension}`).catch(_ => {
                    return getPixel(`./assets/image/${id}.${extension}`);
                });
            }).then(result => {
                const tx = Math.round((x * result.shape[0]) / width);
                const ty = Math.round((y * result.shape[1]) / height);
                const target = (ty * result.shape[0] * result.shape[2]) + (tx * result.shape[2]);
                const pixels = [ ...result.data ];

                const r = pixels[ target];
                const g = pixels[ target + 1 ];
                const b = pixels[ target + 2 ];
                const a = pixels[ target + 3 ];

                const code = rgbToHex(r, g, b);

                res.send(responseService.Success(code));
            }).catch(error => {
                res.send(responseService.InternalServerError(error));
            });
        }
    }

    private splitFileName(fileName: any): string[] {
        if (typeof fileName !== 'string') {
            throw new TypeError(`type '${typeof fileName}' cannot be assigned to type 'string'`);
        }

        let dotIndex = -1;

        for (let i = fileName.length - 1; i >= 0; i--) {
            if (fileName.charAt(i) === '.') {
                dotIndex = i;
                break;
            }
        }
        
        if (dotIndex == -1) {
            return [ fileName, undefined ];
        }

        if (dotIndex == fileName.length - 1) {
            return [ fileName.slice(0, dotIndex), undefined ];
        } else {
            return [ fileName.slice(0, dotIndex), fileName.slice(dotIndex + 1, fileName.length) ];
        }
    }

    private imageToImageOutput(image: Image): GetImageOutput {
        const { id, extension } = image;
        const data: GetImageOutput = {
            ...image,
            url: `/api/static/image/${id}.${extension}`,
            thumbnailUrl: `/api/static/image/thumbnail/${id}.${extension}`
        }
        return data;
    } 
}