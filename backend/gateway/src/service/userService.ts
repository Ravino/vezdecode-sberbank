import { tarantool } from '../config/tarantool';
import { v4 as uuidV4 } from 'uuid';


export class UserService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let usersList: any[] = [];
    try {
      usersList = await tarantool.sql(`select * from users where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    let user: any = usersList[0];
    return user;
  }


  public async getList(size: number, offset: number): Promise<any[]> {

    const bindParams: any[] = [
      size,
      offset
    ];


    let result: any[] = [];
    try {
      result = await tarantool.sql(`select * from users order by user_id desc limit ? offset ?`, bindParams);
    }
    catch(err) {
      console.log(err);
    }


    return result;
  }
}
