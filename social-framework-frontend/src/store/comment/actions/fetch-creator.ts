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
import { IUser } from "../../../model/user";

export default async function fetchCreator(context: BareActionContext<CommentState, RootState>, comment:IComment)
{
    commentUtils.commentService.getCreator(comment).then((creator:IUser) => {
        commentStore.commitSetCreator({comment: comment, creator: creator});
    });

    return
}
