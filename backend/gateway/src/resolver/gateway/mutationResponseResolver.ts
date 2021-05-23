import {Inject, Singleton} from 'typescript-ioc';

import {ResponseService} from '../../service/responseService';
import {VacancyService} from '../../service/vacancyService';
import {CommentService} from '../../service/commentService';


@Singleton
export class MutationResponseResolver {

  public constructor(
    @Inject private readonly responseService: ResponseService,
    @Inject private readonly vacancyService: VacancyService,
    @Inject private readonly commentService: CommentService
  ) {}


  public async add(userId: number, vacancyId: number): Promise<boolean> {

    const vacancy: any = await this.vacancyService.getByNameField('vacancy_id', vacancyId);
    const comment: any = await this.commentService.getByNameField('type', 'await');


    if(!vacancy) {
      return false;
    }


    if(!comment) {
      return false;
    }


    const responseStatus: boolean =  await this.responseService.create(vacancyId, userId);
    if(!responseStatus) {
      return false;
    }


    const commentStatus: boolean = await this.responseService.setCommentId(vacancyId, userId, comment.COMMENT_ID);
    if(!commentStatus) {
      return false;
    }


    return true;
  }


  public async remove(userId: number, responseId: number): Promise<boolean> {
    return await this.responseService.remove(responseId, userId);
  }
}
