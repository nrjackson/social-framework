import { BareActionContext } from "vuex-typex"
import { CommentState } from "../state"
import { RootState } from "../../index"
import commentUtils from "./comment-utils";
import fetchComments from "./fetch-comments";
import { IComment } from "../../../model/comment";

export default async function addComment(context: BareActionContext<CommentState, RootState>, parentComment:IComment, newComment:IComment)
{
    commentUtils.commentService.addComment(parentComment, newComment).then((result) => {
        fetchComments(context, parentComment);
    });

    return
}
