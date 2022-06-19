import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/userService';

const Registr = () => {

    const inpNameRef = useRef<HTMLInputElement>(null);
    const inpPassRef = useRef<HTMLInputElement>(null);
    const inpPassConfRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const [registerUser, {data: status}] = userAPI.useRegisterUserMutation()

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault()
        
        if(inpNameRef.current?.value === ''||inpPassRef.current?.value===''||inpPassConfRef.current?.value===''){
            alert('Есть пустые поля')
            return false;
        }
        if(inpPassRef.current?.value !== inpPassConfRef.current?.value) {
            alert('Пароли не совпадают')
            return false;
        } 
        registerUser({dataUser:{name: inpNameRef.current?.value, password: inpPassConfRef.current?.value}})
    }

    if(status?.statusReg===true){
        navigate('/')
    }

    return (
        <div>
            <form>
                {(status?.statusReg === false)?<div>Данный никнейм существует</div>:''}
                <input type="text" ref={inpNameRef} placeholder='Введите имя пользователя'/><br />
                <input type="password" ref={inpPassRef} placeholder='Введите пароль' /><br />
                <input type="password" ref={inpPassConfRef} placeholder='Повторите пароль' /><br />
                <button onClick={clickHandler}>Зарегестрироваться</button>
            </form>
            
        </div>
    );
};

export default Registr;