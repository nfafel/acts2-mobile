import {IClosetItem} from '../interfaces/IClosetItem';

export interface IReduxState {
    token: string,
    closetItemsWImages: IClosetItem[] | null
}