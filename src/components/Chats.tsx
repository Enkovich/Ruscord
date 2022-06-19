import { FC } from 'react';
import { IChats } from '../models/IChats';
import { IUser } from '../models/IUser';
import ChatsElem from './elements/ChatsElem';

interface ChatsProps{
    userData: IUser
    openChat: (data: IChats) => void
    activeChat?: number
    active: boolean
}

const Chats:FC<ChatsProps> = ({userData, openChat, activeChat, active}) => {
    return (
        <div>
            {
                userData.privateChats && userData.privateChats.map((chat)=>
                <ChatsElem data={chat} key={chat.id} open={openChat} activeChat={activeChat} active={active}></ChatsElem>    
            )
            }
        </div>
    );
};
export default Chats;