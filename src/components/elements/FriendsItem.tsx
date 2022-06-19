import React, { FC } from 'react';
import { ConfirmFriend, IUser } from '../../models/IUser';

interface FriendsItemProps {
    user: string
    type: string
    action: (data: ConfirmFriend)=>void
}

const FriendsItem:FC<FriendsItemProps> = ({user, type, action}) => {

    const clickHandlerConfirmTrue = () => {action({status: true, username: user})}
    const clickHandlerConfirmFalse = () => {action({status: false, username: user})}
    const clickHandlerDeleteFriend = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        action({username: user, type: 'deleteFriend'})
    }
    const clickStartChat = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.stopPropagation()
        if(type === 'friends'){
            console.log('mmm')
            action({type: 'chats', username: user})
        }
    }


    const pendingItemUserInterface = <div><button onClick={clickHandlerConfirmTrue}>Принять</button><button onClick={clickHandlerConfirmFalse}>Отклонить</button></div>
    const friendsUserItemInterface = <div><button onClick={clickStartChat}>Написать сообщение</button><button onClick={clickHandlerDeleteFriend}>Удалить друга</button></div>

    return (
        <div className='FriendsItem' onClick={clickStartChat}>
            <div>{user}</div>
            {(type === 'pending')? pendingItemUserInterface:''}
            {(type === 'friends')? friendsUserItemInterface:''}
        </div>
    );
};

export default FriendsItem;