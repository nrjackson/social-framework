import { injectable, postConstruct } from 'inversify';
import { ApiService } from './ApiService'
import { IUser } from '../model/user'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Meta } from '../model/meta';
import { MetaService, MetaServiceImpl } from './MetaService';

export interface UserService extends MetaService<IUser> {
}

@injectable()
export class UserServiceImpl extends MetaServiceImpl<IUser> {
  @postConstruct()
  public initialize() {
    this.serviceName = 'users';
  }
}
