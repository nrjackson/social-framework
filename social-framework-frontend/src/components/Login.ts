import { inject, injectable } from 'inversify';
import Vue from "vue";
import Component from "vue-class-component";
import { AuthService } from 'service/AuthService'
import { IUser } from 'model/user';

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
  email: string;
  password: string;

  constructor(
    @inject(TYPES.AuthService) private authService: AuthService
  ) {
    super();
  }

  public login():Promise<IUser> {
    return this.authService.attemptAuth({
      email: this.email,
      password: this.password
    });
  }
}
