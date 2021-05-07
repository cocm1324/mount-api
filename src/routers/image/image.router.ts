import { BaseRouter } from "@models/classes";
import { ImageService } from "./image.service";

export class ImageRouter extends BaseRouter {
    
    constructor(private service: ImageService, path: string) {
        super(path);

        this.registerGet('/', this.service.listImage());
        this.registerPost('/', this.service.createImage());
        this.registerDelete('/:id', this.service.deleteImage());
        this.registerPost('/:id/eyeDrop', this.service.runEyeDrop());
    }
}