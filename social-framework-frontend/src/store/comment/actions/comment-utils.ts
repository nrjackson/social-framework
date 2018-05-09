import { BareActionContext } from "vuex-typex"
import { CommentState } from "../state"
import { RootState } from "../../index"
import { CommentService } from '../../../service/CommentService'
import TYPES from '../../../config/Types';
import container from "../../../config/DependencyConfig";
import { Meta } from "../../../model/meta";
import commentStore from "../comment-store";
import { IComment } from "../../../model/comment";
import { MetaService } from "../../../service/MetaService";

const commentService = container.get<CommentService>(TYPES.CommentService);

const commentUtils = {
    get commentService() {return commentService;},
}

export default commentUtils;
