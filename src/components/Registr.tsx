import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IError } from '../models/IData';
import { userAPI } from '../services/userService';
import '../assets/css/container.css'

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
            errorField()
            setErrorStatus({status: true, description: 'Есть пустые поля', type: 0}) 
            return false;
        }
        if(inputPass.textValue !== inputPassConf.textValue) {
            errorField()
            setErrorStatus({status: true, description: 'Введённые пароли не совпадают', type: 1})
            setInputPass({...inputPass, status: false})
            setInputPassConf({...inputPassConf, status: false})
            return false;
        } 
        errorField()
        registerUser({dataUser:{name: inputName.textValue, password: inputPass.textValue}})
    }

    const errorField = () => {
        (inputName.textValue === '')? setInputName({...inputName, status: false}):setInputName({...inputName, status: true});
        (inputPass.textValue === '')? setInputPass({...inputPass, status: false}):setInputPass({...inputPass, status: true});
        (inputPassConf.textValue === '')? setInputPassConf({...inputPassConf, status: false}):setInputPassConf({...inputPassConf, status: true});
    }

    useEffect(()=>{
        if(status?.statusReg===true){
            navigate('/')
        }
    }, [navigate, status?.statusReg])

    const backForAuth = () => {
        navigate('/')
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputName({...inputName, textValue: e.target.value})
    }
    const changeHandler2 = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputPass({...inputPass, textValue: e.target.value})
    }
    const changeHandler3 = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputPassConf({...inputPassConf, textValue: e.target.value})
    }

    return (
        <div className='blockFormAuthContainer'>
            <div className='blockFormAuth'>
                <h1>Регистрация</h1>
                <form className='formAuth'>
                    <input 
                        type="text" 
                        placeholder='Придумайте себе никнейм'
                        onChange={changeHandler}
                        value={inputName.textValue}
                        style={{
                            borderBottom: inputName.status ? "2px solid black" : "2px solid red"
                        }}
                    /><br />
                    <input 
                        type="password" 
                        placeholder='Придумайте пароль' 
                        value={inputPass.textValue}
                        onChange={changeHandler2}
                        style={{
                            borderBottom: inputPass.status ? "2px solid black" : "2px solid red"
                        }}
                    /><br />
                    <input 
                        type="password" 
                        placeholder='Повторите придуманный пароль'
                        value={inputPassConf.textValue}
                        onChange={changeHandler3} 
                        style={{
                            borderBottom: inputPassConf.status ? "2px solid black" : "2px solid red"
                        }}
                    /><br />
                    {(status?.statusReg === false)?<div className='blockError'>Данный никнейм существует</div>:''}
                    {(errorStatus.status)?<div className='blockError'>{errorStatus.description}</div>:''}
                    <button onClick={clickHandler}>Зарегестрироваться</button><br />
                    <div onClick={backForAuth} className='blockRedirect'>Вернуться к авторизации</div>
                </form>
            </div>
        </div>
    );
};

export default Registr;