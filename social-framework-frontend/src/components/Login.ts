import { inject } from 'inversify';
import Vue from "vue";
import Component from "vue-class-component";
import { AuthService } from '../service/AuthService'
import { IUser } from '../model/user';
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import authStore from '../store/auth/auth-store'

@Component({
    name: 'login',
    data () {
      return {
        email: '',
        password: ''
      }
    }
})

export default class Login extends Vue {
  private authService: AuthService

  email: string;
  password: string;

  created (): void {
    console.log('in created()');
    this.authService = container.get<AuthService>(TYPES.AuthService);
    console.log('authService: %j', this.authService);
  }

  private loginSuccess(user: IUser): void {
    authStore.commitSetUser({user: user});
    this.$router.push("/");
  }

  public login():void {
    this.authService.attemptAuth(this.email, this.password).then((user:IUser) => {
      this.loginSuccess(user);
    });
  }

  public facebookLogin():void {
    this.authService.facebookLogin().then((user:IUser) => {
      this.loginSuccess(user);
    });
  }
}
