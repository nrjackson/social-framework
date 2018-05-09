import { IPost, PostMeta, PostForm } from '../../model/post';

export interface PostState
{
    posts: IPost[];
    postsStatus: number;
    post: IPost;
    postStatus: number;
    postForm: PostForm;
}