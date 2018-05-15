import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import postStore from "../post-store";
import setPostQuery from "./set-post-query";

export default async function toggleCreatedByMe(context: BareActionContext<PostState, RootState>)
{
    const form = postStore.state.postSearchForm;
    form.createdByFollowing = false;
    setPostQuery(context);

    return
}
