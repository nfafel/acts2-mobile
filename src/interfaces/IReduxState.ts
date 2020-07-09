import { IUser } from ".";

export interface IReduxState {
    token: string;
    user: IUser | null;
}
