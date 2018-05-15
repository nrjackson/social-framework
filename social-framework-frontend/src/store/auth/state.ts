import { IUser } from "../../model/user";

export interface AuthState
{
    user: IUser,
    isAuthenticated: boolean,
}