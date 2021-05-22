import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { AccessMiddleware } from '../middleware/accessMiddleware';


export class GraphqlRouter {

  public middleware(req: Request, res: Response, next: NextFunction): any {
    Container.get(AccessMiddleware).checkExistSession(req, res, next);
    return undefined;
  }


  public handler(): any {
    return (req: Request, res: Response) => {}
  }
}
