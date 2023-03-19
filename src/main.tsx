import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {initReactI18next} from "react-i18next";
import i18n from "i18next";
import {RecoilRoot} from "recoil";

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
                    "产品": "Product",
                    "社区": "Community",
                    "Twitter": "Twitter",
                    "智能推荐": "Intelligent recommendation",
                    "机构服务": "Institutional service",
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
                    "波动预警": "Volatility alert",
                    "买卖信号": "Buy/sell signals",
                    "标的": "symbol",
                    "最新价": "last price",
                    "时间": "time",
                    "趋势转换": "Trend change",
                    "收益": "profit",
                    "专业级": "Professional level",
                    "量化金融算法": "Quantitative financial algorithms",
                    "解决方案": "Solutions",
                    "持仓追踪": "Portfolio tracking",
                    "即时更新并显示投资组合的实时市值和收益情况，帮助用户更好地了解和管理自己的投资组合。通过持仓追踪，用户可以随时掌握投资组合的风险和收益情况，及时做出相应的调整，从而提高投资效益。": "Real-time updates and display of the portfolio's real-time market value and profit/loss status, helping users better understand and manage their investment portfolio. Through portfolio tracking, users can keep abreast of the risk and return of their investment portfolio, make timely adjustments, and improve investment efficiency.",
                    "自动执行交易策略，帮助用户更好地实现投资目标。根据预设的买卖规则，系统可以自动识别市场的变化，采取相应的交易行动，从而控制风险和获得更高的收益。通过买卖信号的自动化执行，用户可以减少人为干预和情绪影响，更加科学地管理自己的投资组合。": "Automatically execute trading strategies to help users achieve their investment goals more effectively. Based on pre-set buy/sell rules, the system can automatically identify market changes and take corresponding trading actions to control risks and achieve higher returns. Through the automated execution of buy/sell signals, users can reduce human intervention and emotional influence, and more scientifically manage their investment portfolios.",
                    "实时识别市场趋势，帮助用户更好地把握投资机会。通过对市场趋势的准确定位，用户可以及时调整交易策略，控制风险，获得更高的收益。同时，趋势转换也可以用于预测未来市场走势，为用户提供更可靠的投资决策依据。": "Real-time identification of market trends helps users better grasp investment opportunities. By accurately locating market trends, users can adjust trading strategies in a timely manner, control risks, and achieve higher returns. At the same time, trend conversion can also be used to predict future market trends, providing users with more reliable investment decision-making basis.",
                    "实时监测市场波动情况，帮助用户及时掌握市场风险。通过对市场波动的及时预警，用户可以适时调整投资策略，防范风险，保护投资组合。同时，波动预警也可以用于识别市场机会，帮助用户在变化的市场中获取投资收益。": "Real-time monitoring of market volatility helps users to timely understand market risks. By timely warning of market fluctuations, users can adjust investment strategies in a timely manner, prevent risks, and protect their investment portfolio. At the same time, volatility warning can also be used to identify market opportunities and help users obtain investment returns in a changing market.",
                    "为用户提供个性化的投资建议，帮助用户做出更明智的投资决策。通过对用户的投资偏好、风险偏好、市场情况等多方面因素的分析，系统可以为用户推荐最适合的投资组合，提高投资效率。同时，智能推荐也可以根据市场变化对投资建议进行动态调整，帮助用户更好地适应市场变化，获取更高的投资收益。": "Provide personalized investment advice to users and help them make wiser investment decisions. By analyzing factors such as users' investment preferences, risk preferences, and market conditions, the system can recommend the most suitable investment portfolio to users and improve investment efficiency. At the same time, intelligent recommendations can also dynamically adjust investment advice based on market changes, helping users better adapt to market changes and obtain higher investment returns.",
                    "为金融机构提供量化投资研究和交易策略定制服务。通过深入挖掘市场数据和应用先进的机器学习算法，我们可以为机构客户提供高质量的投资研究报告，帮助客户分析市场趋势和发现投资机会。同时，我们还可以根据客户的需求定制交易策略，帮助客户实现投资目标并提高投资效率。我们的机构服务旨在为客户提供一流的量化投资解决方案，帮助机构客户在竞争激烈的市场中取得成功。": "We provide quantitative investment research and trading strategy customization services for financial institutions. By deeply mining market data and applying advanced machine learning algorithms, we can provide high-quality investment research reports to institutional clients, helping them analyze market trends and discover investment opportunities. At the same time, we can customize trading strategies according to clients' needs to help them achieve investment goals and improve investment efficiency. Our institutional services aim to provide customers with top-notch quantitative investment solutions and help institutional clients succeed in a competitive market."
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

interface IRecoilRootLayout {
    children: React.ReactNode
}

const RecoilRootLayout: React.FC<IRecoilRootLayout> = (props) => <RecoilRoot>{props.children}</RecoilRoot>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RecoilRootLayout>
            <App/>
        </RecoilRootLayout>
    </React.StrictMode>,
);
