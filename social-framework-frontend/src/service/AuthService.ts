import { inject, injectable } from 'inversify';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api-service';
import { JwtService } from './jwt-service';
import { IUser, User } from '../model/user';
import { isNullOrUndefined } from 'util';
import TYPES from '../config/Types';

declare const FB:any;

export interface AuthService {
  attemptAuth(user): Promise<User>;
  signup(user): Promise<User>;
}

@injectable()
export class AuthServiceImpl implements AuthService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    @inject(TYPES.ApiService) private apiService: ApiService,
    @inject(TYPES.JwtService) private jwtService: JwtService
  ) {
    if(navigator.onLine) {
      FB.init({
        appId      : '344516082673916',
        status     : false, // the SDK will attempt to get info about the current user immediately after init
        cookie     : false,  // enable cookies to allow the server to access the session
        xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize
                             // any social plugins that have been added using XFBML
        version    : 'v2.8' // use graph api version 2.5
      });
    }
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      // alert('token: ' + this.jwtService.getToken());
      this.apiService.get('/auth').then(
      (user:IUser)  => this.setAuth(user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: IUser) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          return this.apiService.post(`/auth/facebook`, {access_token: result.authResponse.accessToken})
            .then(
              (data:IUser) => {
                this.setAuth(data);
                return data;
              }
            );
        } else {
          reject();
        }
      }, {scope: 'public_profile,email', domain: 'jybe.us'})
    });
  }

  attemptAuth(user): Promise<IUser> {
    return this.apiService.post<IUser>('/auth/login', {user: user})
    .then(
      (data:IUser) => {
        this.setAuth(user);
        return data;
      }
    );
  }

  signup(user): Promise<User> {
    if (user.password === user.password2) {
      return this.apiService.post<IUser>('/auth/signup', {user: user})
        .then(
          (data:IUser) => {
            this.setAuth(data);
            return data;
          }
        );
    }
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

  getCurrentUser(): IUser {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Promise<IUser> {
    return this.apiService
    .put<IUser>('/user', { user }).then((user:IUser) => {
      // Update the currentUser observable
      this.currentUserSubject.next(user);
      return user;
    });
  }

}
