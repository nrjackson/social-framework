import Component from "vue-class-component";
import { PostService } from '../service/PostService'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Post } from '../model/post';
import AuthComponent from './AuthComponent';

@Component({
  name: 'newPost',
})

export default class NewPost extends AuthComponent {
  private postService: PostService;
  title: string = '';
  body: string = '';

  msg: string = "Welcome to Your Vue.js App";

  created (): void {
    this.initialize();
    this.postService = container.get<PostService>(TYPES.PostService);
  }

  mounted (): void {
    this.authenticate();
  }

  private addPost():void {
    this.postService.addPost({
      title: this.title,
      body: this.body
    });
    this.$router.push({ name: 'posts' });
  }
}
