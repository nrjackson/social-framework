
import Vuex from "vuex"
import { ModuleBuilder, getStoreBuilder } from "vuex-typex"
import { PostState } from "./state"
import { RootState } from "../index"
import { Module } from "vuex"
import { IPost, Post } from "../../model/post";

const initialState: PostState = {
    posts: [],
    postsStatus: 0,
    post: new Post(),
    postStatus: 0
}

const storeBuilder = getStoreBuilder<RootState>()
const moduleBuilder = storeBuilder.module<PostState>("post", initialState)
const stateReader = moduleBuilder.state();

const postStore = {
    get state() { return stateReader() },
    commitSetPosts: moduleBuilder.commit((state: PostState, payload: { posts: IPost[] }) => {
        state.posts = payload.posts;
    }, "setPosts"),
    commitSetPost: moduleBuilder.commit((state: PostState, payload: { post: IPost }) => state.post = payload.post, "setPost"),
    commitSetNumLikes: moduleBuilder.commit((state: PostState, payload: { index: number, numLikes: number }) => {
        state.posts[payload.index].numLikes = payload.numLikes;
    }, "setNumLikes"),
    commitSetIsLiked: moduleBuilder.commit((state: PostState, payload: { index: number, isLiked: boolean }) => {
        state.posts[payload.index].isLiked = payload.isLiked;
    }, "setIsLiked"),
}

export default postStore