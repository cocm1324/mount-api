import { Page } from "@src/models/entities";
import { ControllerFn } from "@src/models/types";
import { ResponseService } from "@src/services";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class PageService {

    constructor(
        private pageRepository: Repository<Page>,
        private responseService: ResponseService
    ) { }

    listPage(): ControllerFn {
        return (req: Request, res: Response) => {

        }
    }

    create(): ControllerFn {
        return (req: Request, res: Response) => {

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