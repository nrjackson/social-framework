import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import postUtils from "./post-utils";
import fetchComments from "./fetch-comments";
import { IPost } from "../../../model/post";
import { IComment, Comment } from "../../../model/comment";
import postStore from "../post-store";

export default async function addComment(context: BareActionContext<PostState, RootState>, post:IPost)
{
    let comment:IComment = new Comment();
    comment.title = post.meta.newTitle;
    comment.body = post.meta.newBody;
    postUtils.postService.addComment(post, comment).then((result) => {
        postStore.commitResetCommentForm({post: post});
        fetchComments(context, post);
    });

    return
}
