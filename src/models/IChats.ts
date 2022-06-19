export interface IChats {
    id?: number,
    name?: string,
    timeSendLastMessage?: number,
    members?: any[],
    isAdmin?: boolean
}
export interface IChatsStatus {
    isError?: boolean,
    chatId?: number
}