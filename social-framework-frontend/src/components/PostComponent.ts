import Component from "vue-class-component";
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { IPost } from '../model/post';
import { PostService } from '../service/PostService'
import AuthComponent from './AuthComponent';
import postStore from '../store/post/post-store'
import { Meta } from "../model/meta";

export default class PostComponent extends AuthComponent {
  protected postService: PostService;

  msg: string = "Welcome to Your Vue.js App";

  get posts() { return postStore.state.posts }

  protected initialize (): void {
    super.initialize();
    this.postService = container.get<PostService>(TYPES.PostService);
  }

  protected setMeta(index) {
    this.postService.getNumLikes(postStore.state.posts[index]).then((numLikes:Meta<number>) => {
      // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
      postStore.commitSetNumLikes({index: index, numLikes: numLikes.value});
    });
    this.postService.getIsLiked(postStore.state.posts[index]).then((isLiked:Meta<boolean>) => {
      // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
      postStore.commitSetIsLiked({index: index, isLiked: isLiked.value});
    });
}

  protected findPosts():void {
    this.postService.fetchPosts().then((posts:IPost[]) => {
      for(let i=0; i<posts.length; i++) {
        posts[i].numLikes = 0;
        posts[i].isLiked = false;
      }
      postStore.commitSetPosts({posts: posts});
      for(let i=0; i<posts.length; i++) {
        this.setMeta(i);
      }
    });
  }
  
  protected likePost(index):void {
    this.postService.likePost(postStore.state.posts[index]).then((post:IPost) => {
      this.setMeta(index);
    });
  }
  
  protected unlikePost(index):void {
    this.postService.unlikePost(postStore.state.posts[index]).then((post:IPost) => {
      this.setMeta(index);
    });
  }
}
