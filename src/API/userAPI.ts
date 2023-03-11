import {http} from "../Network/Network";

export interface IAuthRequest {
    username?: string;
    password: string;
    email: string;
    "g-recaptcha-response": string
}

export type IAuthType = "login" | "register"

export interface IUserInfo {
    code: number;
    data: {
        authResult: boolean;
        userInfo: {
            authorityId: number;
            created_at: string;
            email: string;
            enable: number;
            id: string;
            username: string;
        };
    };
    msg: string;
}

export interface IUser {
    expiresAt: number
    token: string,
    user: {
        id: string,
        name: string,
        email: string,
        enabled: boolean,
        created_at: Date,
        authorityId: number
    }
}

export type IUserOptional = Partial<IUser>;

export const authAPI = async (data: IAuthRequest, type: IAuthType): Promise<IUser> => {
    const response = await http.post(`/g/api/user/${type}`, data)
    return response.data
}

export const verifyTokenAPI = async (token: string): Promise<IUserInfo> => {
    const response = await http.get(`/g/user/getUserInfo?auth_url=${"/user/getUserInfo"}&auth_method=GET`, {
        headers: {
            "x-token": token
        }
    })
    return response.data
}