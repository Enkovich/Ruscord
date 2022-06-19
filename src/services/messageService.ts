import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IMessage } from "../models/IMessage";

export const messageAPI = createApi({
    reducerPath: "messageAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost'}),
    tagTypes: ['Mess'],
    endpoints: (build) => ({
        fetchAllMessage: build.query<IMessage[], string>({
            query: (data) => ({
                url: `/messageService.php`,
                params: {
                    data: data
                }
            }),
            providesTags: result => ['Mess']
        }),
        createNewMessage: build.mutation<IMessage, IMessage>({
            query: (message) => ({
                url: `/messageService.php`,
                params: {
                    data: `0,${message.id_user},${message.user_name},send_message,${message.id_chat}`
                },
                method: 'POST',
                body: message
            }),
            invalidatesTags: ['Mess']
        }),
        writingMessage: build.mutation<IMessage, IMessage>({
            query: (message) => ({
                url: `/messageService.php`,
                params: {
                    data: `0,${message.id_user},${message.user_name},writing_message`
                },
                method: 'PUT',
                body: message
            }),
            invalidatesTags: ['Mess']
        }),
        deleteMessage: build.mutation<IMessage, IMessage>({
            query: (message) => ({
                url: `/messageService.php`,
                params: {
                    data: `0,${message.id_user},${message.user_name},delete_message`
                },
                method: 'DELETE',
                body: message
            }),
            invalidatesTags: ['Mess']
        })
    })
})