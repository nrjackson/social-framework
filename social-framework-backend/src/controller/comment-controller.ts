import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { postConstruct } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IComment } from '../model/comment';
import { SocialController } from './social-controller';
import { Meta } from '../model/meta';
import { IUser } from '../model/user';

@controller('/comments')
export class CommentController extends SocialController<IComment> {
  @postConstruct()
  public initialize() {
    this.modelName = 'Comment';
    this.socialService = this.commentService;
  }

  @httpGet('/:id')
  public getComment(request: Request): Promise<IComment> {
    return this.commentService.getComment(request.params.id);
  }

  @httpGet('/:id/likes/count')
  public numCommentLikes(req: Request, res: Response, next: NextFunction): Promise<Meta<number>> {
    return this.numLikes(req, res, next);
  }

  @httpGet('/:id/likes/user')
  public isCommentLiked(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.isLiked(req, res, next);
  }

  @httpPost('/:id/likes/')
  public likeComment(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.like(req, res, next);
  }

  @httpDelete('/:id/likes/')
  public unlikeComment(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.unlike(req, res, next);
  }

  @httpGet('/:id/creator/')
  public getCommentCreator(req: Request, res: Response, next: NextFunction): Promise<IUser> {
    return this.getCreator(req, res, next);
  }

  @httpGet('/:id/comments/')
  public getCommentComments(req: Request, res: Response, next: NextFunction): Promise<IComment[]> {
    return this.getComments(req, res, next);
  }

  @httpPost('/:id/comments/')
  public addCommentComment(req: Request, res: Response, next: NextFunction): Promise<IComment> {
    return this.addComment(req, res, next);
  }

  @httpPut('/:id')
  public updateComment(request: Request): Promise<IComment> {
    return this.commentService.updateComment(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteComment(request: Request): Promise<any> {
    return this.commentService.deleteComment(request.params.id);
  }
}
