import { inject, injectable, postConstruct } from 'inversify';
import { ApiService } from './ApiService'
import { IPost } from '../model/post'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Meta } from '../model/meta';
import { IComment } from '../model/comment';
import { MetaService, MetaServiceImpl } from './MetaService';

export interface PostService extends MetaService<IPost> {
  fetchPosts ():Promise<IPost[]>;
  addPost (post:IPost, tags:string[]):Promise<IPost>;
}

@injectable()
export class PostServiceImpl extends MetaServiceImpl<IPost> implements PostService {
  @postConstruct()
  public initialize() {
    this.serviceName = 'posts';
  }

  public fetchPosts ():Promise<IPost[]> {
    return this.apiService.get<IPost[]>('posts');
  }

  public addPost (post:IPost, tags:string[]):Promise<IPost> {
    return this.apiService.post<IPost>('posts', {"post": post, "tags": tags});
  }
}
