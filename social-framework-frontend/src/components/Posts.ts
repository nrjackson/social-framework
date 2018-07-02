import Component from "vue-class-component";
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Post } from '../model/post';
import { PostService } from '../service/PostService'
import PostComponent from './PostComponent';
import LikeButton from "./LikeButton.vue";

@Component({
  name: 'posts',
  components: {
    'like-button': LikeButton
  }
})
export default class Posts extends PostComponent {
  created (): void {
    this.initialize();
  }
  
  mounted (): void {
    this.authenticate();
    this.findPosts();
  }
}
