import 'reflect-metadata';

import { ExpressService, OrmService, ResponseService } from '@services';
import { AboutUs, Page, Course, Notice, Banner, Category, Content, Image, ImageLink } from '@models/entities';
import { Repository } from 'typeorm';

import { ImageRouter, ImageService } from '@routers/image';
import { BASE_ROUTE } from './models/constants';

const ormService = new OrmService([ AboutUs, Page, Course, Notice, Banner, Category, Content, Image, ImageLink ]);
const expressService = new ExpressService();

const responseService = new ResponseService();

ormService.getConnection().then(connection => {

    const imageRepository: Repository<Image> = connection.getRepository(Image);
    const imageService: ImageService = new ImageService(imageRepository, responseService);
    const imageRouter: ImageRouter = new ImageRouter(imageService, BASE_ROUTE.IMAGE);

    expressService.registerRouter(imageRouter);
    expressService.registerStatic('assets/image', '/static/image');
    expressService.startServer();
});
