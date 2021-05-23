import { tarantool } from '../config/tarantool';
import { v4 as uuidV4 } from 'uuid';


export class ResponseService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let responsesList: any[] = [];
    try {
      responsesList = await tarantool.sql(`select * from responses where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    let response: any = responsesList[0];
    return response;
  }


  public async getListByUserId(status: string, userId: number, size: number, offset: number): Promise<any[]|undefined> {

    const bindParams: any[] = [
      status,
      userId,
      size,
      offset
    ];


    let responsesList: any[] = [];
    try {
      responsesList = await tarantool.sql(`select * from responses where status=? and user_id=? order by response_id limit ? offset ?`, bindParams);
    }
    catch(err) {
      console.log(err);
    }


    if(!responsesList[0]) {
      return undefined;
    }


    return responsesList;
  }


  public async countByUserId(status: string, userId: number): Promise<number> {

    const bindParams: any[] = [
      status,
      userId
    ];


    let count: any[] = [];
    try {
      count = await tarantool.sql(`select count(response_id) from responses where status=? and user_id=?`, bindParams);
    }
    catch(err) {
      console.log(err);
    }


    if(!count[0]) {
      return 0;
    }


    return count[0].COLUMN_1;
  }


  public async remove(responseId: number, userId: number): Promise<boolean> {

    const bindParams: any[] = [
      responseId,
      userId,
      'await'
    ];


    let result: any;
    try {
      result = await tarantool.sql(`delete from responses where response_id=? and user_id=? and status=?`, bindParams);
    }
    catch(err) {
      console.log(err);
    }


    console.log(result);
    return true;
  }


  public async create(vacancyId: number, userId: number): Promise<boolean> {

    const currentAt: number = Date.now();


    const bindParams: any[] = [
      vacancyId,
      userId,
      currentAt,
      currentAt,
      'await',
      uuidV4()
    ];


    let result: any;
    try {
      result = await tarantool.sql(`insert into responses (vacancy_id, user_id, created_at, updated_at, status, uuid) values(?, ?, ?, ?, ?, ?)`, bindParams);
    }
    catch(err) {
      console.log(err);
      return false
    }


    return true;
  }


  public async setCommentId(vacancyId: number, userId: number, commentId: number): Promise<boolean> {

    const bindParams: any[] = [
      commentId,
      vacancyId,
      userId
    ];


    try {
      await tarantool.sql(`update responses set comment_id=? where vacancy_id=? and user_id=?`, bindParams);
    }
    catch(err) {
      console.log(err);
      return false;
    }


    return true;
  }
}
