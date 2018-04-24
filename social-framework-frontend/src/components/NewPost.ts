import Component from "vue-class-component";
import { PostService } from '../service/PostService'
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Post, IPost } from '../model/post';
import PostComponent from "./PostComponent";

@Component({
  name: 'newPost',
})

export default class NewPost extends PostComponent {
  title: string = '';
  body: string = '';

  created (): void {
    this.initialize();
  }

  mounted (): void {
    this.authenticate();
  }

  private addPost():void {
    this.postService.addPost({
      title: this.title,
      body: this.body
    }).then((post:IPost) => {
      this.findPosts();
      this.$router.push({ name: 'posts' });
    });
  }
}
