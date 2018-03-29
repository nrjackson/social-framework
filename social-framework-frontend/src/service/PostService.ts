import { inject, injectable } from 'inversify';
import { ApiService } from './ApiService'
import { Post } from '../model/post'
import TYPES from '../config/Types';

export interface PostService {
  fetchPosts ():Promise<Post[]>;
  addPost (params):Promise<Post>;
}

@injectable()
export class PostServiceImpl {

  constructor(
    @inject(TYPES.ApiService) private apiService: ApiService
  ) {}

  public fetchPosts ():Promise<Post[]> {
    return this.apiService.get<Post[]>('posts');
  }

  public addPost (params):Promise<Post> {
    return this.apiService.post('posts', params);
  }
}
