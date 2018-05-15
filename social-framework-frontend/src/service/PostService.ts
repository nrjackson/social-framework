import { inject, injectable, postConstruct } from 'inversify';
import { ApiService } from './ApiService'
import { IPost } from '../model/post'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Meta } from '../model/meta';
import { IComment } from '../model/comment';
import { MetaService, MetaServiceImpl } from './MetaService';
import { SearchQuery } from '../model/search/search-query';

export interface PostService extends MetaService<IPost> {
  fetchPosts (query: SearchQuery):Promise<IPost[]>;
  addPost (post:IPost, tags:string[]):Promise<IPost>;
}

@injectable()
export class PostServiceImpl extends MetaServiceImpl<IPost> implements PostService {
  @postConstruct()
  public initialize() {
    this.serviceName = 'posts';
  }

  public fetchPosts (query: SearchQuery):Promise<IPost[]> {
    return this.apiService.search<IPost[]>('posts/search', {query: query});
  }

  public addPost (post:IPost, tags:string[]):Promise<IPost> {
    return this.apiService.post<IPost>('posts', {"post": post, "tags": tags});
  }
}
