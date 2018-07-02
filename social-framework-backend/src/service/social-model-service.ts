import { inject, injectable } from 'inversify';
import TYPES from '../constant/types';
import { IUser } from '../model/user';
import { IGraphModelService, GraphModelService } from './graph-model-service';
import { IModel } from '../model/model';
import { Config } from '../constant/config';
import { ITagService } from './tag-service';
import { IGraphDBClient } from '../utils/graph-db-client';
import { SearchRelation } from '../model/search/search-item';
import { IComment } from '../model/comment';
import { ITag } from '../model/tag';
import { SearchQuery } from '../model/search/search-query';

export interface ISocialModelService<ModelType extends IModel> extends IGraphModelService {
  getAll(): Promise<ModelType[]>;
  getModel(id: number): Promise<ModelType>;
  getModelByProperty(propName: string, propValue: string): Promise<ModelType>;
  createModel(model: ModelType): Promise<ModelType>;
  createModelWithCreator(model: ModelType, creator: IUser): Promise<ModelType>;
  createModelWithCreatorAndTags(model: ModelType, creator: IUser, tags: string[]): Promise<ModelType>;
  updateModel(id: string, model: ModelType): Promise<ModelType>;
  deleteModel(id: string): Promise<any>;
  userHasReaction(toModel: ModelType, reactor: IUser, reaction: string): Promise<boolean>;
  countReactions(reactedTo: ModelType, reaction): Promise<number>;
  countLikes(post: ModelType): Promise<number>;
  isLikedByUser(post: ModelType, user: IUser): Promise<boolean>;
  react(reactedTo: ModelType, reactor: IUser, reaction:string): Promise<ModelType>;
  unreact(reactedTo: ModelType, reactor: IUser, reaction:string): Promise<ModelType>;
  like(liked: ModelType, liker: IUser): Promise<ModelType>;
  unlike(unliked: ModelType, liker: IUser): Promise<ModelType>;
  follow(followed: ModelType, follower: IUser): Promise<ModelType>;
  unfollow(unfollowed: ModelType, follower: IUser): Promise<ModelType>;
  countFollowers(post: ModelType): Promise<number>;
  isFollowedByUser(post: ModelType, user: IUser): Promise<boolean>;
  getTags(taggedModel: ModelType): Promise<string[]>;
  addTags(tags: string[], taggedModel: ModelType): Promise<ModelType>;
  removeTag(tag: string, taggedModel: ModelType): Promise<any>;
  getComments(commentedModel: ModelType): Promise<IComment[]>;
  getCreator(created: ModelType): Promise<IUser>;
  search(query: SearchQuery, currUser:IUser): Promise<ModelType[]>;
}

/*
 * Decorator pattern for the model service - exposes methods specific to Liked model
 */
@injectable()
export abstract class SocialModelService<ModelType extends IModel> extends GraphModelService implements ISocialModelService<ModelType> {
  constructor(
    @inject(TYPES.IDBClient) dbClient: IGraphDBClient,
    @inject(TYPES.ITagService) protected tagService: ITagService,
  ) {
    super(dbClient);
  }

  protected abstract getModelName();

  public getAll(): Promise<ModelType[]> {
    return this.findAll<ModelType>(this.getModelName());
  }

  public getModel<ModelType extends IModel>(id: number): Promise<ModelType> {
    return this.findById(this.getModelName(), id);
  }

  public getModelByProperty<ModelType extends IModel>(propName: string, propValue: string): Promise<ModelType> {
    return this.findByProperty(this.getModelName(), propName, propValue);
  }

  public updateModel<ModelType extends IModel>(id: string, model: ModelType): Promise<ModelType> {
    return this.update(this.getModelName(), id, model);
  }

  public deleteModel(id: string): Promise<any> {
    return this.delete(this.getModelName(), id);
  }

