import { inject, injectable } from 'inversify';
import VueRx from 'vue-rx';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import { ApiService } from '../service/ApiService';
import { IUser, User } from '../model/user';
import { isNullOrUndefined } from 'util';
import VueAuthenticate from 'vue-authenticate';
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Auth } from './Auth';

export interface AuthService {
  attemptAuth(email: string, password: string): Promise<any>;
  signup(user): Promise<any>;
  facebookLogin(): Promise<any>;
  updateUser(user): Promise<any>;
  initialize(vueAuth: VueAuthenticate): void;
}

@injectable()
export class AuthServiceImpl implements AuthService {
  private auth: Auth;
  private apiService: ApiService;
  private vueAuth: VueAuthenticate;

  constructor() {
    console.log('authService: in constructor');
    this.auth = container.get<Auth>(TYPES.Auth);
    this.apiService = container.get<ApiService>(TYPES.ApiService);
    // let app:App = container.get<App>(TYPES.App);
    // this.vueAuth = (app as any).$auth;
    console.log('apiService: %j', this.apiService);
    // console.log('vueAuth: %j', this.vueAuth);
    // this.populate();

  }

  public initialize(vueAuth: VueAuthenticate): void {
    this.vueAuth = vueAuth;
    console.log('vueAuth: %j', this.vueAuth);
    this.auth.initialize(vueAuth);
    this.populate();
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.auth.getToken()) {
      console.log('populate: token: %j', this.auth.getToken());
      this.apiService.getSingle<IUser>('/auth/verify').then((user:IUser) => {
        console.log('setAuth: user to set = %j', user);
        this.auth.setAuth(user);
      },
        err => this.auth.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      console.log('purging auth');
      this.auth.purgeAuth();
    }
  }

  public facebookLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.vueAuth.authenticate('facebook', {scope: 'public_profile,email', domain: 'jybe.us'}).then(function (authResponse) {
        if (authResponse.accessToken) {
          this.apiService.post(`/auth/facebook`, {access_token: authResponse.accessToken})
          .then(
            (data:IUser) => {
              this.auth.setAuth(data);
              return resolve(data);
            }
          );
        }
      });
    });
  }

  public attemptAuth(email: string, password: string): Promise<any> {
    // return this.apiService.post<IUser>('/auth/login', {user: user})
    return new Promise<any>((resolve, reject) => {
      this.vueAuth.login<IUser>({"user": {"email":email, "password":password}})
      .then(
        (resp) => {
          console.log('logged in: user = %j', resp.data);
          this.auth.setAuth(resp.data);
          return resolve(resp.data);
        }
      );
    });
  }

  public signup(user): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (user.password === user.password2) {
        this.apiService.post<IUser>('/auth/signup', {user: user})
          .then(
            (data:IUser) => {
              this.auth.setAuth(data);
              return resolve(data);
            }
          );
      }
    });
/*
      $http.post('/signup', user)
        .success(function(user) {
          $rootScope.currentUser = user;
          $location.url("/profile");
        });
        let route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
    .map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    );
*/
  }

  // Update the user on the server (email, pass, etc)
  public updateUser(user): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService
      .put<IUser>('/user', { user }).then((user:IUser) => {
        // Update the currentUser observable
        this.auth.updateUser(user);
        return resolve(user);
      });
    });
  }

}
