import 'reflect-metadata';

import { OrmService } from '@services';
import { AboutUs, Page, Course, Notice } from '@entities';

const ormService = new OrmService([ AboutUs, Page, Course, Notice ]);

ormService.getConnection().then(result => {
    console.log('yay');
})
