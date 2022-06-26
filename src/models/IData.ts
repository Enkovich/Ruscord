import { IUser } from "./IUser"

export interface IData{
    dataUser?: IUser | null
    dataError?: IError | null
    statusReg?: boolean | null
    statusAuth?: boolean | null
}
export interface IError{
    status?: boolean
    type?: number
    description?: string
}
