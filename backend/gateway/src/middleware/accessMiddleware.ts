import {Inject} from 'typescript-ioc';
import trim from 'trim';
import { confSetCookie } from '../config/cookieParser';
import { Request, Response, NextFunction } from 'express';
import {JWTService} from '../service/jwtService';
import { StatusView } from '../view/statusView';


export class AccessMiddleware {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly jwtService: JWTService
  ) {}


  public async checkExistSession(req: Request, res: Response, next: NextFunction): Promise<any> {

    let accessToken: string = req.signedCookies[confSetCookie.nameCookie] || '';
    accessToken = trim(accessToken);


    if(!accessToken) {
      this.statusView.addStatus('notAuthenticate');
      res.json(this.statusView);
      return undefined;
    }


    const verifyToken: boolean = await this.jwtService.verify(accessToken);
    if(!verifyToken) {
      this.statusView.addStatus('notAuthenticate');
      res.json(this.statusView);
      return undefined;
    }


    const result = await this.jwtService.decode(accessToken);
    if(!result) {
      this.statusView.addStatus('notAuthenticate');
      res.json(this.statusView);
      return undefined;
    }


    res.locals.user = result;
    next();
    return undefined;
  }


  public stub(req: Request, res: Response, next:NextFunction): any {
    res.sendStatus(403)
    return undefined;
  }
}
