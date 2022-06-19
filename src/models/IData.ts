import { IUser } from "./IUser"

export interface IData{
    dataUser?: IUser | null
    dataError?: IError | null
    statusReg?: boolean | null
    statusAuth?: boolean | null
}
export interface IError{
    type?: number
    description?: string
}
