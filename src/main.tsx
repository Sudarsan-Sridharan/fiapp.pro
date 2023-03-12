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
                    "获取免费的买卖信号": "Get free buy and sell signals",
                    "创建账户": "Create an account",
                    "注册 Fiapp.pro 会员": "Register for Fiapp.pro membership",
                    "现在注册立即获得 30 天免费试用": "Register now to get 30 days free trial",
                    "用户名": "Username",
                    "密码": "Password",
                    "邮箱": "Email",
                    "已经有账户了？立即登录": "Already have an account? Login now",
                    "用户名不能为空": "Username cannot be empty",
                    "密码不能为空": "Password cannot be empty",
                    "邮箱不能为空": "Email cannot be empty",
                    "用户名不能超过20个字符": "Username cannot be more than 20 characters",
                    "登录账户": "Login account",
                    "没有账户？注册": "No account? Register",
                    "登录 Fiapp.pro 会员": "Login Fiapp.pro membership",
                    "合约": 'Contract',
                    "价格": "Price",
                    "最高价": "Highest",
                    "最低价": "Lowest",
                    "交易量": "Volume",
                    "市场": "market",
                    "热门": "popular",
                    "流动性": "liquidity",
                    "波动率": "volatility",
                    "新趋势": "new trend",
                    "波动预警": "volatility alert",
                    "买卖信号": "buy sell signals",
                    "标的": "symbol",
                    "最新价": "last price",
                    "时间": "time",
                    "趋势转换": "trend change",
                }
            },
            zh: {
                translation: {}
            }
        },
        lng: "zh", // if you're using a language detector, do not define the lng option
        fallbackLng: "zh",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    }).then(r => r);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
);
