import { tarantool } from '../config/tarantool';
import { v4 as uuidV4 } from 'uuid';


export class VacancyService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let vacanciesList: any[] = [];
    try {
      vacanciesList = await tarantool.sql(`select * from vacancies where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    let vacancy: any = vacanciesList[0];
    return vacancy;
  }


  public async getList(size: number, offset: number): Promise<any[]|undefined> {

    const bindParams: any[] = [
      size,
      offset
    ];


    let vacanciesList: any[] = [];
    try {
      vacanciesList = await tarantool.sql(`select * from vacancies order by vacancy_id limit ? offset ?`, bindParams);
    }
    catch(err) {
      console.log(err);
    }


    if(!vacanciesList[0]) {
      return undefined;
    }


    return vacanciesList;
  }


  public async count(): Promise<number> {

    let count: number = 0;
    try {
      count = await tarantool.sql(`select count(vacancy_id) from vacancies`);
    }
    catch(err) {
      console.log(err);
    }


    return count;
  }
}
