import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import postStore from "../post-store";
import setPostQuery from "./set-post-query";

export default async function addSearchTag(context: BareActionContext<PostState, RootState>)
{
    const form = postStore.state.postSearchForm;
    if(form.tags.indexOf(form.tag) < 0) {
        form.tags.push(form.tag);
    }
    form.tag = '';
    setPostQuery(context);

    return
}
