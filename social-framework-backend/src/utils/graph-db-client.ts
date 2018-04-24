import { IModel } from '../model/model';
import { IDBClient } from './db-client';
import { SearchRelation } from '../model/search/search-item';

export interface IGraphDBClient extends IDBClient {
  countRelatedFrom(fromModel: IModel, relation: string, result: (error, data: number) => void): void;
  findRelatedFrom<T extends IModel>(fromModel: IModel, relation: string, result: (error, data: T[]) => void): void;
  countRelatedTo(toModel: IModel, relation: string, result: (error, data: number) => void): void;
  countRelated(fromModel: IModel, relation: string, toModel: IModel, result: (error, result: number) => void): void;
  findRelatedTo<T extends IModel>(toModel: IModel, relation: string, result: (error, data: T[]) => void): void;
  findRelated<T extends IModel>(fromModel: IModel, relation: string, toModel: IModel, whichNodes: string, distinct: boolean, result: (error, data: T[]) => void): void;
  findByRelations<T extends IModel>(modelName: string, relations:SearchRelation[], result: (error, data: T[]) => void): void;
  relate(fromModel: IModel, relation: string, toModel: IModel, result: (error) => void): void;
  unrelate(fromModel: IModel, relation: string, toModel: IModel, result: (error) => void): void;
  // unrelateTo(fromModel: IModel, toModel: IModel, relation: string, result: (error, data: IModel) => void): Promise<IModel>;
  // unrelateFrom(toModel: IModel, fromModel: IModel, relation: string, result: (error, data: IModel) => void): Promise<IModel>;
}
