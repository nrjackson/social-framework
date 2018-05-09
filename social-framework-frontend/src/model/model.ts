import { injectable } from 'inversify';

export interface IModel {
  id: number;
  createdAt: Date;
}

@injectable()
export class Model implements IModel {
  public id: number;
  public createdAt: Date;
}
