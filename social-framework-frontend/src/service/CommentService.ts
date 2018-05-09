import { inject, injectable, postConstruct } from 'inversify';
import { ApiService } from './ApiService'
import { IComment } from '../model/comment'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Meta } from '../model/meta';
import { MetaService, MetaServiceImpl } from './MetaService';

export interface CommentService extends MetaService<IComment> {
}

@injectable()
export class CommentServiceImpl extends MetaServiceImpl<IComment> {
  @postConstruct()
  public initialize() {
    this.serviceName = 'comments';
  }
}
