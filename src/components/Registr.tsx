import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IError } from '../models/IData';
import { userAPI } from '../services/userService';

interface inputStatus {
    textValue?: string,
    status?: boolean
}

const Registr = () => {

    const [inputName, setInputName] = useState<inputStatus>({
        textValue: '',
        status: true
    });
    const [inputPass, setInputPass] = useState<inputStatus>({
        textValue: '',
        status: true
    });
    const [inputPassConf, setInputPassConf] = useState<inputStatus>({
        textValue: '',
        status: true
    });
    const navigate = useNavigate()
    const [registerUser, {data: status}] = userAPI.useRegisterUserMutation()
    const [errorStatus, setErrorStatus] = useState<IError>({status: false})

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault()
        
        if(inputName.textValue === ''||inputPass.textValue===''||inputPassConf.textValue===''){
            setErrorStatus({status: true, description: 'Есть пустые поля'})
            return false;
        }
        if(inputPass.textValue !== inputPassConf.textValue) {
            setErrorStatus({status: true, description: 'Введённые пароли не совпадают'})
            return false;
        } 
        registerUser({dataUser:{name: inputName.textValue, password: inputPass.textValue}})
    }

    useEffect(()=>{
        if(status?.statusReg===true){
            navigate('/')
        }
    }, [navigate, status?.statusReg])

    const backForAuth = () => {
        navigate('/')
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{setInputName({...inputName, textValue: e.target.value})}
    const changeHandler2 = (e: React.ChangeEvent<HTMLInputElement>)=>{setInputPass({...inputPass, textValue: e.target.value})}
    const changeHandler3 = (e: React.ChangeEvent<HTMLInputElement>)=>{setInputPassConf({...inputPassConf, textValue: e.target.value})}

    return (
        <div>
            <form>
                {(status?.statusReg === false)?<div>Данный никнейм существует</div>:''}
                {(errorStatus.status)?<div>{errorStatus.description}</div>:''}
                <input 
                    type="text" 
                    placeholder='Введите имя пользователя'
                    onChange={changeHandler}
                    value={inputName.textValue}
                /><br />
                <input 
                    type="password" 
                    placeholder='Введите пароль' 
                    value={inputPass.textValue}
                    onChange={changeHandler2}
                /><br />
                <input 
                    type="password" 
                    placeholder='Повторите пароль'
                    value={inputPassConf.textValue}
                    onChange={changeHandler3} 
                /><br />
                <button onClick={clickHandler}>Зарегестрироваться</button><br />
                <button type='button' onClick={backForAuth}>Вернуться к авторизации</button>
            </form>
        </div>
    );
};

export default Registr;