import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import fetchLikes from "./fetch-likes";
import { IPost } from "../../../model/post";
import fetchPosts from "./fetch-posts";
import fetchComments from "./fetch-comments";
import fetchCreator from "./fetch-creator";
import fetchTags from "./fetch-tags";

export default async function setMeta(context: BareActionContext<PostState, RootState>, post:IPost)
{
    // postStore.commitInitMeta({postId: post.id});
    fetchCreator(context, post);
    fetchLikes(context, post);
    fetchTags(context, post);
    fetchComments(context, post);
    return
}
