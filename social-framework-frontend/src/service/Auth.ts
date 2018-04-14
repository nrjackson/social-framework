import { injectable } from 'inversify';
import VueRx from 'vue-rx';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import VueAuthenticate from 'vue-authenticate';
import { IUser, User } from '../model/user';
import { isNullOrUndefined } from 'util';
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";

@injectable()
export class Auth {
  private vueAuth: VueAuthenticate;

  private currentUserSubject = new BehaviorSubject<IUser>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public initialize(vueAuth: VueAuthenticate): void {
    this.vueAuth = vueAuth;
  }

  public getToken(): String {
    return this.vueAuth.getToken();
  }

  setAuth(user: IUser) {
    // Save JWT sent from server in localstorage
    // this.jwtService.saveToken(user.token);
    // console.log('jwt token: %j', this.jwtService.getToken());
    // Set current user data into observable
    console.log('setAuth: user to set = %j', user);
    this.currentUserSubject.next(user);
    console.log('setAuth: set user = %j', this.currentUserSubject.value);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.vueAuth.logout();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  // Update the user on the server (email, pass, etc)
  public updateUser(user): void {
    this.currentUserSubject.next(user);
  }
}
