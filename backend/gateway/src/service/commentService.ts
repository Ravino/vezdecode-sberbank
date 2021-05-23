import { tarantool } from '../config/tarantool';
import { v4 as uuidV4 } from 'uuid';


export class CommentService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let responsesList: any[] = [];
    try {
      responsesList = await tarantool.sql(`select * from comments where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    let response: any = responsesList[0];
    return response;
  }
}
