import {Request, Response} from 'express';


export const context = async (app: {req: Request, res: Response}) => {

  const user = app.res.locals.user;;


  const result = {
    user
  };


  return result;
};
