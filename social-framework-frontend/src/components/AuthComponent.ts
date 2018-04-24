import { inject } from 'inversify';
import Vue from "vue";
import { AuthService } from '../service/AuthService'
import { IUser } from '../model/user';
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import auth from '../store/auth/auth'

export default class AuthComponent extends Vue {
  private authService: AuthService;

  protected msg: string = "Welcome to Your Vue.js App";
  // protected isAuthenticated: boolean = false;
  get user() { return auth.state.user }

  get isAuthenticated() { return auth.state.isAuthenticated }

  protected initialize (): void {
    this.authService = container.get<AuthService>(TYPES.AuthService);
  }

  protected authenticate (): void {
    if(!auth.state.isAuthenticated) {
      this.authService.preAuth().then((user:IUser) => {
        if(!user) {
          this.$router.push("login");
        } else {
          auth.commitSetUser({user: user});
        }
      });
    }
  }
}
