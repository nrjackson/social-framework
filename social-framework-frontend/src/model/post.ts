import { injectable } from 'inversify';

import { IModel, Model } from './model';
import { IUser, User } from './user';
import { IComment } from './comment';

export interface IPost extends IModel {
  title: string;
  body: string;
  meta: PostMeta;
}

@injectable()
export class Post extends Model implements IPost {
  public title: string;
  public body: string;
  public meta: PostMeta;
}

export class PostMeta {
  public creator: IUser = new User();
  public numLikes: number = 0;
  public isLiked: boolean = false;
  public tags: string[] = [];
  public comments: IComment[] = [];
  public newTitle: string = '';
  public newBody: string = '';
}

export class PostForm {
  public title: string = '';
  public body: string = '';
  public tag: string = '';
  public tags: string[] = [];
}
