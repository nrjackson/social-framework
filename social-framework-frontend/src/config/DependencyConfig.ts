import { Container } from "inversify";
import "reflect-metadata";
import TYPES from "./Types";
import { AuthService, AuthServiceImpl } from "../service/AuthService";
import { ApiService, ApiServiceImpl } from "../service/ApiService";
import { PostService, PostServiceImpl } from "../service/PostService";
import { CommentService, CommentServiceImpl } from "../service/CommentService";
import App from "../App";
import { Config } from "./Config";
import { UserService, UserServiceImpl } from "../service/UserService";

let container: Container = new Container();

container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl).inSingletonScope();
container.bind<ApiService>(TYPES.ApiService).to(ApiServiceImpl).inSingletonScope();
container.bind<CommentService>(TYPES.CommentService).to(CommentServiceImpl).inSingletonScope();
container.bind<PostService>(TYPES.PostService).to(PostServiceImpl).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl).inSingletonScope();
container.bind<Config>(TYPES.Config).to(Config).inSingletonScope();
container.bind<App>(TYPES.App).to(App).inSingletonScope();

export default container;
