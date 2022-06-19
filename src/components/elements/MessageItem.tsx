import React, { FC } from 'react';
import { IMessage } from '../../models/IMessage';

interface messageItemProps {
    userId: any
    messageData: IMessage
    remove: (message: IMessage)=> void
    update: (message: IMessage)=> void
}

const MessageItem:FC<messageItemProps> = ({userId, messageData, remove, update}) => {

    const delMessage = ()=>{
        const confirm = window.confirm('Вы уверены, так как это действие необратимо?')
        if(confirm) remove({...messageData})
    }
    const editMessage = () => {
        update({...messageData})
    }

    return (
        <div className='messageItem'>
            <div>{messageData.user_name}&nbsp;&nbsp;{new Date(messageData.timeSend * 1000).toLocaleString()}</div>
            <div>{messageData.description}<span>{(messageData.isWriting==='true')?'(Изменено)':''}</span></div>
            {(messageData.id_user === userId)?<div><button onClick={editMessage}>Изменить</button><button onClick={delMessage}>Удалить</button></div>:''}
        </div>
    );
};

export default MessageItem;