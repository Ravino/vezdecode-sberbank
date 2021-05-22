import path from "path";
import {readFileSync} from "fs";
import {ApolloServer, gql} from "apollo-server-express";
import {Container} from "typescript-ioc";
import { Application, Request } from 'express';
import {context} from './context';


import {QueryResolver} from '../resolver/queryResolver';
import {RequestVacancyResolver} from '../resolver/requestVacancyResolver';


import {VacancyView} from '../view/vacancyView';

import {VacancyListView} from '../view/vacancyListView';


const pathSchema: string = path.join(__dirname, "../graphql/main.graphql");
const schemaContent: string = readFileSync(pathSchema, {encoding: 'utf8'});
const typeDefs = gql`${ schemaContent }`;


const resolvers = {
  Query: {
    requestVacancy: () => Container.get(QueryResolver).requestVacancyResolver
  },


  RequestVacancy: {
    getList: (parent: RequestVacancyResolver, args: {size: number}, context: {user: any}) => parent.getList(context.user.userId, args.size),
    select: (parent: RequestVacancyResolver, args: {cursor: string, offset: number}) => parent.select(args.cursor, args.offset)
  },


  VacancyList: {
    count: (parent: VacancyListView) => parent.count(),
    items: (parent: VacancyListView) => parent.items()
  }
};


const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  tracing: true
});

export function apolloGatewayInitialization(app: Application) {
  apolloServer.applyMiddleware({
    app,
    path: "/graphql/gateway"
  });
}
