import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import { IPost } from "../../../model/post";
import { Meta } from "../../../model/meta";
import { IUser, UserMeta } from "../../../model/user";
import userStore from "../../user/user-store";

export default async function fetchCreator(context: BareActionContext<PostState, RootState>, post:IPost)
{
    postUtils.postService.getCreator(post).then((creator:IUser) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        if(creator) {
            if(!userStore.state.users.has(creator.id)) {
                console.log("setting user in map: %j", creator)
                creator.meta = new UserMeta();
                userStore.commitSetUser({user: creator});
                userStore.dispatchSetMeta(creator);
            }
            console.log("setting creatpr in post: %j", userStore.state.users.get(creator.id))
            postStore.commitSetCreator({post: post, creator: userStore.state.users.get(creator.id)});
        }
    });

    return
}
