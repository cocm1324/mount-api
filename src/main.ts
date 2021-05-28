import 'reflect-metadata';

import { ExpressService, OrmService, ResponseService } from '@services';
import { AboutUs, Page, Course, Notice, Banner, Category, Content, Image, ImageLink } from '@models/entities';
import { Repository } from 'typeorm';

import { ImageRouter, ImageService } from '@routers/image';
import { PageRouter, PageService } from '@routers/page';
import { CategoryRouter, CategoryService } from '@routers/category';
import { ContentRouter, ContentService } from '@routers/content';
import { BASE_ROUTE } from './models/constants';

const ormService = new OrmService([ AboutUs, Page, Course, Notice, Banner, Category, Content, Image, ImageLink ]);
const expressService = new ExpressService();

const responseService = new ResponseService();

ormService.getConnection().then(connection => {

    const imageRepository: Repository<Image> = connection.getRepository(Image);
    const imageService: ImageService = new ImageService(imageRepository, responseService);
    const imageRouter: ImageRouter = new ImageRouter(imageService, BASE_ROUTE.IMAGE);
    expressService.registerRouter(imageRouter);
    
    const pageRepository: Repository<Page> = connection.getRepository(Page);
    const courseRepository: Repository<Course> = connection.getRepository(Course);
    const pageService: PageService = new PageService(pageRepository, courseRepository, responseService);
    const pageRouter: PageRouter = new PageRouter(pageService, BASE_ROUTE.PAGE);
    expressService.registerRouter(pageRouter);
    
    const categoryRepository: Repository<Category> = connection.getRepository(Category);
    const categoryService: CategoryService = new CategoryService(categoryRepository, responseService);
    const categoryRouter: CategoryRouter = new CategoryRouter(categoryService, BASE_ROUTE.CATEGORY);
    expressService.registerRouter(categoryRouter);
    
    const contentRepository: Repository<Content> = connection.getRepository(Content);
    const contentService: ContentService = new ContentService(contentRepository, responseService);
    const contentRouter: ContentRouter = new ContentRouter(contentService, BASE_ROUTE.CONTENT);
    expressService.registerRouter(contentRouter);

    expressService.registerStatic('assets/image', '/static/image');
    expressService.startServer();
});
