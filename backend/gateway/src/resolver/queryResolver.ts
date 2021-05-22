import {Inject, Singleton} from 'typescript-ioc';
import {RequestVacancyResolver} from './requestVacancyResolver';


@Singleton
export class QueryResolver {
  public constructor(
    @Inject public readonly requestVacancyResolver: RequestVacancyResolver
  ) {}
}
