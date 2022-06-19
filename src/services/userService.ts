import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IData, IError } from "../models/IData";
import { INotification } from "../models/INotification";
import { IUser,ConfirmFriend } from "../models/IUser";


interface addFriendProps{
    name_friend: string,
    user_id: number | undefined | null
}
export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        registerUser: build.mutation<IData, IData>({
            query: (data) => ({
                url: '/userService.php',
                params:{
                    type: 'register'
                },
                method: 'POST',
                body: data
            }) 
        }),
        authUser: build.query<IData, IData>({
            query: (data) => ({
                url: '/userService.php',
                params:{
                    type: 'auth'
                },
                method: 'POST',
                body: data
            }) 
        }),
        addFriend: build.mutation<INotification, addFriendProps>({
            query:(data)=>({
                url: '/userService.php',
                params: {
                    type: 'addFriend'
                },
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        queryNotification: build.query<IUser, IUser>({
            query: (data)=>  ({
                url: '/userService.php',
                params:{
                    type: 'queryNotification'
                },
                method: 'POST',
                body: data
            }),
            providesTags: result => ['User']
        }),
        confirmFriend: build.mutation<void, ConfirmFriend>({
            query: (data) => ({
                url: '/userService.php',
                params:{
                    type: 'confirmFriend'
                },
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        deleteFriend: build.mutation<void, ConfirmFriend>({
            query: (data) => ({
                url: '/userService.php',
                params:{
                    type: 'deleteFriend'
                },
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        })
    })
})