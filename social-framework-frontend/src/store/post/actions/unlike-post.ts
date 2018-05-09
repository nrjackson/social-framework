import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import fetchLikes from "./fetch-likes";
import { IPost } from "../../../model/post";

export default async function unlikePost(context: BareActionContext<PostState, RootState>, post:IPost)
{
    postUtils.postService.unlike(post).then((result) => {
        fetchLikes(context, post);
    });

    return
}