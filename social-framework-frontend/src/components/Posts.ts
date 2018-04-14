import Component from "vue-class-component";
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Post } from '../model/post';
import { PostService } from '../service/PostService'
import AuthComponent from './AuthComponent';

@Component({
  name: 'posts',
})
export default class Posts extends AuthComponent {
  private postService: PostService;
  posts = [];

  msg: string = "Welcome to Your Vue.js App";

  created (): void {
    this.initialize();
    this.postService = container.get<PostService>(TYPES.PostService);
  }

  mounted (): void {
    this.authenticate();
    this.getPosts();
  }

  private getPosts():void {
    this.postService.fetchPosts().then((posts) => {
      this.posts = posts
    });
  }
}
