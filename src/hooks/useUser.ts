import {atom, useRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {domain} from "@/ network/fether";

interface IUserInfo {
    email: string;
}

export interface IUser {
    token: string | null;
    info?: IUserInfo | null
}

export const UserAtom = atom<IUser>({
    key: "UserAtom",
    default: {
        token: null,
        info: null
    }
})

export const useUser = () => {
    const [value, setValue] = useRecoilState<IUser>(UserAtom);
    const nav = useNavigate()

    const login = (token: string, info: IUserInfo) => {
        setValue({
            info: {
                email: info.email
            },
            token
        })

        localStorage.setItem("token", token)
        me()
        nav("/")
    }

    const me = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        axios.post(`${domain}/Authenticate/me`, {}, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        }).then(res => setValue({
            token,
            info: {
                email: res.data.email
            }
        })).catch(() => logout())
    }

    const logout = () => {
        setValue({
            token: null,
            info: null
        })

        nav('/')
    }

    return {
        value,
        setValue,
        login,
        me
    }
}