import { CreateCategoryInput } from "@src/models/dtos";
import { Category } from "@src/models/entities";
import { ControllerFn } from "@src/models/types";
import { ResponseService } from "@src/services";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { getDownSequence, getNextSequence, getUpSequence, sortBySequence } from '@models/functions';


export class CategoryService {
    constructor(
        private categoryRepository: Repository<Category>,
        private responseService: ResponseService
    ) { }

    listCategory(): ControllerFn {
        const responseService = this.responseService;
        const categoryRepository = this.categoryRepository;

        return (_: Request, res: Response) => {
            return categoryRepository.find().then(result => {
                result.sort(sortBySequence);
                res.send(responseService.Success(result));
            });
        }
    }

    createCategory(): ControllerFn {
        const responseService = this.responseService;
        const categoryRepository = this.categoryRepository;

        return ({ body: _createCategoryInput }: Request, res: Response) => {
            const createCategoryInput = plainToClass(CreateCategoryInput, _createCategoryInput);
            validate(createCategoryInput).then(validationErrors => {
                const [ validationError ] = validationErrors;
                if (validationError) {
                    const { constraints } = validationError;
                    res.send(responseService.BadRequest(JSON.stringify(constraints)));
                    return;
                };
                return categoryRepository.find();
            }).then(result => {
                const { seq, seqBase } = getNextSequence(result);
                createCategoryInput['seq'] = seq;
                createCategoryInput['seqBase'] = seqBase;
                return categoryRepository.insert(createCategoryInput);
            }).then(result => {
                const { identifiers: [ { id } ] } = result;
                res.send(responseService.Success(id));
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            });
        }
    }

    deleteCategory(): ControllerFn {
        const responseService = this.responseService;
        const categoryRepository = this.categoryRepository;

        return ({ params: { id } }: Request, res: Response) => {
            return categoryRepository.delete(id).then(_ => {
                res.send(responseService.Success(true));
            });
        }
    }

    runUpSequence(): ControllerFn {
        const responseService = this.responseService;
        const categoryRepository = this.categoryRepository;

        return ({ params: { id } }: Request, res: Response) => {
            return categoryRepository.find().then(result => {
                const [ target ] = result.filter(element => element.id === id);

                const { seq, seqBase } = getUpSequence(result, target);

                return categoryRepository.update(id, { seq, seqBase });
            }).then(_ => {
                res.send(responseService.Success(id));
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            });
        }
    }

    runDownSequence(): ControllerFn {
        const responseService = this.responseService;
        const categoryRepository = this.categoryRepository;

        return ({ params: { id } }: Request, res: Response) => {
            return categoryRepository.find().then(result => {
                const [ target ] = result.filter(element => element.id === id);

                const { seq, seqBase } = getDownSequence(result, target);

                return categoryRepository.update(id, { seq, seqBase });
            }).then(_ => {
                res.send(responseService.Success(id));
            }).catch(error => {
                res.send(responseService.InternalServerError(JSON.stringify(error)));
            });
        }
    }
}