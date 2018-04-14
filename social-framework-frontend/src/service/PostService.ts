import { inject, injectable } from 'inversify';
import { ApiService } from './ApiService'
import { Post } from '../model/post'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";

export interface PostService {
  fetchPosts ():Promise<Post[]>;
  addPost (params):Promise<Post>;
}

@injectable()
export class PostServiceImpl {

  private apiService: ApiService;

  constructor() {
    this.apiService = container.get<ApiService>(TYPES.ApiService);
  }

  public fetchPosts ():Promise<Post[]> {
    return this.apiService.get<Post[]>('posts');
  }

  public addPost (params):Promise<Post> {
    return this.apiService.post('posts', {"post": params});
  }
}
