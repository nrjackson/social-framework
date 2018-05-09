import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import { IPost } from "../../../model/post";
import { Meta } from "../../../model/meta";

export default async function fetchTags(context: BareActionContext<PostState, RootState>, post:IPost)
{
    postUtils.postService.getTags(post).then((tags:Meta<string[]>) => {
        postStore.commitSetTags({post: post, tags: tags.value});
    });

    return
}
