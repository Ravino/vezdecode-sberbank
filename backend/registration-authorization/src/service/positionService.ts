import { tarantool } from '../config/tarantool';


export class PositionService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let positionsList: any[] = [];
    try {
      positionsList = await tarantool.sql(`select * from positions where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    let position: any = positionsList[0];
    return position;
  }
}
