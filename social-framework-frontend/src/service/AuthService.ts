import { inject, injectable, postConstruct } from 'inversify';
import Vue from "vue";
import VueAuthenticate from 'vue-authenticate';
import { ApiService } from './ApiService';
// import { AuthContainer } from "./AuthContainer";
import { IUser } from '../model/user';
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";

export interface AuthService {
  preAuth(): Promise<IUser>;
  attemptAuth(email: string, password: string): Promise<IUser>;
  signup(user): Promise<IUser>;
  facebookLogin(): Promise<IUser>;
  updateUser(user): Promise<IUser>;
}

@injectable()
export class AuthServiceImpl implements AuthService {
  private apiService: ApiService;
  private vueAuth: VueAuthenticate;

  constructor () {
    this.apiService = container.get<ApiService>(TYPES.ApiService);
  }

  initialize (vueAuth: VueAuthenticate) : void {
    this.vueAuth = vueAuth;
  }
/* 
  constructor() {
    super();
    console.log('authService: in constructor');
    this.authContainer = container.get<AuthContainer>(TYPES.AuthContainer);
    // console.log('apiService: %j', this.apiService);
    // console.log('vueAuth: %j', this.vueAuth);
  }
 */
  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  public preAuth(): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
        // If JWT detected, attempt to get & store user's info
      if (this.vueAuth.getToken()) {
        console.log('populate: token: %j', this.vueAuth.getToken());
        this.apiService.getSingle<IUser>('/auth/verify').then((user:IUser) => {
          console.log('setAuth: user to set = %j', user);
          return resolve(user);
          // this.authContainer.setAuth(user);
        },
          err => {
            return reject(err);
          }
        );
      } else {
        console.log('purging auth');
        return resolve(null);
      }
    });
  }

  public facebookLogin(): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.vueAuth.authenticate('facebook', {scope: 'public_profile,email', domain: 'jybe.us'}).then(function (authResponse) {
        if (authResponse.accessToken) {
          this.apiService.post(`/auth/facebook`, {access_token: authResponse.accessToken})
          .then(
            (resp) => {
              return resolve(resp.data);
            }
          );
        }
      });
    });
  }

  public attemptAuth(email: string, password: string): Promise<IUser> {
    // return this.apiService.post<IUser>('/auth/login', {user: user})
    return new Promise<IUser>((resolve, reject) => {
      this.vueAuth.login<IUser>({"user": {"email":email, "password":password}})
      .then(
        (resp) => {
          console.log('logged in: user = %j', resp.data);
          return resolve(resp.data);
        }
      );
    });
  }

  public signup(user): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      if (user.password === user.password2) {
        this.apiService.post<IUser>('/auth/signup', {user: user})
          .then(
            (user:IUser) => {
              return resolve(user);
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
  public updateUser(user): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.apiService
      .put<IUser>('/user', { user }).then((user:IUser) => {
        // Update the currentUser observable
        return resolve(user);
      });
    });
  }

}
