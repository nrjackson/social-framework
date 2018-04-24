
import { getStoreBuilder } from "vuex-typex"
import { AuthState } from "./auth/state";
import { PostState } from "./post/state"
import { Store } from "vuex"

export interface RootState
{
    auth: AuthState
    post: PostState
}

export const buildStore = () => getStoreBuilder<RootState>().vuexStore()