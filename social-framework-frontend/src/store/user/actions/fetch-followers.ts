import { BareActionContext } from "vuex-typex"
import { UserState } from "../state"
import { RootState } from "../../index"
import { UserService } from '../../../service/UserService'
import TYPES from '../../../config/Types';
import userStore from "../user-store";
import userUtils from "./user-utils";
import { IUser } from "../../../model/user";
import { Meta } from "../../../model/meta";

export default async function fetchFollowers(context: BareActionContext<UserState, RootState>, user:IUser)
{
    userUtils.userService.getNumFollowers(user).then((numFollowers:Meta<number>) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        userStore.commitSetNumFollowers({user: user, numFollowers: numFollowers.value});
    });
    userUtils.userService.getIsFollowed(user).then((isFollowed:Meta<boolean>) => {
        // console.log('setting num likes for index: ' + i + ': ' + numLikes.value);
        userStore.commitSetIsFollowed({user: user, isFollowed: isFollowed.value});
    });

    return
}
