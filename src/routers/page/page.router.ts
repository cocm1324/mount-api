import { BaseRouter } from "@models/classes";
import { PageService } from "./page.service";

export class PageRouter extends BaseRouter {
    
    constructor(private service: PageService, path: string) {
        super(path);

        /**
         * Get to list all (use queries to filter by type, category, no pagination)
         * Get Id to retrieve detail of page
         * Post to create page
         * Delete to Delete page
         */

        this.registerGet('/', this.service.listPage());
        this.registerGet('/:id', this.service.getPage());
        this.registerPost('/', this.service.create());
        this.registerDelete('/:id', this.service.delete());
    }
}