import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import setMeta from "./set-meta";
import { IPost, PostMeta } from "../../../model/post";
import { SearchQuery, SearchItem } from "../../../model/search/search-query";

export default async function fetchPosts(context: BareActionContext<PostState, RootState>)
{
    postUtils.postService.fetchPosts(postStore.state.postQuery).then((posts:IPost[]) => {
        for(let i=0; i<posts.length; i++) {
            posts[i].meta = new PostMeta();
        }
        postStore.commitSetPosts({posts: posts});
        for(let i=0; i<posts.length; i++) {
            setMeta(context, postStore.state.posts[i]);
        }
    });

    return
}
