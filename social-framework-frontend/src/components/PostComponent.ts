import Component from "vue-class-component";
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { Post } from '../model/post';
import { PostService } from '../service/PostService'
import AuthComponent from './AuthComponent';
import post from '../store/post/post'
import { Meta } from "../model/meta";

export default class PostComponent extends AuthComponent {
  protected postService: PostService;

  msg: string = "Welcome to Your Vue.js App";

  get posts() { return post.state.posts }

  protected initialize (): void {
    super.initialize();
    this.postService = container.get<PostService>(TYPES.PostService);
  }

  protected findPosts():void {
    this.postService.fetchPosts().then((posts) => {
      for(let i=0; i<posts.length; i++) {
        posts[i].numLikes = 0;
        posts[i].isLiked = false;
      }
      post.commitSetPosts({posts: posts});
      for(let i=0; i<posts.length; i++) {
        this.postService.getNumLikes(posts[i]).then((numLikes:Meta<number>) => {
          // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
          post.commitSetNumLikes({index: i, numLikes: numLikes.value});
        });
        this.postService.getIsLiked(posts[i]).then((isLiked:Meta<boolean>) => {
          // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
          post.commitSetIsLiked({index: i, isLiked: isLiked.value});
        });
      }
    });
  }
}
