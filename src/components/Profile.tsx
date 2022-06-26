import React, { FC } from 'react';
import { IUser } from '../models/IUser';

interface ProfileProps{
    userData: IUser
    exit: ()=>void
}

const Profile:FC<ProfileProps> = ({userData, exit}) => {
    const clickHandler = ()=>{
        const confirm = window.confirm('Вы уверены?')
        if(confirm)exit()
    }
    return (
        <div>
            <div>
                <div className='FriendsPanelInputs'>
                    <div className='titlePageFriends'>Профиль</div>
                </div>
                <div className='profileBlock'>
                    <div>
                        <img src={require('../assets/img/image-placeholder.png')} alt="" className='profileImg' />
                    </div>
                    <div>
                        Никнейм: {userData.name}<br />
                        Ваш id: {userData.id}<br />
                        <button onClick={clickHandler}>Выход</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;