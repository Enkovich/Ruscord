import React, { FC } from 'react';
import { IUser } from '../models/IUser';

interface userItemProps{
    user: IUser,
    remove: (user: IUser) => void;
}

const UserItem:FC<userItemProps> = ({remove, user}) => {
    const removeUser = (event: React.MouseEvent) => {
        remove(user)
    }
    return (
        <div>
            {user.name}
            <button onClick={removeUser}>Удалить пользователя</button>
        </div>
    );
};

export default UserItem;