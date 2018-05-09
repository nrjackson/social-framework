import { IComment, CommentMeta } from '../../model/comment';

export interface CommentState
{
    comment: IComment;
    commentStatus: number;
}