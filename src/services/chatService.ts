import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IChats, IChatsStatus } from "../models/IChats";
import { IUser } from "../models/IUser";

interface createChatProps{
    type?: string
    members?: any[],
    user?: number,
    name?: string
}

export const chatAPI = createApi({
    reducerPath: 'chatAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost'}),
    tagTypes: ['chat'],
    endpoints: (build)=> ({
        createChat: build.mutation<IChatsStatus, createChatProps>({
            query: (data) => ({
                url: 'chatService.php',
                params: {
                    type: 'createChat'
                },
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['chat']
        }),
        fetchChat: build.query<IChats[], IUser>({
            query: (data) => ({
                url: 'chatService.php',
                params: {
                    type: 'fetchChat'
                },
                method: 'POST',
                body: data
            }),
            providesTags: result => ['chat']
        })
    })
})