import { injectable, postConstruct } from 'inversify';
import { IPost } from '../model/post';
import { IUser } from '../model/user';
import { ISocialModelService, SocialModelService } from './social-model-service';
import { Config } from '../constant/config';

export interface IPostService extends ISocialModelService<IPost> {
  getPosts(): Promise<IPost[]>;
  getPost(id: number): Promise<IPost>;
  newPost(post: IPost, creator: IUser, tags: string[]): Promise<IPost>;
  updatePost(id: string, post: IPost): Promise<IPost>;
  deletePost(id: string): Promise<any>;
  countLikes(post: IPost): Promise<number>;
  isLikedByUser(post: IPost, user: IUser): Promise<boolean>;
}

/*
 * Decorator pattern for the model service - exposes methods specific to Post model
 */
@injectable()
export class PostService extends SocialModelService<IPost> implements IPostService {
  @postConstruct()
  public initialize() {
      this.modelName = 'Post';
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

  public countLikes(post: IPost): Promise<number> {
    return this.countRelatedTo(post, Config.RELATION_LIKE);
  }

  public isLikedByUser(post: IPost, user: IUser): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.countRelated(user, Config.RELATION_LIKE, post).then((result:number) => {
        if(result > 0) return resolve(true);
        else return resolve(false);
      }).catch((err) => {
        console.log('Error finding if user likes post: ' + err);
        return reject(err);
      });
    });
  }
}
