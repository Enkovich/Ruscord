import { IChats } from "./IChats";
import { INotification } from "./INotification";

export interface IUser{
    id?: number | null,
    password?: string | null,
    name?: string | null,
    notifications?: INotification | null,
    friends?:any[]|null,
    chats?: IChats[]|null,
    privateChats?: IChats[]|null
}
export interface ConfirmFriend{
    status?: boolean,
    username?: string,
    id?: number,
    type?: string
}