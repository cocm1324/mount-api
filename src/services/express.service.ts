import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';

import { Router, Request, Response, Express } from 'express';

import { BaseRouter } from '@models/classes';
import { BASE_ROUTE } from '@models/constants';

const SERVER_PORT = process.env.SERVER_PORT;

export class ExpressService {

    app: Express;
    rootRouter: Router;

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

    healthCheck(req: Request, res: Response) {
        res.send('Hello from API');
    }

    registerRouter(routerInstance: BaseRouter) {
        const path = routerInstance.path;
        const router = routerInstance.router;
        this.app.use(path, router);
    }

    startServer() {
        this.app.listen(parseInt(SERVER_PORT), () => {
            console.log(`API Server is Listening on Port ${SERVER_PORT}`);
        });
    }
}