import 'reflect-metadata';

import { ExpressService, OrmService } from '@services';
import { AboutUs, Page, Course, Notice, Banner, Category, Content, Image, ImageLink } from '@models/entities';
import { Repository } from 'typeorm';

import { ImageRouter, ImageService } from '@routers/image';

const ormService = new OrmService([ AboutUs, Page, Course, Notice, Banner, Category, Content, Image, ImageLink ]);
const expressService = new ExpressService();

ormService.getConnection().then(connection => {

    const imageRepository: Repository<Image> = connection.getRepository(Image);
    const imageService: ImageService = new ImageService(imageRepository);
    const imageRouter: ImageRouter = new ImageRouter(imageService, '/image');

    expressService.registerRouter(imageRouter);





    expressService.startServer();
});
