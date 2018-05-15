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
import fetchPosts from "./fetch-posts";

export default async function setPostQuery(context: BareActionContext<PostState, RootState>)
{
    const form = postStore.state.postSearchForm;
    let query = new SearchQuery();
    let createdBy:string = null;
    let likedBy:string = null;
    const tags = form.tags;
    if(form.createdByMe) createdBy = 'me';
    if(form.createdByFollowing) createdBy = 'followed';
    if(form.likedByMe) likedBy = 'me';
    if(form.likedByFollowing) likedBy = 'followed';
    if(createdBy) {
        query.searchItems.push(new SearchItem('createdby', 'id', createdBy));
    }
    if(likedBy) {
        query.searchItems.push(new SearchItem('likedby', 'id', likedBy));
    }
    for(let i=0; i<tags.length; i++) {
        query.searchItems.push(new SearchItem('hastag', 'name', tags[i]));
    }
    postStore.commitSetQuery({query:query});
    fetchPosts(context);

    return
}
