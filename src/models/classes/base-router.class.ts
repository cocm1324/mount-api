import * as Express from 'express';
import { Router } from 'express';

import { ControllerFn } from '@models/types';

export class BaseRouter {

    private _router: Router;

    get router() {
        return this._router;
    }

    get path() {
        return this._path;
    }

    constructor(private _path: string) {
        this._router = Express.Router();
    }

    protected registerGet(endpoint: string, controllerFn: ControllerFn) {
        this._router.get(endpoint, controllerFn);
    }

    protected registerPost(endpoint: string, controllerFn: ControllerFn) {
        this._router.get(endpoint, controllerFn);
    }

    protected registerPut(endpoint: string, controllerFn: ControllerFn) {
        this._router.get(endpoint, controllerFn);
    }

    protected registerDelete(endpoint: string, controllerFn: ControllerFn) {
        this._router.get(endpoint, controllerFn);
    }

}