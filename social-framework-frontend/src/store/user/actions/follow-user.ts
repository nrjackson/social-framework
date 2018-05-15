import { BareActionContext } from "vuex-typex"
import { UserState } from "../state"
import { RootState } from "../../index"
import userUtils from "./user-utils";
import fetchFollowers from "./fetch-followers";
import { IUser } from "../../../model/user";

export default async function followUser(context: BareActionContext<UserState, RootState>, user:IUser)
{
    userUtils.userService.follow(user).then((result) => {
        fetchFollowers(context, user);
    });

    return
}
