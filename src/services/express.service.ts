import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { Router, Request, Response, Express } from 'express';

import { BaseRouter } from '@models/classes';
import { BASE_ROUTE } from '@models/constants';

const SERVER_PORT = process.env.SERVER_PORT;

export class ExpressService {

    private app: Express;
    private rootRouter: Router;

    constructor() {

        this.app = express();

        this.app.use(fileUpload({
            createParentPath: true,
            limits: { fileSize: 20 * 1024 * 1024 }
        }));

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.get(BASE_ROUTE.ROOT, this.healthCheck);
    }

    private healthCheck(_: Request, res: Response) {
        res.send('Hello from API');
    }

    registerRouter(routerInstance: BaseRouter) {
        const path = routerInstance.path;
        const router = routerInstance.router;
        this.app.use(path, router);
    }

    registerStatic(actualPath: string, mappedPath: string) {
        this.app.use(mappedPath, express.static(actualPath));
    }

    startServer() {
        this.app.listen(parseInt(SERVER_PORT), () => {
            console.log(`API Server is Listening on Port ${SERVER_PORT}`);
        });
    }
}