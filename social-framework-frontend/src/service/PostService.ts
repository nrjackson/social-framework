import { inject, injectable } from 'inversify';
import { ApiService } from './ApiService'
import { IPost } from '../model/post'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Meta } from '../model/meta';

export interface PostService {
  fetchPosts ():Promise<IPost[]>;
  addPost (params):Promise<IPost>;
  getNumLikes(post: IPost): Promise<Meta<number>>;
  getIsLiked (post: IPost):Promise<Meta<boolean>>;
  likePost (post: IPost):Promise<IPost>;
  unlikePost (post: IPost):Promise<IPost>;
}

@injectable()
export class PostServiceImpl {

  private apiService: ApiService;

  constructor() {
    this.apiService = container.get<ApiService>(TYPES.ApiService);
  }

  public fetchPosts ():Promise<IPost[]> {
    return this.apiService.get<IPost[]>('posts');
  }

  public getNumLikes (post: IPost):Promise<Meta<number>> {
    return this.apiService.getAny<Meta<number>>(`posts/${post.id}/likes/count`);
  }

  public getIsLiked (post: IPost):Promise<Meta<boolean>> {
    return this.apiService.getAny<Meta<boolean>>(`posts/${post.id}/likes/user`);
  }

  public likePost (post: IPost):Promise<IPost> {
    return this.apiService.post<IPost>(`posts/${post.id}/likes/`, {});
  }

  public unlikePost (post: IPost):Promise<IPost> {
    return this.apiService.delete<IPost>(`posts/${post.id}/likes/`);
  }

  public addPost (params):Promise<IPost> {
    return this.apiService.post<IPost>('posts', {"post": params});
  }
}
