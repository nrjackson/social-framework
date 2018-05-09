import Component from "vue-class-component";
import TYPES from '../config/Types';
import container from "../config/DependencyConfig";
import { IPost } from '../model/post';
import { PostService } from '../service/PostService'
import AuthComponent from './AuthComponent';
import postStore from '../store/post/post-store'
import commentStore from "../store/comment/comment-store";
import { IComment } from "../model/comment";

export default class PostComponent extends AuthComponent {
  protected postService: PostService;

  msg: string = "Welcome to Your Vue.js App";

  get posts() { return postStore.state.posts }
  get postForm() { return postStore.state.postForm }
/*   
  get metaMap() { return postStore.state.postMetaMap }

  isLiked(post:IPost):boolean { 
    let postMeta = postStore.state.postMetaMap.get(post.id);
    if(postMeta) {return postMeta.isLiked}
    else return false;
  }
  numLikes(post:IPost):number { 
    // console.log('numLikes - postMetaMap: %j', postStore.state.postMetaMap);
    return postStore.numPostLikes(post.id);
  }
 */

  protected addPost():void {
    postStore.dispatchAddPost();
  }

  protected addFormTag():void {
    postStore.commitAddTagToForm({});
  }

  protected removeFormTag(tag:string):void {
    postStore.commitRemoveTagFromForm({tag: tag});
  }

  protected findPosts():void {
    postStore.dispatchFetchPosts();
  }
  
  protected likePost(post:IPost):void {
    postStore.dispatchLikePost(post);
  }
  
  protected unlikePost(post:IPost):void {
    postStore.dispatchUnlikePost(post);
  }
  
  protected addComment(post:IPost):void {
    postStore.dispatchAddComment(post);
  }
  
  protected likeComment(comment:IComment):void {
    commentStore.dispatchLikeComment(comment);
  }
  
  protected unlikeComment(comment:IComment):void {
    commentStore.dispatchUnlikeComment(comment);
  }
}
