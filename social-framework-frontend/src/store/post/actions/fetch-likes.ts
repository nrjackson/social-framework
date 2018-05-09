import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import { IPost } from "../../../model/post";
import { Meta } from "../../../model/meta";

export default async function fetchLikes(context: BareActionContext<PostState, RootState>, post:IPost)
{
    postUtils.postService.getNumLikes(post).then((numLikes:Meta<number>) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        postStore.commitSetNumLikes({post: post, numLikes: numLikes.value});
    });
    postUtils.postService.getIsLiked(post).then((isLiked:Meta<boolean>) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        postStore.commitSetIsLiked({post: post, isLiked: isLiked.value});
    });

    return
}
