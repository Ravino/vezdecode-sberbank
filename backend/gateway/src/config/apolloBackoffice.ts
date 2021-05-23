import path from "path";
import {readFileSync} from "fs";
import {ApolloServer, gql} from "apollo-server-express";
import {Container} from "typescript-ioc";
import { Application, Request } from 'express';
import {context} from './context';


import {QueryResolver} from '../resolver/backoffice/queryResolver';
import {RequestVacancyResolver} from '../resolver/backoffice/requestVacancyResolver';
import {RequestResponseResolver} from '../resolver/backoffice/requestResponseResolver';

import {MutationResolver} from '../resolver/backoffice/mutationResolver';
import {MutationResponseResolver} from '../resolver/backoffice/mutationResponseResolver';


import {VacancyView} from '../view/vacancyView';
import {ResponseView} from '../view/responseView';


import {VacancyListView} from '../view/vacancyListView';
import {ResponseListView} from '../view/responseListView';


const pathSchema: string = path.join(__dirname, "../graphql/main.graphql");
const schemaContent: string = readFileSync(pathSchema, {encoding: 'utf8'});
const typeDefs = gql`${ schemaContent }`;


const resolvers = {
  Query: {
    requestVacancy: () => Container.get(QueryResolver).requestVacancyResolver,
    requestResponse: () => Container.get(QueryResolver).requestResponseResolver
  },


  Mutation: {
    mutationResponse: () => Container.get(MutationResolver).mutationResponseResolver
  },


  RequestVacancy: {
    getList: (parent: RequestVacancyResolver, args: {status: string, size: number}, context: {user: any}) => parent.getList(args.status, args.size, context.user.userId),
    select: (parent: RequestVacancyResolver, args: {cursor: string, offset: number}) => parent.select(args.cursor, args.offset)
  },


  RequestResponse: {
    getList: (parent: RequestResponseResolver, args: {status: string, size: number}, context: {user: any}) => parent.getList(args.status, args.size, context.user.userId),
    select: (parent: RequestResponseResolver, args: {cursor: string, offset: number}) => parent.select(args.cursor, args.offset)
  },


  MutationResponse: {
    add: (parent: MutationResponseResolver, args: {vacancyId: number}, context: {user: any}) => parent.add(context.user.userId, args.vacancyId),
    remove: (parent: MutationResponseResolver, args: {responseId: number}, context: {user: any}) => parent.remove(context.user.userId, args.responseId)
  },


  VacancyList: {
    count: (parent: VacancyListView) => parent.count(),
    items: (parent: VacancyListView) => parent.items()
  },


  ResponseList: {
    count: (parent: ResponseListView) => parent.count(),
    items: (parent: ResponseListView) => parent.items()
  }
};


const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  tracing: true
});

export function apolloBackofficeInitialization(app: Application) {
  apolloServer.applyMiddleware({
    app,
    path: "/graphql/backoffice"
  });
}
