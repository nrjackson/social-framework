import Vue from "vue";
import Component from "vue-class-component";
import { AuthService } from "./service/AuthService";
import container from "./config/DependencyConfig";
import TYPES from "./config/Types";

@Component({
  name: "App"
})

export default class App extends Vue {
  created () : void {
    console.log('App: in created');
    let authService:AuthService = container.get<AuthService>(TYPES.AuthService);
    // this.vueAuth = (app as any).$auth;
    console.log('vueAuth: %j', (this as any).$auth);
    authService.initialize((this as any).$auth);
  }

}
