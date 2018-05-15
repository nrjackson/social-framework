import { IUser } from '../../model/user';

export interface UserState
{
    users: Map<number, IUser>;
}