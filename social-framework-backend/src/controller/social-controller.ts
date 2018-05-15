import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth-service';
import TYPES from '../constant/types';
import { IComment } from '../model/comment';
import { ICommentService } from '../service/comment-service';
import { IUser } from '../model/user';
import { Meta } from '../model/meta';
import { ISocialModelService } from '../service/social-model-service';
import { IModel } from '../model/model';
import { Config } from '../constant/config';

@injectable()
export abstract class SocialController<ModelType> {
  protected modelName: string;
  protected socialService: ISocialModelService<IModel>;

  @inject(TYPES.ICommentService) protected commentService: ICommentService;
  @inject(TYPES.AuthService) protected authService: AuthService;

  protected withUser(req: Request, res: Response, next: NextFunction): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.authService.authenticate(req, res, next).then((currUser) => {
        if(!currUser) {
          return reject('Could not find authenticated user');
        }
        return resolve(currUser);
      });
    });
  }

  protected withUserAndModel(req: Request, res: Response, next: NextFunction, result: (error, user: IUser, model: IModel) => void): void {
    this.withUser(req, res, next).then((currUser) => {
      if(!currUser) {
        return result('Could not find authenticated user', null, null);
      }
      console.log('params: %j', req.params);
      console.log('retrieving ' + this.modelName + ' with id: ' + req.params.id);
      this.socialService.getModel(req.params.id).then((theModel) => {
        if(!theModel) {
          return result('Post not found', null, null);
        }
        return result(null, currUser, theModel);
      });
    });
  }

  protected numReactions(req: Request, res: Response, next: NextFunction, reaction:string): Promise<Meta<number>> {
    return new Promise<Meta<number>>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        console.log('retrieved %j: %j', this.modelName, theModel);
        this.socialService.countReactions(theModel, reaction).then((count) => {
          return resolve(new Meta(count));
        }).catch((err) => {
          console.log('numLikes: Error counting post likes: ' + err);
          return reject(err);
        });
      });
    });
  }

  protected numLikes(req: Request, res: Response, next: NextFunction): Promise<Meta<number>> {
    return this.numReactions(req, res, next, Config.RELATION_LIKE);
  }

  protected numFollowers(req: Request, res: Response, next: NextFunction): Promise<Meta<number>> {
    return this.numReactions(req, res, next, Config.RELATION_FOLLOW);
  }

  protected isReacted(req: Request, res: Response, next: NextFunction, reaction:string): Promise<Meta<boolean>> {
    return new Promise<Meta<boolean>>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        console.log('retrieved post: %j', theModel);
        this.socialService.userHasReaction(theModel, currUser, reaction).then((isLiked) => {
          return resolve(new Meta<boolean>(isLiked));
        }).catch((err) => {
          console.log('newPost: Error counting post likes: ' + err);
          return reject(err);
        });
      });
    });
  }

  protected isLiked(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.isReacted(req, res, next, Config.RELATION_LIKE);
  }

  protected isFollowed(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.isReacted(req, res, next, Config.RELATION_FOLLOW);
  }

  protected react(req: Request, res: Response, next: NextFunction, reaction:string): Promise<Meta<boolean>> {
    return new Promise<Meta<boolean>>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        console.log('retrieved model: %j', theModel);
        this.socialService.react(theModel, currUser, reaction).then((reactedModel) => {
          return resolve(new Meta<boolean>(true));
        }).catch((err) => {
          console.log('newPost: Error liking post: ' + err);
          return reject(err);
        });
      });
    });
  }

  protected unreact(req: Request, res: Response, next: NextFunction, reaction:string): Promise<Meta<boolean>> {
    return new Promise<Meta<boolean>>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        console.log('retrieved model: %j', theModel);
        this.socialService.unreact(theModel, currUser, reaction).then((reactedModel) => {
          return resolve(new Meta<boolean>(true));
        }).catch((err) => {
          console.log('newPost: Error liking post: ' + err);
          return reject(err);
        });
      });
    });
  }

  protected like(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.react(req, res, next, Config.RELATION_LIKE);
  }

  protected unlike(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.unreact(req, res, next, Config.RELATION_LIKE);
  }

  protected follow(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.react(req, res, next, Config.RELATION_FOLLOW);
  }

  protected unfollow(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return this.unreact(req, res, next, Config.RELATION_FOLLOW);
  }

  protected getCreator(req: Request, res: Response, next: NextFunction): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        // console.log('retrieved model: %j', theModel);
        this.socialService.getCreator(theModel).then((creator:IUser) => {
          console.log('found creator for model id %j: %j', theModel.id, creator);
          return resolve(creator);
        }).catch((err) => {
          console.log('getCreator: Error getting creator for model: ' + err);
          return reject(err);
        });
      });
    });
  }

  protected getComments(req: Request, res: Response, next: NextFunction): Promise<IComment[]> {
    return new Promise<IComment[]>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        console.log('retrieved model: %j', theModel);
        this.socialService.getComments(theModel).then((comments:IComment[]) => {
          console.log('found comments for model id %j: %j', theModel.id, comments);
          return resolve(comments);
        }).catch((err) => {
          console.log('getComments: Error getting comments for model: ' + err);
          return reject(err);
        });
      });
    });
  }

  protected addComment(req: Request, res: Response, next: NextFunction): Promise<IComment> {
    return new Promise<IComment>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        console.log('retrieved model: %j', theModel);
        this.commentService.addComment(req.body.comment, theModel, currUser).then((newComment:IComment) => {
          return resolve(newComment);
        }).catch((err) => {
          console.log('addComment: Error commenting on model: ' + err);
          return reject(err);
        });
      });
    });
  }

  protected getTags(req: Request, res: Response, next: NextFunction): Promise<Meta<string[]>> {
    return new Promise<Meta<string[]>>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        console.log('retrieved model: %j', theModel);
        this.socialService.getTags(theModel).then((tags:string[]) => {
          console.log('found tags for model id %j: %j', theModel.id, tags);
          return resolve(new Meta<string[]>(tags));
        }).catch((err) => {
          console.log('getTags: Error getting tags for model: ' + err);
          return reject(err);
        });
      });
    });
  }

  protected addTag(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return new Promise<Meta<boolean>>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        if(!theModel) {
          return reject('Post not found');
        }
        console.log('retrieved model: %j', theModel);
        this.socialService.addTags(req.body.tags, theModel).then((taggedModel:IModel) => {
          return resolve(new Meta<boolean>(true));
        }).catch((err) => {
          console.log('addTag: Error adding tag: ' + err);
          return reject(err);
        });
      });
    })
  }

  protected removeTag(req: Request, res: Response, next: NextFunction): Promise<Meta<boolean>> {
    return new Promise<Meta<boolean>>((resolve, reject) => {
      this.withUserAndModel(req, res, next, (error, currUser: IUser, theModel: IModel) => {
        if(!theModel) {
          return reject('Post not found');
        }
        console.log('retrieved model: %j', theModel);
        this.socialService.removeTag(req.body.tag, theModel).then((taggedModel:IModel) => {
          return resolve(new Meta<boolean>(true));
        }).catch((err) => {
          console.log('addTag: Error removing tag: ' + err);
          return reject(err);
        });
      });
    })
  }
}
