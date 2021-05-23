import {Inject, Singleton} from 'typescript-ioc';
import {RequestVacancyResolver} from './requestVacancyResolver';
import {RequestResponseResolver} from './requestResponseResolver';


@Singleton
export class QueryResolver {
  public constructor(
    @Inject public readonly requestVacancyResolver: RequestVacancyResolver,
    @Inject public readonly requestResponseResolver: RequestResponseResolver
  ) {}
}
