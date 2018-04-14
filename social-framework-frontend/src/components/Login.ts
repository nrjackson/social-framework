import { inject } from 'inversify';
import Vue from "vue";
import Component from "vue-class-component";
import { AuthService } from '../service/AuthService'
import { IUser } from '../model/user';
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";

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

  public login():void {
    this.authService.attemptAuth(this.email, this.password).then((user:IUser) => {
      this.$router.push("/");
      // Execute application logic after successful login
    });
  }

  public facebookLogin():void {
    this.authService.facebookLogin().then((user:IUser) => {
      this.$router.push("/");
      // Execute application logic after successful login
    });
  }
}
