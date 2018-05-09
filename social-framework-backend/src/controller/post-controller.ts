import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { inject, postConstruct } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IPost } from '../model/post';
import { IPostService } from '../service/post-service';
import TYPES from '../constant/types';
import { IComment } from '../model/comment';
// import { IFrontPost, FrontPost } from '../model/decorator/front-post';
import { Meta } from '../model/meta';
import { SocialController } from './social-controller';
import { IUser } from '../model/user';

@controller('/posts')
export class PostController extends SocialController<IPost>  {
  @postConstruct()
  public initialize() {
    this.modelName = 'Post';
    this.socialService = this.postService;
  }

  @inject(TYPES.IPostService) 
  private postService: IPostService;

  @httpPost('/search/')
  public findPosts(req: Request, res: Response, next: NextFunction): Promise<IPost[]> {
    return new Promise<IPost[]>((resolve, reject) => {
      this.withUser(req, res, next).then((currUser) => {
        this.postService.getPostWithRelations(req.body.searchItems, currUser).then((posts:IPost[]) => {
          return resolve(posts);
        }).catch((err) => {
          console.log('Error searching by relations: ' + err);
          return reject(err);
        });
      }).catch((err) => {
        console.log('Error getting user: ' + err);
        return reject(err);
      });
    });
  }

  @httpGet('/')
  public getPosts(): Promise<IPost[]> {
    return this.postService.getPosts();
  }

  @httpGet('/:id')
  public getPost(request: Request): Promise<IPost> {
    return this.postService.getPost(request.params.id);
  }

  @httpGet('/:id/likes/count')
  public numPostLikes(req: Request, res: Response, next: NextFunction): Promise<Meta<number>> {
    return this.numLikes(req, res, next);
  }

  @httpGet('/:id/likes/user')
  public isPostLiked(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.isLiked(req, res, next);
  }

  @httpPost('/:id/likes/')
  public likePost(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.like(req, res, next);
  }

  @httpDelete('/:id/likes/')
  public unlikePost(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.unlike(req, res, next);
  }

  @httpGet('/:id/creator/')
  public getPostCreator(req: Request, res: Response, next: NextFunction): Promise<IUser> {
    return this.getCreator(req, res, next);
  }

  @httpGet('/:id/comments/')
  public getPostComments(req: Request, res: Response, next: NextFunction): Promise<IComment[]> {
    return this.getComments(req, res, next);
  }

  @httpPost('/:id/comments/')
  public addPostComment(req: Request, res: Response, next: NextFunction): Promise<IComment> {
    return this.addComment(req, res, next);
  }

  @httpGet('/:id/tags/')
  public getPostTags(req: Request, res: Response, next: NextFunction): Promise<Meta<string[]>> {
    return this.getTags(req, res, next);
  }

  @httpPost('/:id/tags/')
  public addPostTag(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.addTag(req, res, next);
  }

  @httpDelete('/:id/tags/')
  public removePostTag(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.removeTag(req, res, next);
  }

  @httpPost('/')
  public newPost(req: Request, res: Response, next: NextFunction): Promise<IPost> {
    return new Promise<IPost>((resolve, reject) => {
      this.authService.authenticate(req, res, next).then((currUser) => {
        this.postService.newPost(req.body.post, currUser, req.body.tags).then((newPost) => {
          return resolve(newPost);
        }).catch((err) => {
          console.log('newPost: Error adding post: ' + err);
          return reject(err);
        });
      }).catch((err) => {
        console.log('newPost: Error authenticating: ' + err);
        return reject(err);
      });
    });
  }

  @httpPut('/:id')
  public updatePost(request: Request): Promise<IPost> {
    return this.postService.updatePost(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deletePost(request: Request): Promise<any> {
    return this.postService.deletePost(request.params.id);
  }
}
