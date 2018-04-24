import { IPost } from '../../model/post';

export interface PostState
{
    posts: IPost[];
    postsStatus: number;
    post: IPost;
    postStatus: number;
}