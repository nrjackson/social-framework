import { BareActionContext } from "vuex-typex"
import { CommentState } from "../state"
import { RootState } from "../../index"
import { CommentService } from '../../../service/CommentService'
import TYPES from '../../../config/Types';
import commentStore from "../comment-store";
import commentUtils from "./comment-utils";
import { IComment } from "../../../model/comment";
import fetchLikes from "./fetch-likes";

export default async function unlikeComment(context: BareActionContext<CommentState, RootState>, comment:IComment)
{
    commentUtils.commentService.unlike(comment).then((result) => {
        fetchLikes(context, comment);
    });

    return
}