import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { chatAPI } from "../services/chatService";
import { messageAPI } from "../services/messageService";
import { userAPI } from "../services/userService";
import userSlice from "./reducers/userSlice";

const rootReducer = combineReducers({
    userSlice,
    [messageAPI.reducerPath]: messageAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(messageAPI.middleware)
                .concat(userAPI.middleware)
                .concat(chatAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']