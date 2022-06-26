import React, { FC, useEffect, useState } from 'react';
import { ConfirmFriend, IUser } from '../models/IUser';
import FriendsItem from './elements/FriendsItem';
import { userAPI } from '../services/userService';
import { chatAPI } from '../services/chatService';
import { IChats } from '../models/IChats';

interface FriendsProps{
    userData: IUser
    openChat: (data: IChats)=> void
}

const Friends:FC<FriendsProps> = ({userData, openChat}) => {

    const [mode, setMode] = useState<string>('friends')
    const pending = userData?.notifications?.pendings
    const friends = userData?.friends
    const [inputUserName, setInputUserName] = useState<string>('')
    const [confirmFriend] = userAPI.useConfirmFriendMutation()
    const [deleteFriend] = userAPI.useDeleteFriendMutation()

    const [addFriends, {data: status}] = userAPI.useAddFriendMutation()
    const [createChat, {data: statusChat}] = chatAPI.useCreateChatMutation()

    const TogglePageFriends = () => {setMode('friends')}
    const TogglePagePending = () => {setMode('pending')}
    const TogglePageAddFriends = () => {setMode('addFriends')}

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{setInputUserName(e.target.value)}
    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()

        addFriends({name_friend: inputUserName, user_id: userData?.id})
    }

    const confirmFriends = (data:ConfirmFriend) => {
        if (userData?.id) confirmFriend({...data, id: userData?.id})
    }
    const friendsActionHandler = async (data:ConfirmFriend) => {
        if(data.type === 'deleteFriend'){
            const confirm = window.confirm('Уверены?')
            if(confirm && userData?.id) deleteFriend({...data, id: userData?.id})
        }
        if(data.type === 'chats' && userData.id){
            await createChat({name: data.username, type: 'private', members: [data.username], user: userData.id})
            if(statusChat && !statusChat.isError) {
                
            }
        }
    }
    useEffect(()=>{
        if(!statusChat?.isError) {
            if (statusChat){
                userData.privateChats?.map(Chat=>{
                    if(Chat.id===statusChat.chatId){
                        if(statusChat)openChat(Chat)  
                    }
            })
        }}
    }, [openChat, statusChat, userData.privateChats])

    return (
        <div>
            <div className='FriendsPanelInputs'>
                <div className='titlePageFriends'>Друзья</div>
                <div onClick={TogglePageFriends} className={(mode==='friends')?'friendsInput action':'friendsInput'}>Добавленные</div>
                <div onClick={TogglePagePending} className={(mode==='pending')?'friendsInput action':'friendsInput'}>В ожидании</div>
                <div onClick={TogglePageAddFriends} className={(mode==='addFriends')?'addFriendsInput action':'addFriendsInput'}>Добавить друга</div>
            </div>
            <div>
                {(mode==='friends')? friends?.map((friend, index) => (friend!==undefined && friend!=='')?<FriendsItem user={friend} type={mode} action={friendsActionHandler} key={index}></FriendsItem>
                    : <div className='friendsEmpty' key={0}>Друзей нет</div>):''}
                {(mode==='pending')? pending?.map((pending, index) => (pending!==undefined && pending!=='')?<FriendsItem user={pending} type={mode} action={confirmFriends} key={index}></FriendsItem>
                    : <div className='friendsEmpty' key={0}>Тут ничего нет</div>):''} 
                {(mode==='addFriends')? 
                    <div>
                        <form action="">
                            <input type="text" placeholder='Введите имя пользоваателя' onChange={changeHandler} value={inputUserName} />
                            <button onClick={clickHandler}>Добавить друга</button>
                            {(!status?.status)? <div>{status?.error}</div>:''}
                        </form>
                    </div>
                :''}
            </div>
        </div>
    );
};

export default Friends;