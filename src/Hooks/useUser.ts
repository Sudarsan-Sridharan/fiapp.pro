// This is a custom hook that will be used to get the user data from the recoil

import userAtom from "../Atoms/userAtom";
import {useRecoilState} from "recoil";
import {useEffect, useState} from "react";
import {authAPI, IAuthRequest, IAuthType, IUser, verifyTokenAPI} from "../API/userAPI";

export const useUser = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [error, setError] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                setUser(JSON.parse(userData));
                setIsLoading(false);
            } catch (err) {
                setError("Error parsing user data");
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [setUser]);

    const auth = async (data: IAuthRequest, type: IAuthType) => {
        try {
            const userData = await authAPI(data, type);
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setError(null);
        } catch (err) {
            setError(err as string);
        }
    };

    const logout = async () => {
        try {
            setUser(undefined);
            localStorage.removeItem("user");
            setError(null);
        } catch (err) {
            setError(err as string);
        }
    };

    const isLoggedIn = () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const {data} = JSON.parse(userData);
            const response = verifyTokenAPI(data.token)
                .then((res) => !!res.data)
                .catch((err) => {
                    setError("Error verifying user token");
                    console.log(err)
                    logout().then()
                    return false;
                })
            return response;
        }
        return false;
    };

    const get = user

    const set = (userData: IUser) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    return {
        error,
        isLoading,
        auth,
        logout,
        isLoggedIn,
        get,
        set,
    };
};

export default useUser;
