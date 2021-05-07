import { BaseRouter } from "@models/classes";
import { PageService } from "./page.service";

export class PageRouter extends BaseRouter {
    
    constructor(private service: PageService, path: string) {
        super(path);

        this.registerGet('/', this.service.listPage());
        this.registerGet('/:id', this.service.getPage());
        this.registerPost('/', this.service.create());
        this.registerDelete('/:id', this.service.delete());
    }
}