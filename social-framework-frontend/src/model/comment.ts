import { injectable } from 'inversify';

import { IModel, Model } from './model';
import { IUser, User } from './user';

export interface IComment extends IModel {
  title: string;
  body: string;
  meta: CommentMeta;
}

@injectable()
export class Comment extends Model implements IComment {
  public title: string;
  public body: string;
  public meta: CommentMeta;
}

export class CommentMeta {
  public creator: IUser = new User();
  public numLikes: number = 0;
  public isLiked: boolean = false;
  public comments: IComment[] = [];
  public newTitle: string = '';
  public newBody: string = '';
}
