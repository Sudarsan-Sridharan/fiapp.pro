import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {RouterProvider} from "react-router-dom";
import {landingRouter} from "./Router/landingRouter";


function App() {
    const userLang = navigator.language;
    const {i18n} = useTranslation()
    useEffect(() => {
        if (userLang === 'zh-CN' || userLang === 'zh-TW' || userLang === 'zh-HK') {
            i18n.changeLanguage('zh').then(r => r)
        }
    }, [i18n, userLang])

    return (
        <RouterProvider router={landingRouter}/>
    );
}

export default App;
