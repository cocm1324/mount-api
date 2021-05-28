import { Content } from "@src/models/entities";
import { ControllerFn } from "@src/models/types";
import { ResponseService } from "@src/services";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export class ContentService {
    constructor(
        private contentRepository: Repository<Content>,
        private responseService: ResponseService
    ) { }

    list(): ControllerFn {


        return (req: Request, res: Response) => {

        }
    }

    create(): ControllerFn {
        

        return (req: Request, res: Response) => {

        }
    }

    update(): ControllerFn {
        

        return (req: Request, res: Response) => {

        }
    }

    delete(): ControllerFn {
        

        return (req: Request, res: Response) => {

        }
    }

    upSeq(): ControllerFn {
        

        return (req: Request, res: Response) => {

        }
    }

    downSeq(): ControllerFn {
        

        return (req: Request, res: Response) => {

        }
    }
}