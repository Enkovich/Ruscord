import React, { FC, useEffect, useState } from 'react';
import { IChats } from '../../models/IChats';

interface ChatsElemProps {
    data: IChats
    open: (data: IChats) => void
    activeChat?: number
    active: boolean
}

const ChatsElem:FC<ChatsElemProps> = ({data, open, activeChat, active}) => {
    const clickHandler = () => {
        open(data)
    }
    const [activeChatBlock, setActiveChatBlock] = useState<string>('ChatBtn')

    useEffect(()=>{
        if(activeChat === data.id && active){
            setActiveChatBlock('ChatBtn activeChat')
        }else{
            setActiveChatBlock('ChatBtn')
        }
    }, [active, activeChat, activeChatBlock, data.id])
    

    return (
        <div className={activeChatBlock} onClick={clickHandler}>
            <div><img src={require('../../assets/img/image-placeholder.png')} alt="" className='avatarChat' /></div>
            <div>{data.name}</div>
        </div>
    );
};

export default ChatsElem;