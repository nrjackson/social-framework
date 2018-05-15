import Vuex from "vuex"
import { ModuleBuilder, getStoreBuilder } from "vuex-typex"
import { UserState } from "./state"
import { RootState } from "../index"
import { Module } from "vuex"
import { IUser } from "../../model/user";
import followUser from "./actions/follow-user"
import unfollowUser from "./actions/unfollow-user"
import setMeta from "./actions/set-meta";

const initialState: UserState = {
    users: new Map<number, IUser>(),
}

const storeBuilder = getStoreBuilder<RootState>()
const moduleBuilder = storeBuilder.module<UserState>("user", initialState)
const stateReader = moduleBuilder.state();

const userStore = {
    get state() { return stateReader() },
    commitSetUser: moduleBuilder.commit((state: UserState, payload: { user: IUser }) => {
        state.users.set(payload.user.id, payload.user);
    }, "setUser"),
    commitSetNumFollowers: moduleBuilder.commit((state: UserState, payload: { user: IUser, numFollowers: number }) => {
        state.users.get(payload.user.id).meta.numFollowers = payload.numFollowers;
    }, "setNumLikes"),
    commitSetIsFollowed: moduleBuilder.commit((state: UserState, payload: { user: IUser, isFollowed: boolean }) => {
        payload.user.meta.isFollowed = payload.isFollowed;
    }, "setIsFollowing"),
    dispatchFollowUser: moduleBuilder.dispatch(followUser),
    dispatchUnfollowUser: moduleBuilder.dispatch(unfollowUser),
    dispatchSetMeta: moduleBuilder.dispatch(setMeta),
}

export default userStore