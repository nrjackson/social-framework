import { BareActionContext } from "vuex-typex"
import { CommentState } from "../state"
import { RootState } from "../../index"
import { CommentService } from '../../../service/CommentService'
import TYPES from '../../../config/Types';
import commentStore from "../comment-store";
import commentUtils from "./comment-utils";
import fetchLikes from "./fetch-likes";
import { IComment } from "../../../model/comment";
import fetchComments from "./fetch-comments";
import fetchCreator from "./fetch-creator";

export default async function setMeta(context: BareActionContext<CommentState, RootState>, comment:IComment)
{
    fetchCreator(context, comment);
    fetchLikes(context, comment);
    // fetchComments(context, comment);

    return
}
