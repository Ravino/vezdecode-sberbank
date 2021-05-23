import express from 'express';
import { cookieParserInitialization } from './cookieParser';
import { bodyParserInitialization } from './bodyParser';
import {routerInitialization} from './router';
import {apolloGatewayInitialization} from './apolloGateway';
import {apolloBackofficeInitialization} from './apolloBackoffice';


export const server: express.Application = express();


cookieParserInitialization(server);
bodyParserInitialization(server);
routerInitialization(server);
apolloGatewayInitialization(server);
apolloBackofficeInitialization(server);
