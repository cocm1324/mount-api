import { CreateContentInput, GetContentQuery, UpdateContentInput, UpdateContentParam } from "@src/models/dtos";
import { Content } from "@src/models/entities";
import { getDownSequence, getNextSequence, getUpSequence } from "@src/models/functions";
import { ControllerFn } from "@src/models/types";
import { ResponseService } from "@src/services";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class ContentService {
    constructor(
        private contentRepository: Repository<Content>,
        private responseService: ResponseService
    ) { }

    list(): ControllerFn {
        const responseService = this.responseService;
        const contentRepository = this.contentRepository;

        return ({ query: _getContentQuery }: Request, res: Response) => {
            const getContentQuery: GetContentQuery = plainToClass(GetContentQuery, _getContentQuery);
            validate(getContentQuery).then(validationErrors => {
                const [ validationError ] = validationErrors;
                if (validationError) {
                    const { constraints } = validationError;
                    res.send(responseService.BadRequest(JSON.stringify(constraints)));
                    return;
                };

                const { page } = getContentQuery;
                contentRepository.find({ where: { page } }).then(result => {
                    res.send(responseService.Success(result));
                }).catch(error => {
                    res.send(responseService.InternalServerError(JSON.stringify(error)));
                })
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            })
        }
    }

    create(): ControllerFn {
        const responseService = this.responseService;
        const contentRepository = this.contentRepository;

        return ({ body: _createContentInput }: Request, res: Response) => {
            const createContentInput: CreateContentInput = plainToClass(CreateContentInput, _createContentInput);
            validate(createContentInput).then(validationErrors => {
                const [ validationError ] = validationErrors;
                if (validationError) {
                    const { constraints } = validationError;
                    res.send(responseService.BadRequest(JSON.stringify(constraints)));
                    return;
                };

                const page = createContentInput.page.id;
                contentRepository.find({ where: { page } }).then(result => {
                    const { seq, seqBase } = getNextSequence(result);
                    createContentInput.seq = seq;
                    createContentInput.seqBase = seqBase;
                    return contentRepository.save(createContentInput);
                }).then(result => {
                    const { id } = result;
                    res.send(responseService.Success(id));
                }).catch(error => {
                    res.send(responseService.InternalServerError(JSON.stringify(error)));
                })
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            })
        }
    }

    update(): ControllerFn {
        const responseService = this.responseService;
        const contentRepository = this.contentRepository;

        return ({ body: updateContentInput, params: { id } }: Request, res: Response) => {
            contentRepository.update({ id }, updateContentInput).then(_ => {
                res.send(responseService.Success(true));
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            });
        }
    }

    delete(): ControllerFn {
        const responseService = this.responseService;
        const contentRepository = this.contentRepository;

        return ({ params: { id } }: Request, res: Response) => {
            contentRepository.delete({ id }).then(_ => {
                res.send(responseService.Success(true));
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            });
        }
    }

    upSeq(): ControllerFn {
        const responseService = this.responseService;
        const contentRepository = this.contentRepository;

        return ({ params: { id } }: Request, res: Response) => {
            let target;
            contentRepository.findOne(id).then(result => {
                const { page } = result;
                target = result;
                return contentRepository.find({ where: { page } });
            }).then(result => {
                const nextSequence = getUpSequence(result, target);
                return contentRepository.update({ id }, nextSequence);
            }).then(_ => {
                res.send(responseService.Success(true));
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            });
        }
    }

    downSeq(): ControllerFn {
        const responseService = this.responseService;
        const contentRepository = this.contentRepository;

        return ({ params: { id } }: Request, res: Response) => {
            let target;
            contentRepository.findOne(id).then(result => {
                const { page } = result;
                target = result;
                return contentRepository.find({ where: { page } });
            }).then(result => {
                const nextSequence = getDownSequence(result, target);
                return contentRepository.update({ id }, nextSequence);
            }).then(_ => {
                res.send(responseService.Success(true));
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            });
        }
    }
}