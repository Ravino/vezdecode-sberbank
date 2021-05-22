import { tarantool } from '../config/tarantool';


export class DivisionService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let divisionsList: any[] = [];
    try {
      divisionsList = await tarantool.sql(`select * from divisions where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    let division: any = divisionsList[0];
    return division;
  }
}
