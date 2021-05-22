import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';
import { GraphqlRouter } from '../router/graphqlRouter';


const router: Router = Router();


router.use('/graphql',
  Container.get(GraphqlRouter).middleware
//  Container.get(GraphqlRouter).handler()
);


export function routerInitialization(server: Application) {
  server.use(router);
}
