import {IClosetItem} from './IClosetItem';

export interface IReduxState {
    token: string;
    closetItemsWImages: IClosetItem[] | null;
}
