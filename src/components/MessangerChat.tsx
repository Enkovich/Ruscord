import React, { FC, useEffect, useRef, useState } from 'react';
import { IChats } from '../models/IChats';
import { IMessage } from '../models/IMessage';
import { IUser } from '../models/IUser';
import { messageAPI } from '../services/messageService';
import MessageItem from './elements/MessageItem';

interface MessangerChatProps{
    userData: IUser
    dataChat: IChats
}


const MessangerChat:FC<MessangerChatProps> = ({userData, dataChat}) => {

    const initMessageEdit:IMessage = {
        id: null,
        description: null,
        id_user: null,
        isWriting: false,
        timeSend: null,
        user_name: null
    }

    const [limit, setLimit] = useState<number>(-50)
    let responceData: string = limit+","+userData?.id+","+userData?.name+",query,"+dataChat.id
    const [sendMessage, setSendMessage] = useState<string>('')
    const [writingMode, setWritingMode] = useState<boolean>(false)
    const [editMessage, setEditMessage] = useState<IMessage>(initMessageEdit)
    
    const {data: messages, isError, isLoading} = messageAPI.useFetchAllMessageQuery(responceData, {pollingInterval: 250})
    const [createNewMessage, {}] = messageAPI.useCreateNewMessageMutation()
    const [deleteMessege, {}] = messageAPI.useDeleteMessageMutation()
    const [writingMessage, {}] = messageAPI.useWritingMessageMutation()

    const sendMessageHandle = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(sendMessage!==''){
            if(!writingMode){
                setLimit(limit-1)
                const response:IMessage = {
                    id_user: userData.id,
                    user_name: userData.name,
                    description: sendMessage,
                    id_chat: dataChat.id,
                }
                handleSendMessage({...response})
                setSendMessage('')        
            }
            if(writingMode){
                handleEditMessage({...editMessage, description: sendMessage})
                writingModeTurnOff()
            }
        }
    }
    const handleSendMessage = async (data:IMessage) => {await createNewMessage(data)}
    const handleEditMessage = (data:IMessage) => {writingMessage(data)}
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{setSendMessage(e.target.value)}
    const handleRemoveMessage = (data:IMessage) => {
        if(data.id_user === userData.id){
            deleteMessege(data)
        }
    }
    const writingModeTurnOn = (data:IMessage) => {
        if(!writingMode){
            setEditMessage(data)
            setSendMessage(data.description)
            setWritingMode(true)
        }
    }
    const writingModeTurnOff = () => {
        setSendMessage('')
        setEditMessage(initMessageEdit)
        setWritingMode(false)
    }

    return (
    <div className='chatBlock'>
        <div className='chatMessageBlock'>
            {(isError)?<h1>Ошибка загрузки</h1>:''}
            {messages&& messages.map((message: IMessage)=>
                <MessageItem 
                    userId={userData.id} 
                    key={message.id} 
                    messageData={message}
                    remove={handleRemoveMessage}
                    update={writingModeTurnOn}
                ></MessageItem>
            )}
        </div>
        <div className='blockForm'>
            <form>
                {(writingMode)? <div onClick={writingModeTurnOff}>Отменить изменения</div>:''}
                <input type="text" placeholder='Введите сообщение' onChange={changeHandler} value={sendMessage} className="blockFormInput" />
                <button onClick={sendMessageHandle}>Отправить</button>
            </form>
        </div>
    </div>
    );
};

export default MessangerChat;