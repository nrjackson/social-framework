import { IPost, PostMeta, PostForm } from '../../model/post';
import { SearchQuery, SearchForm } from '../../model/search/search-query';

export interface PostState
{
    posts: IPost[];
    postsStatus: number;
    post: IPost;
    postStatus: number;
    postForm: PostForm;
    postQuery: SearchQuery;
    postSearchForm: SearchForm;
}