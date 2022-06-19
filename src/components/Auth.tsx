import React, { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/userService';
import Messanger from './Messanger';

const Auth = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const input2Ref = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const [authUser, {data: userData}] = userAPI.useLazyAuthUserQuery()
    const [status, setStatus] = useState<boolean>(false)

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        authUser({dataUser:{name: inputRef.current?.value, password: input2Ref.current?.value}})
        
    }
    const clickRedirect = () => {
        navigate('register')
    }
    useEffect(()=>{
        if(userData?.statusAuth) {setStatus(true)}
    }, [userData, setStatus])
    const exitAccount = () => {
        setStatus(false)
    }    

    return (
        (!status)?(<div><form>
            <input type="text" ref={inputRef} placeholder='Имя пользователя' /><br />
            <input type="password" ref={input2Ref} placeholder='Пароль' /><br />
            <button onClick={clickHandler}>Войти</button>
            <div onClick={clickRedirect}>Зарегестрироваться</div>
        </form></div>) : ((userData?.dataUser)?<Messanger exit={exitAccount} data={userData.dataUser}></Messanger>:<div>Ошибка загрузки</div>)
    );
};

export default React.memo(Auth);