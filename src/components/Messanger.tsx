import React, { FC, useEffect, useState} from 'react';
import { userAPI } from '../services/userService';
import Friends from './Friends';
import '../assets/css/container.css'
import MessangerChat from './MessangerChat';
import { IUser } from '../models/IUser';
import Profile from './Profile';
import { IChats } from '../models/IChats';
import Chats from './Chats';

interface MessangerProps {
    data: IUser | undefined | null
    exit: () => void
}

const Messanger:FC<MessangerProps> = ({data, exit}) => {
    
    const [page, setPage] = useState<string>('friends')
    const [chatActive, setChatActive] = useState<boolean>(false)
    const [userData, setUserData] = useState<IUser>()
    const [chat, setChat] = useState<IChats>()
    const [chatQuery, setChatQuery] = useState<IChats[]>()
    const [classListFriendsBtn, setClassListFriendsBtn] = useState<string>('leftPanelBtn')
    const [classListProfileBtn, setClassListProfileBtn] = useState<string>('leftPanelBtn')

    const [queryNotification ,{data: dataUser}] = userAPI.useLazyQueryNotificationQuery({pollingInterval: 500})
    //const [queryNotification ,{data: dataUser}] = userAPI.useLazyQueryNotificationQuery()

    useEffect(()=>{
        (page === 'friends')? setClassListFriendsBtn('leftPanelBtn active'):setClassListFriendsBtn('leftPanelBtn');
        (page === 'profile')? setClassListProfileBtn('leftPanelBtn active'):setClassListProfileBtn('leftPanelBtn');

        if(data){
            queryNotification({id: data?.id})
            if(dataUser?.privateChats)setChatQuery(dataUser?.privateChats)
            setUserData({
                id: data.id,
                name: data.name,
                friends: dataUser?.friends,
                notifications: {
                    pendings: dataUser?.notifications?.pendings,
                    notification: dataUser?.notifications?.notification
                },
                privateChats: chatQuery
            }) 
            
        }
    }, [data, dataUser, queryNotification, chatQuery, page])

    const friendsPage = () => {setPage('friends'); setChatActive(false)}
    const profilePage = () => {setPage('profile'); setChatActive(false)}

    const exitAccount = () => {
        setChatActive(false)
        setUserData({
            id: null,
            friends: null,
            name: null,
            notifications: null
        })
        exit()
    }
    const openChat = (data: IChats)=>{
        setChatActive(true)
        setPage('chat')
        setChat(data)
    }



    return (
        <div className='container'>
            <div className='leftPanel'>
                <div onClick={friendsPage} className={classListFriendsBtn}>Друзья</div>
                <div onClick={profilePage} className={classListProfileBtn}>Профиль</div>
                <div className='panelChats'>Личные сообщения</div>
                {(dataUser)?<Chats openChat={openChat} userData={dataUser} activeChat={chat?.id} active={chatActive}></Chats>:''}
                
            </div>
            <div>
                {(page === 'friends' && userData)?<Friends userData={userData} openChat={openChat} /> : ''}
                {(page === 'profile' && userData)?<Profile userData={userData} exit={exitAccount} /> : ''}
                {(page === 'chat' && userData && chat)?<MessangerChat userData={userData} dataChat={chat}></MessangerChat> : ''}
            </div>
        </div>
    );
};

export default Messanger;