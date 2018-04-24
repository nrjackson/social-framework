import { injectable } from 'inversify';

import { IModel, Model } from './model';
import { IUser } from './user';

export interface IPost extends IModel {
  title: string;
  body: string;
  tags: string[];
  creator: IUser;
  numLikes: number;
  isLiked: boolean;
}

@injectable()
export class Post extends Model implements IPost {
  public title: string;
  public body: string;
  public tags: string[];
  public creator: IUser;
  public numLikes: number = 0;
  public isLiked: boolean = false;
}
