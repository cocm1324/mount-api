import { Repository } from "typeorm";
import { Image } from "@models/entities";
import { Request, Response } from 'express';


export class ImageService {

    constructor(private imageRepository: Repository<Image>) {

    }

    listImage(req: Request, res: Response) {

    }

    createImage(req: Request, res: Response) {

    }

    deleteImage(req: Request, res: Response) {
    
    }

    runEyeDrop(req: Request, res: Response) {
    
    }
}