import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import { IPost } from "../../../model/post";
import { Meta } from "../../../model/meta";
import { IComment, CommentMeta } from "../../../model/comment";
import commentStore from "../../comment/comment-store";

export default async function fetchComments(context: BareActionContext<PostState, RootState>, post:IPost)
{
    postUtils.postService.getComments(post).then((comments:IComment[]) => {
        for(let i=0; i<comments.length; i++) {
            comments[i].meta = new CommentMeta();
        }
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        postStore.commitSetComments({post: post, comments: comments});
        for(let i=0; i<comments.length; i++) {
            commentStore.dispatchSetMeta(comments[i]);
        }
    });

    return
}
