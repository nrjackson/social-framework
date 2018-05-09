import { BareActionContext } from "vuex-typex"
import { CommentState } from "../state"
import { RootState } from "../../index"
import { MetaService } from '../../../service/MetaService'
import TYPES from '../../../config/Types';
import commentStore from "../comment-store";
import commentUtils from "./comment-utils";
import setMeta from "./set-meta";
import { Meta } from "../../../model/meta";
import { IComment } from "../../../model/comment";

export default async function fetchComments(context: BareActionContext<CommentState, RootState>, comment:IComment)
{
    commentUtils.commentService.getComments(comment).then((comments:IComment[]) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        commentStore.commitSetComments({comment: comment, comments: comments});
        for(let i=0; i<comments.length; i++) {
            setMeta(context, comments[i]);
        }
    });

    return
}
