import Vue from "vue";
import Component from "vue-class-component";
import { ApiService, ApiServiceImpl } from "./service/ApiService";
import { AuthService, AuthServiceImpl } from "./service/AuthService";
import container from "./config/DependencyConfig";
import TYPES from "./config/Types";

@Component({
  name: "App"
})

export default class App extends Vue {
  created () : void {
    console.log('App: in created');
    let apiService:ApiServiceImpl = container.get<ApiService>(TYPES.ApiService) as ApiServiceImpl;
    let authService:AuthServiceImpl = container.get<AuthService>(TYPES.AuthService) as AuthServiceImpl;
    // this.vueAuth = (app as any).$auth;
    console.log('vueAuth: %j', (this as any).$auth);
    apiService.initialize((this as any).$auth);
    authService.initialize((this as any).$auth);
  }
}
