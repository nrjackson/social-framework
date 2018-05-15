import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { inject, postConstruct } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../model/user';
import { IUserService } from '../service/user-service';
import TYPES from '../constant/types';
import { SocialController } from './social-controller';
import { Meta } from '../model/meta';

@controller('/users')
export class UserController  extends SocialController<IUser>  {
  @postConstruct()
  public initialize() {
    this.modelName = 'User';
    this.socialService = this.userService;
  }

  @inject(TYPES.IUserService) 
  private userService: IUserService;

  @httpGet('/')
  public getUsers(): Promise<IUser[]> {
    return this.userService.getUsers();
  }

  @httpGet('/:id')
  public getUser(request: Request): Promise<IUser> {
    return this.userService.getUser(request.params.id);
  }

  @httpPost('/')
  public newUser(request: Request): Promise<IUser> {
    return this.userService.newUser(request.body);
  }

  @httpPut('/:id')
  public updateUser(request: Request): Promise<IUser> {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): Promise<any> {
    return this.userService.deleteUser(request.params.id);
  }

  @httpGet('/:id/followers/count')
  public numUserFollowers(req: Request, res: Response, next: NextFunction): Promise<Meta<number>> {
    return this.numFollowers(req, res, next);
  }

  @httpGet('/:id/followers/user')
  public isUserFollowed(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.isFollowed(req, res, next);
  }

  @httpPost('/:id/followers/')
  public followUser(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.follow(req, res, next);
  }

  @httpDelete('/:id/followers/')
  public unfollowUser(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.unfollow(req, res, next);
  }
}
