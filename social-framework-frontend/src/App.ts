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
  // Accordion
  public myFunction(id): void {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
    } else { 
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className = 
        x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
  }

  // Used to toggle the menu on smaller screens when clicking on the menu button
  public openNav(): void {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
  }
}
