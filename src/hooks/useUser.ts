import {atom, useRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";

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

        nav("/")
    }

    return {
        value,
        setValue,
        login
    }
}