import { Application } from 'express';
import cors from 'cors';


const conf = {
  credentials: true,
  origin: ['http://localhost:8080'] //String(global.process.env.CORS_ORIGIN).split(',')
};


export function corsInitialization(server: Application) {
  server.use(cors(conf));
  return undefined;
}
