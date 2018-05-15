import { injectable } from 'inversify';

import { IModel, Model } from './model';

export interface IUser extends IModel {
  email: string;
  name: string;
  username: string;
  registeredAt: string;
  token: string;
  meta: UserMeta;
}

@injectable()
export class User extends Model implements IUser {
  public email: string;
  public name: string;
  public username: string;
  public registeredAt: string;
  public token: string;
  public meta: UserMeta = new UserMeta();
}

export class UserMeta {
  public numFollowers: number;
  public isFollowed: boolean = false;
  public numFollowing: number;
  public isFollowing: boolean = false;
}
