import { injectable } from 'inversify';
import { IPost } from '../model/post';
import { IUser } from '../model/user';
import { ISocialModelService, SocialModelService } from './social-model-service';
import { SearchQuery } from '../model/search/search-query';

export interface IPostService extends ISocialModelService<IPost> {
  getPosts(): Promise<IPost[]>;
  getPost(id: number): Promise<IPost>;
  newPost(post: IPost, creator: IUser, tags: string[]): Promise<IPost>;
  updatePost(id: string, post: IPost): Promise<IPost>;
  deletePost(id: string): Promise<any>;
  searchPosts(query: SearchQuery, currUser:IUser): Promise<IPost[]>;
}

/*
 * Decorator pattern for the model service - exposes methods specific to Post model
 */
@injectable()
export class PostService extends SocialModelService<IPost> implements IPostService {
  modelName = 'Post';
  
  protected getModelName() {
    return this.modelName;
  }

  public getPosts(): Promise<IPost[]> {
    return this.getAll();
  }

  public getPost(id: number): Promise<IPost> {
    return this.getModel(id);
  }

  public newPost(post: IPost, creator: IUser, tags: string[]): Promise<IPost> {
    console.log('newPost...');
    return new Promise<IPost>((resolve, reject) => {
      this.createModelWithCreatorAndTags(post, creator, tags).then((newPost) => {
        console.log('created post: %j', newPost);
        return resolve(newPost);
      }).catch((err) => {
        console.log('Error creating post: ' + err);
        return reject(err);
      });
    });
  }

  public updatePost(id: string, post: IPost): Promise<IPost> {
    return this.updateModel(id, post);
  }

  public deletePost(id: string): Promise<any> {
    return this.deleteModel(id);
  }

  public searchPosts(query: SearchQuery, currUser:IUser): Promise<IPost[]> {
    if(query.searchItems && query.searchItems.length > 0) {
      return this.search(query, currUser);
    } else {
      return this.getPosts();
    }
  }

}
