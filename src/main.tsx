import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {initReactI18next} from "react-i18next";
import i18n from "i18next";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    "轻松抓住": "Easy to catch",
                    "所有标的市场": "All target markets",
                    "量化交易系统": "Quantitative trading system",
                    "立即免费使用": "Use it for free now",
                    "社区": "Community",
                    "Twitter": "Twitter",
                    "解锁高级图表": "Unlock advanced charts",
                    "Kook（国内用户推荐）": "Kook (Recommended for Chinese users)",
                    "Discord（海外用户推荐）": "Discord (Recommended for Global users)",
                    "加入社区获取免费实时的买卖信号": "Join the community to get free real-time buy and sell signals",
                    "升级中，稍后再来查看": "Upgrading, come back later to check",
                }
            },
            cn: {
                translation: {}
            }
        },
        lng: "cn", // if you're using a language detector, do not define the lng option
        fallbackLng: "cn",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
);
