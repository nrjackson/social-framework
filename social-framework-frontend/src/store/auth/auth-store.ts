import Vue from "vue";
import Vuex from "vuex"
import { ModuleBuilder, getStoreBuilder } from "vuex-typex"
import { AuthState } from "./state"
import { RootState } from "../index"
import { Module } from "vuex"
import { IUser } from "../../model/user";
import { Config } from "../../config/Config";

const initialState: AuthState = {
    user: null,
    isAuthenticated: false 
}

const storeBuilder = getStoreBuilder<RootState>()
const moduleBuilder = storeBuilder.module<AuthState>("auth", initialState)
const stateReader = moduleBuilder.state();

const authStore = {
    get state() { return stateReader() },
    get users() { return this.state.users },
    commitSetUser: moduleBuilder.commit((state: AuthState, payload: { user: IUser }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
    }, "setUser"),
    commitPurgeUser: moduleBuilder.commit((state: AuthState) => {
        state.user = null;
        state.isAuthenticated = false;
    }, "purgeUser"),
}

export default authStore;
