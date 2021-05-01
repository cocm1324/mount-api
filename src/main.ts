import 'reflect-metadata';

import { OrmService } from '@services';
import { AboutUs, Page, Course, Notice, Banner, Category, Content, Image, ImageLink } from '@entities';

const ormService = new OrmService([ AboutUs, Page, Course, Notice, Banner, Category, Content, Image, ImageLink ]);

ormService.getConnection().then(result => {
    console.log('yay');
})
