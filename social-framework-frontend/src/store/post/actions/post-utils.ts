import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import container from "../../../config/DependencyConfig";
import postStore from "../post-store";
import { IPost } from "../../../model/post";
import { IComment } from "../../../model/comment";

const postService = container.get<PostService>(TYPES.PostService);

const postUtils = {
    get postService() {return postService;},
}

export default postUtils;
