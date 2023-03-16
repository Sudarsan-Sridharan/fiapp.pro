import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {RouterProvider} from "react-router-dom";
import {landingRouter} from "./Router/landingRouter";
import useUser from "./Hooks/useUser";
import AccountDialog from "./Components/Account/AccountDialog";
import {theme} from "./Theme/Theme";
import {ThemeProvider} from "@mui/material";


function App() {
    const userLang = navigator.language;
    const {i18n} = useTranslation()

    const user = useUser()

    // auto login from local
    useEffect(() => {
        user.localAutoLogin().then(r => r)
    }, [user.isLogin])

    useEffect(() => {
        if (userLang === 'zh-CN' || userLang === 'zh-TW' || userLang === 'zh-HK') {
            i18n.changeLanguage('zh').then(r => r)
        }
    }, [i18n, userLang])

    return (
        <>
            <ThemeProvider theme={theme}>
                <RouterProvider router={landingRouter}/>
                <AccountDialog/>
            </ThemeProvider>
        </>
    );
}

export default App;
