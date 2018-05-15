import { inject, injectable } from 'inversify';
import { ApiService } from './ApiService'
import { IModel } from '../model/model'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Meta } from '../model/meta';
import { IComment } from '../model/comment';
import { Relation } from '../../config/relation';
import { IUser } from '../model/user';

export interface MetaService<ModelType extends IModel> {
  getNumLikes(model: ModelType): Promise<Meta<number>>;
  getIsLiked (model: ModelType):Promise<Meta<boolean>>;
  like (model: ModelType):Promise<ModelType>;
  unlike (model: ModelType):Promise<ModelType>;
  getCreator (model: ModelType):Promise<IUser>;
  getComments (model: ModelType):Promise<IComment[]>;
  addComment (model: ModelType, comment:IComment):Promise<IComment>;
  getTags (model: ModelType):Promise<Meta<string[]>>;
  getNumFollowers (model: ModelType):Promise<Meta<number>>;
  getIsFollowed (model: ModelType):Promise<Meta<boolean>>;
  follow (model: ModelType):Promise<ModelType>;
  unfollow (model: ModelType):Promise<ModelType>;
}

@injectable()
export class MetaServiceImpl<ModelType extends IModel> implements MetaService<ModelType> {

  protected apiService: ApiService;

  protected serviceName: string;

  constructor() {
    this.apiService = container.get<ApiService>(TYPES.ApiService);
  }

  public getCreator (model: ModelType):Promise<IUser> {
    return this.apiService.getSingle<IUser>(`${this.serviceName}/${model.id}/creator/`);
  }

  public getComments (model: ModelType):Promise<IComment[]> {
    return this.apiService.get<IComment[]>(`${this.serviceName}/${model.id}/comments/`);
  }

  public addComment (model: ModelType, comment:IComment):Promise<IComment> {
    return this.apiService.post<IComment>(`${this.serviceName}/${model.id}/comments/`, {comment: comment});
  }

  public getTags (model: ModelType):Promise<Meta<string[]>> {
    return this.apiService.getAny<Meta<string[]>>(`${this.serviceName}/${model.id}/tags/`);
  }

  public getNumLikes (model: ModelType):Promise<Meta<number>> {
    return this.apiService.getAny<Meta<number>>(`${this.serviceName}/${model.id}/likes/count`);
  }

  public getIsLiked (model: ModelType):Promise<Meta<boolean>> {
    return this.apiService.getAny<Meta<boolean>>(`${this.serviceName}/${model.id}/likes/user`);
  }

  public like (model: ModelType):Promise<ModelType> {
    return this.apiService.post<ModelType>(`${this.serviceName}/${model.id}/likes/`, {});
  }

  public unlike (model: ModelType):Promise<ModelType> {
    return this.apiService.delete<ModelType>(`${this.serviceName}/${model.id}/likes/`);
  }

  public getNumFollowers (model: ModelType):Promise<Meta<number>> {
    return this.apiService.getAny<Meta<number>>(`${this.serviceName}/${model.id}/followers/count`);
  }

  public getIsFollowed (model: ModelType):Promise<Meta<boolean>> {
    return this.apiService.getAny<Meta<boolean>>(`${this.serviceName}/${model.id}/followers/user`);
  }

  public follow (model: ModelType):Promise<ModelType> {
    return this.apiService.post<ModelType>(`${this.serviceName}/${model.id}/followers/`, {});
  }

  public unfollow (model: ModelType):Promise<ModelType> {
    return this.apiService.delete<ModelType>(`${this.serviceName}/${model.id}/followers/`);
  }
}
