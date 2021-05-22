import {Inject, Singleton} from 'typescript-ioc';
import {decode, encode} from "js-base64";

import {mergeAsync, mergeListAsync} from "../mapping/mapping";
import {vacancyEntityToVacancyView} from '../mapping/vacancyMapping';
import {responseEntityToResponseView} from '../mapping/responseMapping';

import {VacancyView} from '../view/vacancyView';
import {VacancyListView} from '../view/vacancyListView';
import {VacancyCursorView} from '../view/vacancyCursorView';

import {VacancyService} from '../service/vacancyService';
import {ResponseService} from '../service/responseService';


import {ResponseView} from '../view/responseView';
import {ResponseListView} from '../view/responseListView';
import {ResponseCursorView} from '../view/responseCursorView';


@Singleton
export class RequestResponseResolver {

  public constructor(
    @Inject private readonly vacancyService: VacancyService,
    @Inject private readonly responseService: ResponseService
  ) {}


  public async getList(status: string, size: number, userId: number): Promise<ResponseListView> {
    return await this.createResponseList(status, userId, size, 0);
  }


    public async select(cursor: string, offset: number): Promise<ResponseListView> {
      const request = JSON.parse(decode(cursor));
      return await this.createResponseList(request.status, request.userId, request.size, offset);
    }


  private async createCursor(status: string, userId: number, size: number): Promise<string> {

    const cursorObj = <ResponseCursorView>{
      status,
      userId,
      size
    };

    const cursorStr: string = JSON.stringify(cursorObj);
    const cursor: string = encode(cursorStr);

    return cursor;
  }


  private async createResponseList(status: string, userId: number, size: number, offset: number): Promise<ResponseListView> {

    const cursor: string = await this.createCursor(status, userId, size);
    const count =  () => this.responseService.countByUserId(status, userId);
    const items = () => {
      const result: any = this.responseService.getListByUserId(status, userId, size, offset);
      return mergeListAsync(result, responseEntityToResponseView);
    };


    const responseListView: ResponseListView = new ResponseListView(
      cursor,
      count,
      items
    );


    return responseListView;
  }
}
