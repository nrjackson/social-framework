import { Container } from "inversify";
import "reflect-metadata";
import TYPES from "./Types";
import { Auth } from "../service/Auth";
import { AuthService, AuthServiceImpl } from "../service/AuthService";
import { ApiService, ApiServiceImpl } from "../service/ApiService";
import { PostService, PostServiceImpl } from "../service/PostService";
import App from "../App";
import * as VueAuthenticate from 'vue-authenticate';

let container: Container = new Container();

container.bind<Auth>(TYPES.Auth).to(Auth).inSingletonScope();
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl).inSingletonScope();
container.bind<ApiService>(TYPES.ApiService).to(ApiServiceImpl).inSingletonScope();
container.bind<PostService>(TYPES.PostService).to(PostServiceImpl).inSingletonScope();
container.bind<App>(TYPES.App).to(App).inSingletonScope();

export default container;
