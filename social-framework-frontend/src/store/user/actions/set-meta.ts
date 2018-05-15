import { BareActionContext } from "vuex-typex"
import { UserState } from "../state"
import { RootState } from "../../index"
import { UserService } from '../../../service/UserService'
import TYPES from '../../../config/Types';
import userStore from "../user-store";
import userUtils from "./user-utils";
import fetchFollowers from "./fetch-followers";
import { IUser } from "../../../model/user";

export default async function setMeta(context: BareActionContext<UserState, RootState>, user:IUser)
{
    fetchFollowers(context, user);

    return
}
