import {Inject, Singleton} from 'typescript-ioc';
import {decode, encode} from "js-base64";

import {mergeAsync, mergeListAsync} from "../../mapping/mapping";
import {vacancyEntityToVacancyView} from '../../mapping/vacancyMapping';

import {VacancyView} from '../../view/vacancyView';
import {VacancyListView} from '../../view/vacancyListView';
import {VacancyCursorView} from '../../view/vacancyCursorView';

import {VacancyService} from '../../service/vacancyService';


@Singleton
export class RequestVacancyResolver {

  public constructor(
    @Inject private readonly vacancyService: VacancyService
  ) {}


  public async getList(status: string, size: number, userId: number): Promise<VacancyListView> {
    return await this.createVacancyList(status, userId, size, 0);
  }


    public async select(cursor: string, offset: number): Promise<VacancyListView> {
      const request = JSON.parse(decode(cursor));
      return await this.createVacancyList(request.status, request.userId, request.size, offset);
    }


  private async createCursor(status: string, userId: number, size: number): Promise<string> {

    const cursorObj = <VacancyCursorView>{
      status,
      userId,
      size
    };

    const cursorStr: string = JSON.stringify(cursorObj);
    const cursor: string = encode(cursorStr);

    return cursor;
  }


  private async createVacancyList(status: string, userId: number, size: number, offset: number): Promise<VacancyListView> {

    const cursor: string = await this.createCursor(status, userId, size);
    const count =  () => this.vacancyService.countByUserId(status, userId);
    const items = () => {
      const result: any = this.vacancyService.getListByUserId(status, userId, size, offset);
      return mergeListAsync(result, vacancyEntityToVacancyView);
    };


    const vacancyListView: VacancyListView = new VacancyListView(
      cursor,
      count,
      items
    );


    return vacancyListView;
  }
}
