import { inject } from 'inversify';
import Vue from "vue";
import Component from "vue-class-component";
import { AuthService } from '../service/AuthService'
import { IUser } from '../model/user';
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Observable } from 'rxjs/Observable';
import { Auth } from '../service/Auth';

export default class AuthComponent extends Vue {
  private auth: Auth;
  private authService: AuthService;

  protected msg: string = "Welcome to Your Vue.js App";
  protected isAuthenticated: boolean = false;
  protected user = {};

  protected initialize (): void {
    this.auth = container.get<Auth>(TYPES.Auth);
    this.authService = container.get<AuthService>(TYPES.AuthService);
  }

  protected authenticate (): void {
    this.auth.isAuthenticated.subscribe((authenticated:boolean) => {
      this.isAuthenticated = authenticated;
      console.log(`hello mounted: authenticated = ${authenticated}`);
      if(!authenticated) {
        this.$router.push("login");
      } else {
        this.auth.currentUser.subscribe((user:IUser) => {
          console.log('mounted user = %j', user);
          this.user = user;
        });
      }
    });
  }

}
