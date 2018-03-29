import { inject, injectable } from 'inversify';
import TYPES from '../constant/types';
import { IUser } from '../model/user';
import { IGraphModelService, GraphModelService } from './graph-model-service';
import { IModel } from '../model/model';
import { Config } from '../constant/config';
import { ITagService } from './tag-service';
import { IGraphDBClient } from '../utils/graph-db-client';
import { SearchItem, SearchRelation } from '../model/search/search-item';

export interface ISocialModelService<ModelType extends IModel> extends IGraphModelService {
  getAll(): Promise<ModelType[]>;
  getModel(id: number): Promise<ModelType>;
  getModelByProperty(propName: string, propValue: string): Promise<ModelType>;
  createModel(model: ModelType): Promise<ModelType>;
  createModelWithCreator(model: ModelType, creator: IUser): Promise<ModelType>;
  createModelWithCreatorAndTags(model: ModelType, creator: IUser, tags: string[]): Promise<ModelType>;
  updateModel(id: string, model: ModelType): Promise<ModelType>;
  deleteModel(modelName: string, id: string): Promise<any>;
  like(liked: ModelType, liker: IUser): Promise<ModelType>;
  unlike(unliked: ModelType, liker: IUser): Promise<ModelType>;
  follow(followed: ModelType, follower: IUser): Promise<ModelType>;
  unfollow(unfollowed: ModelType, follower: IUser): Promise<ModelType>;
  addTags(tags: string[], taggedModel: ModelType): Promise<ModelType>;
  removeTag(tag: string, taggedModel: ModelType): Promise<any>;
  getWithRelations(searchItems: SearchItem[], currUser:IUser): Promise<ModelType[]>;
}

/*
 * Decorator pattern for the model service - exposes methods specific to Liked model
 */
@injectable()
export class SocialModelService<ModelType extends IModel> extends GraphModelService implements ISocialModelService<ModelType> {
  protected modelName: string;

  constructor(
    @inject(TYPES.IDBClient) dbClient: IGraphDBClient,
    @inject(TYPES.ITagService) protected tagService: ITagService,
  ) {
    super(dbClient);
  }

  public getAll(): Promise<ModelType[]> {
    return this.findAll<ModelType>(this.modelName);
  }

  public getModel<ModelType extends IModel>(id: number): Promise<ModelType> {
    return this.findById(this.modelName, id);
  }

  public getModelByProperty<ModelType extends IModel>(propName: string, propValue: string): Promise<ModelType> {
    return this.findByProperty(this.modelName, propName, propValue);
  }

  public updateModel<ModelType extends IModel>(id: string, model: ModelType): Promise<ModelType> {
    return this.update(this.modelName, id, model);
  }

  public deleteModel(id: string): Promise<any> {
    return this.delete(this.modelName, id);
  }

  public countLikes(liked: IModel, liker: IUser): Promise<number> {
    return this.countRelatedTo(liked, Config.RELATION_LIKE);
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

  public addTags(tags: string[], taggedModel: ModelType): Promise<ModelType> {
    return this.tagService.addTags<ModelType>(tags, taggedModel);
  }

  public removeTag(tag: string, taggedModel: ModelType): Promise<any> {
    return this.tagService.removeTag(tag, taggedModel);
  }

  public createModel(model: ModelType): Promise<ModelType> {
    return this.create<ModelType>(this.modelName, model);
  }

  public createModelWithCreator(model: ModelType, creator: IUser): Promise<ModelType> {
    return new Promise<ModelType>((resolve, reject) => {
      this.createModel(model).then((newModel) => {
        console.log('created ' + this.modelName + ': %j', newModel);
        this.relate(creator, Config.RELATION_CREATE, newModel).then(() => {
          return resolve(newModel);
        }).catch((err) => {
          console.log('Error ralating user: ' + err);
          return reject(err);
        });
      }).catch((err) => {
        console.log('Error creating ' + this.modelName + ': ' + err);
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

  public getWithRelations(searchItems: SearchItem[], currUser:IUser): Promise<ModelType[]> {
    let relations: SearchRelation[] = [];
    for(let i=0; i<searchItems.length; i++) {
      console.log('getWithRelations type: ' + searchItems[i].type);
      let searchInfo = Config.searchItemMap[searchItems[i].type];
      let modelName:string = searchInfo.modelName;
      let relation:string = searchInfo.relation;
      let property:string = searchItems[i].property;
      let value:string = searchItems[i].value;
      let searchRelation = new SearchRelation();
      searchRelation.fromModel = this.modelName;
      searchRelation.fromAlias = this.modelName.toLowerCase();
      searchRelation.relation = relation;
      searchRelation.toModel = modelName;
      searchRelation.toAlias = modelName.toLowerCase();
      switch(value) {
        case 'following' :
          let subRelation = new SearchRelation();
          subRelation.fromModel = 'User';
          subRelation.fromAlias = 'cuser';
          subRelation.fromProperty = 'id';
          subRelation.fromValue = currUser.id;
          subRelation.relation = Config.RELATION_FOLLOW
          subRelation.toModel = 'User';
          subRelation.toAlias = 'user';
          relations.push(subRelation);
          break;
        case 'me' :
          searchRelation.toProperty = property;
          searchRelation.toValue = currUser.id;
          break;
        default :
        searchRelation.toProperty = property;
        searchRelation.toValue = value;
      }
      relations.push(searchRelation);
    }
    return new Promise<ModelType[]>((resolve, reject) => {
      this.findByRelations<ModelType>(this.modelName, relations).then((results: ModelType[]) => {
        return resolve(results);
      }).catch((err) => {
        console.log('Error getting results with relations: ' + err);
        return reject(err);
      });
    });
  }

}
