import { BareActionContext } from "vuex-typex"
import { PostState } from "../state"
import { RootState } from "../../index"
import { PostService } from '../../../service/PostService'
import TYPES from '../../../config/Types';
import postStore from "../post-store";
import postUtils from "./post-utils";
import { IPost } from "../../../model/post";
import { Meta } from "../../../model/meta";
import { IUser } from "../../../model/user";

export default async function fetchCreator(context: BareActionContext<PostState, RootState>, post:IPost)
{
    postUtils.postService.getCreator(post).then((creator:IUser) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        if(creator) {
            postStore.commitSetCreator({post: post, creator: creator});
        }
/* 
        for(let i=0; i<users.length; i++) {
            fetch.Creator
        }
 */        
    });

    return
}
