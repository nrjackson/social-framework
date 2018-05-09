import { injectable } from 'inversify';
import Vue from "vue";
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
import VueAuthenticate from 'vue-authenticate';
import { IModel } from '../model/model';
import TYPES from '../config/Types';
import container from '../config/DependencyConfig';

export interface ApiService {
  getAny<T> (url:string):Promise<T>;
  get<T extends IModel[]> (url:string):Promise<T>;
  getSingle<T extends IModel> (url:string):Promise<T>;
  post<T extends IModel> (url:string, params):Promise<T>;
  put<T extends IModel> (url:string, params):Promise<T>;
  delete<T extends IModel> (url:string):Promise<T>;
  deleteWithParams<T extends IModel> (url:string, params):Promise<T>;
}

@injectable()
export class ApiServiceImpl implements ApiService {
  private vueAuth: VueAuthenticate;
  private axiosInstance: AxiosInstance;

  constructor () {
    this.axiosInstance = axios.create({
      baseURL: `http://localhost:3000`,
    });
  }

  initialize (vueAuth: VueAuthenticate) : void {
    this.vueAuth = vueAuth;
  }

  private getAuthHeader() {
    console.log('jwt token: %j', this.vueAuth.getToken());
    if (this.vueAuth.getToken()) {
      return {Authorization : `JWT ${this.vueAuth.getToken()}`};
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

  public getAny<T> (url:string):Promise<T> {
    return this.getInternal<T>(url);
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

  public delete<T extends IModel> (url:string):Promise<T> {
    return this.sendRequest<T>('delete', url, {});
  }

  public deleteWithParams<T extends IModel> (url:string, params):Promise<T> {
    return this.sendRequest<T>('delete', url, {});
  }
}
