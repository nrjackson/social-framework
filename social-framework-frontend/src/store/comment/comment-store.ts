import Vuex from "vuex"
import { ModuleBuilder, getStoreBuilder } from "vuex-typex"
import { CommentState } from "./state"
import { RootState } from "../index"
import { Module } from "vuex"
import fetchComments from "./actions/fetch-comments"
import likeComment from "./actions/like-comment"
import unlikeComment from "./actions/unlike-comment"
import { IComment, Comment, CommentMeta } from "../../model/comment";
import { IUser } from "../../model/user";
import setMeta from "./actions/set-meta";

const initialState: CommentState = {
    comment: new Comment(),
    commentStatus: 0,
}

const storeBuilder = getStoreBuilder<RootState>()
const moduleBuilder = storeBuilder.module<CommentState>("comment", initialState)
const stateReader = moduleBuilder.state();

const commentStore = {
    get state() { return stateReader() },
    commitSetComment: moduleBuilder.commit((state: CommentState, payload: { comment: IComment }) => state.comment = payload.comment, "setComment"),
    commitSetNumLikes: moduleBuilder.commit((state: CommentState, payload: { comment: IComment, numLikes: number }) => {
        payload.comment.meta.numLikes = payload.numLikes;
    }, "setNumLikes"),
    commitSetIsLiked: moduleBuilder.commit((state: CommentState, payload: { comment: IComment, isLiked: boolean }) => {
        payload.comment.meta.isLiked = payload.isLiked;
    }, "setIsLiked"),
    commitSetCreator: moduleBuilder.commit((state: CommentState, payload: { comment: IComment, creator: IUser }) => {
        payload.comment.meta.creator = payload.creator;
    }, "setCreator"),
    commitSetComments: moduleBuilder.commit((state: CommentState, payload: { comment: IComment, comments: IComment[] }) => {
        payload.comment.meta.comments =  payload.comments;
    }, "setComments"),
    commitResetCommentForm: moduleBuilder.commit((state: CommentState, payload: { comment: IComment }) => {
        payload.comment.meta.newTitle = '';
        payload.comment.meta.newBody = '';
    }, "resetCommentForm"),
    dispatchFetchComments: moduleBuilder.dispatch(fetchComments),
    dispatchLikeComment: moduleBuilder.dispatch(likeComment),
    dispatchUnlikeComment: moduleBuilder.dispatch(unlikeComment),
    dispatchSetMeta: moduleBuilder.dispatch(setMeta),
}

export default commentStore