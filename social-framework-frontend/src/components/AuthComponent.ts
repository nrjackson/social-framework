import { inject } from 'inversify';
import Vue from "vue";
import { AuthService } from '../service/AuthService'
import { IUser } from '../model/user';
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import authStore from '../store/auth/auth-store'

export default class AuthComponent extends Vue {
  private authService: AuthService;

  protected msg: string = "Welcome to Your Vue.js App";
  // protected isAuthenticated: boolean = false;
  get user() { return authStore.state.user }

  get isAuthenticated() { return authStore.state.isAuthenticated }

  protected initialize (): void {
    this.authService = container.get<AuthService>(TYPES.AuthService);
  }

  protected authenticate (): void {
    if(!authStore.state.isAuthenticated) {
      this.authService.preAuth().then((user:IUser) => {
        if(!user) {
          this.$router.push("login");
        } else {
          authStore.commitSetUser({user: user});
        }
      });
    }
  }
}
