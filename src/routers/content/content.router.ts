import { BaseRouter } from "@models/classes";
import { ContentService } from "./content.service";

export class ContentRouter extends BaseRouter {
    constructor(private service: ContentService, path: string) {
        super(path);

        this.registerGet('/', this.service.list());
        this.registerPost('/', this.service.create());
        this.registerPut('/:id', this.service.update());
        this.registerDelete('/:id', this.service.delete());
        this.registerPost('/:id/upSeq', this.service.upSeq());
        this.registerPost('/:id/downSeq', this.service.downSeq());
    }
}