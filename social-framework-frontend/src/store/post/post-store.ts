import Vuex from "vuex"
import { ModuleBuilder, getStoreBuilder } from "vuex-typex"
import { PostState } from "./state"
import { RootState } from "../index"
import { Module } from "vuex"
import { IPost, Post, PostMeta, PostForm } from "../../model/post";
import addPost from "./actions/add-post"
import fetchPosts from "./actions/fetch-posts"
import likePost from "./actions/like-post"
import unlikePost from "./actions/unlike-post"
import addComment from "./actions/add-comment"
import addSearchTag from "./actions/add-search-tag"
import removeSearchTag from "./actions/remove-search-tag"
import toggleCreatedByMe from "./actions/created-by-me"
import toggleCreatedByFollowing from "./actions/created-by-following"
import { IComment } from "../../model/comment";
import { IUser } from "../../model/user";
import { SearchQuery, SearchForm } from "../../model/search/search-query";

const initialState: PostState = {
    posts: [],
    postsStatus: 0,
    post: new Post(),
    postStatus: 0,
    postForm: new PostForm(),
    postQuery: new SearchQuery(),
    postSearchForm: new SearchForm(),
}

const storeBuilder = getStoreBuilder<RootState>()
const moduleBuilder = storeBuilder.module<PostState>("post", initialState)
const stateReader = moduleBuilder.state();

const postStore = {
    get state() { return stateReader() },

    commitSetPosts: moduleBuilder.commit((state: PostState, payload: { posts: IPost[] }) => {
        state.posts = payload.posts;
    }, "setPosts"),
    commitAddPost: moduleBuilder.commit((state: PostState, payload: { post: IPost }) => {
        state.posts.push(payload.post);
    }, "addPost"),
    commitSetPost: moduleBuilder.commit((state: PostState, payload: { post: IPost }) => state.post = payload.post, "setPost"),
    commitSetNumLikes: moduleBuilder.commit((state: PostState, payload: { post: IPost, numLikes: number }) => {
        console.log('Setting numlikes for post: %j = %j', payload.post.id, payload.numLikes)
        payload.post.meta.numLikes = payload.numLikes;
    }, "setNumLikes"),
    commitSetIsLiked: moduleBuilder.commit((state: PostState, payload: { post: IPost, isLiked: boolean }) => {
        payload.post.meta.isLiked = payload.isLiked;
    }, "setIsLiked"),
    commitSetCreator: moduleBuilder.commit((state: PostState, payload: { post: IPost, creator: IUser }) => {
        payload.post.meta.creator = payload.creator;
    }, "setCreator"),
    commitSetComments: moduleBuilder.commit((state: PostState, payload: { post: IPost, comments: IComment[] }) => {
        payload.post.meta.comments = payload.comments;
    }, "setComments"),
    commitSetTags: moduleBuilder.commit((state: PostState, payload: { post: IPost, tags: string[] }) => {
        payload.post.meta.tags = payload.tags;
    }, "setTags"),
    commitAddTagToForm: moduleBuilder.commit((state: PostState, payload: {}) => {
        if(state.postForm.tags.indexOf(state.postForm.tag) < 0) {
            state.postForm.tags.push(state.postForm.tag);
        }
        state.postForm.tag = '';
    }, "addTagToForm"),
    commitRemoveTagFromForm: moduleBuilder.commit((state: PostState, payload: { tag: string }) => {
        state.postForm.tags.splice(state.postForm.tags.indexOf(payload.tag), 1);
    }, "removeTagFromForm"),
    commitResetPostForm: moduleBuilder.commit((state: PostState, payload: {}) => {
        state.postForm = new PostForm();
    }, "resetPostForm"),
    commitResetCommentForm: moduleBuilder.commit((state: PostState, payload: { post: IPost }) => {
        payload.post.meta.newTitle = '';
        payload.post.meta.newBody = '';
    }, "resetCommentForm"),
    commitSetQuery: moduleBuilder.commit((state: PostState, payload: { query: SearchQuery }) => {
        state.postQuery = payload.query;
    }, "setPostQuery"),

    dispatchAddPost: moduleBuilder.dispatch(addPost),
    dispatchFetchPosts: moduleBuilder.dispatch(fetchPosts),
    dispatchLikePost: moduleBuilder.dispatch(likePost),
    dispatchUnlikePost: moduleBuilder.dispatch(unlikePost),
    dispatchAddComment: moduleBuilder.dispatch(addComment),
    dispatchAddSearchTag: moduleBuilder.dispatch(addSearchTag),
    dispatchRemoveSearchTag: moduleBuilder.dispatch(removeSearchTag),
    dispatchToggleCreatedByMe: moduleBuilder.dispatch(toggleCreatedByMe),
    dispatchToggleCreatedByFollowing: moduleBuilder.dispatch(toggleCreatedByFollowing),
}

export default postStore