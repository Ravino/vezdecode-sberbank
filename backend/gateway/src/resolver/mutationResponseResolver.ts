import {Inject, Singleton} from 'typescript-ioc';

import {ResponseService} from '../service/responseService';
import {VacancyService} from '../service/vacancyService';


@Singleton
export class MutationResponseResolver {

  public constructor(
    @Inject private readonly responseService: ResponseService,
    @Inject private readonly vacancyService: VacancyService
  ) {}


  public async add(userId: number, vacancyId: number): Promise<boolean> {

    const result: any = await this.vacancyService.getByNameField('vacancy_id', vacancyId);


    if(!result) {
      return false;
    }


    return await this.responseService.create(vacancyId, userId);
  }


  public async remove(userId: number, responseId: number): Promise<boolean> {
    return await this.responseService.remove(responseId, userId);
  }
}
