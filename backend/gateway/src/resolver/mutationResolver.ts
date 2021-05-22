import {Inject, Singleton} from 'typescript-ioc';
import {MutationResponseResolver} from './mutationResponseResolver';


@Singleton
export class MutationResolver {
  public constructor(
    @Inject public readonly mutationResponseResolver: MutationResponseResolver
  ) {}
}
