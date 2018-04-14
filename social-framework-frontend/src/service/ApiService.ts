import { injectable } from 'inversify';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosAdapter,
  Cancel,
  CancelToken,
  CancelTokenSource,
  Canceler
} from 'axios';
import { Auth } from './Auth';
import { IModel } from '../model/model';
import TYPES from '../config/Types';
import container from '../config/DependencyConfig';

export interface ApiService {
  get<T extends IModel[]> (url:string):Promise<T>;
  getSingle<T extends IModel> (url:string):Promise<T>;
  post<T extends IModel> (url:string, params):Promise<T>;
  put<T extends IModel> (url:string, params):Promise<T>;
}

@injectable()
export class ApiServiceImpl implements ApiService {
  private auth: Auth;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.auth = container.get<Auth>(TYPES.Auth);
    this.axiosInstance = axios.create({
      baseURL: `http://localhost:3000`,
    });
  }

  private getAuthHeader() {
    console.log('jwt token: %j', this.auth.getToken());
    if (this.auth.getToken()) {
      return {Authorization : `JWT ${this.auth.getToken()}`};
    }
  }

  private sendRequest<T> (method: string, url:string, params):Promise<T> {
    let header = this.getAuthHeader();
    console.log('header: %j', header);
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance.request({
        method: method,
        url: url,
        data: params,
        headers: header
      }).then((resp:AxiosResponse<T>) => {
        console.log('get: response = %j', resp);
        console.log('get: data = %j', resp.data);
        return resolve(resp.data);
      });
    });
  }

  private getInternal<T> (url:string):Promise<T> {
    return this.sendRequest<T>('get', url, {});
  }

  public get<T extends IModel[]> (url:string):Promise<T> {
    return this.getInternal<T>(url);
  }

  public getSingle<T extends IModel> (url:string):Promise<T> {
    return this.getInternal<T>(url);
  }

  public post<T extends IModel> (url:string, params):Promise<T> {
    return this.sendRequest<T>('post', url, params);
  }

  public put<T extends IModel> (url:string, params):Promise<T> {
    return this.sendRequest<T>('put', url, params);
  }
}
