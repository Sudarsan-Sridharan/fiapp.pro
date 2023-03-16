// This is a custom hook that will be used to get the user data from the recoil

import userAtom from "../Atoms/userAtom";
import {useRecoilState} from "recoil";
import {useState} from "react";
import {authAPI, IAuthRequest, IAuthType, IUserInfo, verifyTokenAPI} from "../API/userAPI";

export const useUser = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [error, setError] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isLogin = user && user?.data !== undefined;

    const auth = async (data: IAuthRequest, type: IAuthType) => {
        try {
            const userData = await authAPI(data, type);
            localStorage.setItem("user", JSON.stringify(userData));
            await localAutoLogin()
            setError(null);
        } catch (err) {
            setError(err as string);
        }
    };

    const logout = () => {
        setIsLoading(false)
        try {
            setUser(undefined);
            localStorage.removeItem("user");
            setError(null);
        } catch (err) {
            setError(err as string);
        }
    };

    const localAutoLogin = async () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const {data} = JSON.parse(userData);
            setIsLoading(true)
            const res = await verifyTokenAPI(data.token)

            if (res.code !== 0) {
                setError("Error verifying user token");
                logout()
            }
            setUser(res)
            setIsLoading(false)
        }

        setIsLoading(false)
    };

    const get = user

    const tryItFreeNowLink = isLogin ? "/d/BTCUSDT" : "/register";

    const set = (userData: IUserInfo) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    return {
        error,
        isLoading,
        auth,
        logout,
        isLogin,
        get,
        set,
        localAutoLogin,
        tryItFreeNowLink
    };
};

export default useUser;
