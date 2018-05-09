import { BareActionContext } from "vuex-typex"
import { CommentState } from "../state"
import { RootState } from "../../index"
import { CommentService } from '../../../service/CommentService'
import TYPES from '../../../config/Types';
import commentStore from "../comment-store";
import commentUtils from "./comment-utils";
import { IComment } from "../../../model/comment";
import { Meta } from "../../../model/meta";

export default async function fetchLikes(context: BareActionContext<CommentState, RootState>, comment:IComment)
{
    commentUtils.commentService.getNumLikes(comment).then((numLikes:Meta<number>) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        commentStore.commitSetNumLikes({comment: comment, numLikes: numLikes.value});
    });
    commentUtils.commentService.getIsLiked(comment).then((isLiked:Meta<boolean>) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        commentStore.commitSetIsLiked({comment: comment, isLiked: isLiked.value});
    });

    return
}
