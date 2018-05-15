import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import fetchLikes from "./fetch-likes";
import { IPost } from "../../../model/post";
import setPostQuery from "./set-post-query";

export default async function removeSearchTag(context: BareActionContext<PostState, RootState>, tag:string)
{
    const form = postStore.state.postSearchForm;
    if(form.tags.indexOf(tag) >= 0) {
        form.tags.splice(form.tags.indexOf(tag), 1);
    }
    setPostQuery(context);

    return
}
