import { CreatePageInput } from "@src/models/dtos";
import { AboutUs, Banner, Course, Image, Notice, Page } from "@src/models/entities";
import { PAGE_TYPE } from "@src/models/enums";
import { getNextSequence } from "@src/models/functions";
import { ControllerFn } from "@src/models/types";
import { ResponseService } from "@src/services";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class PageService {

    constructor(
        private pageRepository: Repository<Page>,
        private courseRepository: Repository<Course>,
        private responseService: ResponseService
    ) { }

    listPage(): ControllerFn {
        return (req: Request, res: Response) => {

        }
    }

    create(): ControllerFn {

        const pageRepository = this.pageRepository;
        const courseRepository = this.courseRepository;
        const responseService = this.responseService;

        return ({ body: _createPageInput }: Request, res: Response) => {
            _createPageInput.banner = {};
            const createPageInput = plainToClass(CreatePageInput, _createPageInput);
            validate(createPageInput).then(validationErrors => {
                const [ validationError ] = validationErrors;
                if (validationError) {
                    const { constraints } = validationError;
                    res.send(responseService.BadRequest(JSON.stringify(constraints)));
                    return;
                }

                if (createPageInput.type === PAGE_TYPE.COURSE) {
                    return courseRepository.find().then(result => {
                        const { seq, seqBase } = getNextSequence(result);
                        createPageInput.course.seq = seq;
                        createPageInput.course.seqBase = seqBase;

                        return pageRepository.save(createPageInput);
                    });
                } else {
                    return pageRepository.save(createPageInput);
                }
            }).then(result => {
                const { id } = result;
                res.send(responseService.Success(id));
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            });
        }
    }

    getPage(): ControllerFn {
        return (req: Request, res: Response) => {

        }
    }

    delete(): ControllerFn {
        return (req: Request, res: Response) => {

        }
    }
}