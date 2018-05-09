import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import postUtils from "./post-utils";
import fetchComments from "./fetch-comments";
import { IPost, Post } from "../../../model/post";
import postStore from "../post-store";
import setMeta from "./set-meta";
import fetchPosts from "./fetch-posts";

export default async function addPost(context: BareActionContext<PostState, RootState>)
{
    let post:IPost = new Post();
    post.title = postStore.state.postForm.title;
    post.body = postStore.state.postForm.body;
    postUtils.postService.addPost(post, postStore.state.postForm.tags).then((result) => {
        postStore.commitResetPostForm({});
        fetchPosts(context);
    });

    return
}