  public userHasReaction(toModel: ModelType, reactor: IUser, reaction: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.countRelated(reactor, reaction, toModel).then((result:number) => {
        if(result > 0) return resolve(true);
        else return resolve(false);
      }).catch((err) => {
        console.log('Error finding if user likes post: ' + err);
        return reject(err);
      });
    });
  }

  public countReactions(reactedTo: ModelType, reaction): Promise<number> {
    return this.countRelatedTo(reactedTo, reaction);
  }

  public countLikes(model: ModelType): Promise<number> {
    return this.countReactions(model, Config.RELATION_LIKE);
  }

  public isLikedByUser(model: ModelType, user: IUser): Promise<boolean> {
    return this.userHasReaction(model, user, Config.RELATION_LIKE);
  }

  public countFollowers(model: ModelType): Promise<number> {
    return this.countReactions(model, Config.RELATION_FOLLOW);
  }

  public isFollowedByUser(model: ModelType, user: IUser): Promise<boolean> {
    return this.userHasReaction(model, user, Config.RELATION_FOLLOW);
  }

  public react(reactedTo: ModelType, reactor: IUser, reaction: string): Promise<ModelType> {
    console.log('react...');
    return new Promise<ModelType>((resolve, reject) => {
      this.relate(reactor, reaction, reactedTo).then(() => {
        return resolve(reactedTo);
      }).catch((err) => {
        console.log('Error reacting: ' + err);
        return reject(err);
      });
    });
  }

  public unreact(reactedTo: ModelType, reactor: IUser, reaction: string): Promise<ModelType> {
    console.log('unreact...');
    return new Promise<ModelType>((resolve, reject) => {
      this.unrelate(reactor, reaction, reactedTo).then(() => {
        return resolve(reactedTo);
      }).catch((err) => {
        console.log('Error unreacting: ' + err);
        return reject(err);
      });
    });
  }

  public like(liked: ModelType, liker: IUser): Promise<ModelType> {
    console.log('like liked...');
    return new Promise<ModelType>((resolve, reject) => {
      this.relate(liker, Config.RELATION_LIKE, liked).then(() => {
        return resolve(liked);
      }).catch((err) => {
        console.log('Error liking: ' + err);
        return reject(err);
      });
    });
  }

  public unlike(unliked: ModelType, liker: IUser): Promise<ModelType> {
    console.log('unlike unliked...');
    return new Promise<ModelType>((resolve, reject) => {
      this.unrelate(liker, Config.RELATION_LIKE, unliked).then(() => {
        return resolve(unliked);
      }).catch((err) => {
        console.log('Error unliking: ' + err);
        return reject(err);
      });
    });
  }

  public follow(followed: ModelType, follower: IUser): Promise<ModelType> {
    // console.log('like liked...');
    return new Promise<ModelType>((resolve, reject) => {
      this.relate(follower, Config.RELATION_FOLLOW, followed).then(() => {
        return resolve(followed);
      }).catch((err) => {
        console.log('Error liking: ' + err);
        return reject(err);
      });
    });
  }

  public unfollow(unfollowed: ModelType, follower: IUser): Promise<ModelType> {
    // console.log('like liked...');
    return new Promise<ModelType>((resolve, reject) => {
      this.unrelate(follower, Config.RELATION_FOLLOW, unfollowed).then(() => {
        return resolve(unfollowed);
      }).catch((err) => {
        console.log('Error liking: ' + err);
        return reject(err);
      });
    });
  }

  public getComments(commented: ModelType): Promise<IComment[]> {
    return this.findRelatedFrom<IComment>(commented, Config.RELATION_COMMENT);
  }

  public getCreator(created: ModelType): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.findRelatedTo<IUser>(created, Config.RELATION_CREATE).then((results:IUser[]) => {
        if(results.length > 0) {
          return resolve(results[0]);
        }
        return resolve(null);
      });
    });
  }

  public getTags(tagged: ModelType): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.findRelatedFrom<ITag>(tagged, Config.RELATION_TAG).then((tags:ITag[]) => {
        let retTags:string[] = [];
        for(let i=0; i<tags.length; i++) {
          retTags.push(tags[i].name);
        }
        return resolve(retTags);
      });
    });
  }

  public addTags(tags: string[], taggedModel: ModelType): Promise<ModelType> {
    return this.tagService.addTags<ModelType>(tags, taggedModel);
  }

  public removeTag(tag: string, taggedModel: ModelType): Promise<any> {
    return this.tagService.removeTag(tag, taggedModel);
  }

  public createModel(model: ModelType): Promise<ModelType> {
    return this.create<ModelType>(this.getModelName(), model);
  }

  public createModelWithCreator(model: ModelType, creator: IUser): Promise<ModelType> {
    return new Promise<ModelType>((resolve, reject) => {
      this.createModel(model).then((newModel) => {
        console.log('created ' + this.getModelName() + ': %j', newModel);
        this.relate(creator, Config.RELATION_CREATE, newModel).then(() => {
          return resolve(newModel);
        }).catch((err) => {
          console.log('Error ralating user: ' + err);
          return reject(err);
        });
      }).catch((err) => {
        console.log('Error creating ' + this.getModelName() + ': ' + err);
        return reject(err);
      });
    });
  }

  public createModelWithCreatorAndTags(model: ModelType, creator: IUser, tags: string[]): Promise<ModelType> {
    return new Promise<ModelType>((resolve, reject) => {
      this.createModelWithCreator(model, creator).then((newModel) => {
        console.log('created model: %j', newModel);
        this.addTags(tags, newModel).then((tagged:ModelType) => {
          return resolve(tagged);
        }).catch((err) => {
          console.log('Error tagging post: ' + err);
          return reject(err);
        });
      }).catch((err) => {
        console.log('Error creating post: ' + err);
        return reject(err);
      });
    });
  }

  public search(query: SearchQuery, currUser:IUser): Promise<ModelType[]> {
    const searchItems = query.searchItems;
    let relations: SearchRelation[] = [];
    let aliases:string[] = [];
    for(let i=0; i<searchItems.length; i++) {
      console.log('getWithRelations type: ' + searchItems[i].type);
      let searchInfo = Config.searchItemMap[searchItems[i].type];
      let modelName:string = searchInfo.modelName;
      let modelAlias = modelName.toLowerCase();
      if(aliases.indexOf(modelAlias) < 0) {
        aliases.push(modelAlias);
      } else {
        modelAlias += i;
      }
      let relation:string = searchInfo.relation;
      let direction:string = searchInfo.direction;
      let property:string = searchItems[i].property;
      let value:string = searchItems[i].value;
      let searchRelation = new SearchRelation();
      searchRelation.relation = relation;
      if(direction === Config.DIRECTION_FROM) {
        searchRelation.toModel = modelName;
        searchRelation.toAlias = modelAlias;
        searchRelation.fromModel = this.getModelName();
        searchRelation.fromAlias = this.getModelName().toLowerCase();
      } else {
        searchRelation.toModel = this.getModelName();
        searchRelation.toAlias = this.getModelName().toLowerCase();
        searchRelation.fromModel = modelName;
        searchRelation.fromAlias = modelAlias;
      }
      let subRelation: SearchRelation;
      switch(value) {
        case 'followed' :
        subRelation = new SearchRelation();
          subRelation.fromModel = 'User';
          subRelation.fromAlias = 'cuser';
          subRelation.fromProperty = 'id';
          subRelation.fromValue = currUser.id;
          subRelation.relation = Config.RELATION_FOLLOW
          subRelation.toModel = 'User';
          subRelation.toAlias = 'user';
          relations.push(subRelation);
          break;
        case 'followers' :
          subRelation = new SearchRelation();
          subRelation.toModel = 'User';
          subRelation.toAlias = 'cuser';
          subRelation.toProperty = 'id';
          subRelation.toValue = currUser.id;
          subRelation.relation = Config.RELATION_FOLLOW
          subRelation.fromModel = 'User';
          subRelation.fromAlias = 'user';
          relations.push(subRelation);
          break;
        case 'me' :
          searchRelation.fromProperty = property;
          searchRelation.fromValue = currUser.id;
          break;
        default :
        searchRelation.fromProperty = property;
        searchRelation.fromValue = value;
      }
      relations.push(searchRelation);
    }
    return new Promise<ModelType[]>((resolve, reject) => {
      this.findByRelations<ModelType>(this.getModelName(), relations).then((results: ModelType[]) => {
        return resolve(results);
      }).catch((err) => {
        console.log('Error getting results with relations: ' + err);
        return reject(err);
      });
    });
  }

}
