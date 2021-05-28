import { BaseRouter } from "@models/classes";
import { CategoryService } from "./category.service";

export class CategoryRouter extends BaseRouter {
    constructor(private service: CategoryService, path: string) {
        super(path);

        this.registerGet('/', this.service.listCategory());
        this.registerPost('/', this.service.createCategory());
        this.registerDelete('/:id', this.service.deleteCategory());
        this.registerPost('/:id/upSeq', this.service.runUpSequence());
        this.registerPost('/:id/downSeq', this.service.runDownSequence());
    }
}