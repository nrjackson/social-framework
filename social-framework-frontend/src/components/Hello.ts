import Component from "vue-class-component";
import AuthComponent from './AuthComponent';

@Component({
  name: "hello",
})

export default class Hello extends AuthComponent {

  created (): void {
    this.initialize();
  }

  mounted (): void {
    this.authenticate();
  }

}
