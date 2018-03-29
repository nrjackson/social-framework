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
import { JwtService } from './jwt-service';
import { IModel } from '../model/model';

export interface ApiService {
  get<T extends IModel[]> (url:string):Promise<T>;
  post<T extends IModel> (url:string, params):Promise<T>;
  put<T extends IModel> (url:string, params):Promise<T>;
}

@injectable()
export class ApiServiceImpl implements ApiService {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `http://localhost:3000`,
      transformRequest: [function(data, headers)
      {
        if (this.jwtService.getToken()) {
          headers['Authorization'] = `JWT ${this.jwtService.getToken()}`;
        }
        return data;
      }]
    });
  }

  public get<T extends IModel[]> (url:string):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance.get(url).then((data) => {
        return data;
      });
    });
  }

  public post<T extends IModel> (url:string, params):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance.post(url, params).then((data) => {
        return data;
      });
    });
  }

  public put<T extends IModel> (url:string, params):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance.put(url, params).then((data) => {
        return data;
      });
    });
  }
}
