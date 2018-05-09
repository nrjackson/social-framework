import { BareActionContext } from "vuex-typex"
import { CommentState } from "../state"
import { RootState } from "../../index"
import { CommentService } from '../../../service/CommentService'
import TYPES from '../../../config/Types';
import commentStore from "../comment-store";
import commentUtils from "./comment-utils";
import fetchLikes from "./fetch-likes";
import { IComment } from "../../../model/comment";

export default async function likeComment(context: BareActionContext<CommentState, RootState>, comment:IComment)
{
    commentUtils.commentService.like(comment).then((result) => {
        fetchLikes(context, comment);
    });

    return
}
