import { createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";

export const fetchUser = createAsyncThunk(
    'user/userService',
    async (data: {user: React.ReactNode, pass: React.ReactNode, type: string}, thunkAPI) => {
        try{
            let form = new FormData();
            form.append('user', ""+data.user)
            form.append('pass', ""+data.pass)
            form.append('type', ""+data.type)

            const response = await fetch(`http://localhost/userService.php`, {
                method: 'POST',
                mode: 'cors',
                body: form
            });
            const answer = await response.json()
            return answer
        }catch(e) {
            return thunkAPI.rejectWithValue('Неправильный логин или пароль')
        }
    }
)