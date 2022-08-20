import React from 'react';
import {useParams} from 'react-router-dom';
import Meta from '@/components/Meta';
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {ITrendingChange, trendingChangeAtom} from "@/components/Table/TrendingChange";
import KlineChart from "@/components/Chart/Kline";
import {riskWarningAtom} from "@/components/Table/RiskWarning";
import {useRecoilState} from "recoil";

interface IKline {
    open_bid: number;
    close_bid: number;
    highest_bid: number;
    lowest_bid: number;
    open_at: Date
}

export const messageType = {
    4000: "到达前高关口位",

    5000: "RiskWarning",
    5010: "到达 ema 关口位",
    5011: "到达均线 ema50 关口位",
    5012: "到达均线 ema100 关口位",
    5013: "到达均线 ema200 关口位",
    5020: "布林带突破",
    5021: "布林带上突破",
    5022: "布林带下突破",
    5030: "高低点预警",
    5031: "达到前高",
    5032: "达到前低",

    8000: "TrendingChange",
    8010: "ema 完全多空头排列",
    8020: "ema50 + ema100 多空头排列，并且价格在 ema200 徘徊一段时间，中风险趋势检测",
    8030: "价格只突破 ema200 且徘徊一段时间，高风险快速趋势转换检测",
}


const Detail = () => {
    let {name} = useParams();
    const APIQuery = useAPIQuery()
    name = name as string

    const [trendingChange, setTrendingChange] = useRecoilState<ITrendingChange[]>(trendingChangeAtom);
    const [riskWarning, setRiskWarning] = useRecoilState(riskWarningAtom);

    return (
        <>
            <Meta title={name}/>

            {/*<Toolbar/>*/}

            <KlineChart name={name} trendingChangeData={trendingChange} riskWarningData={riskWarning} drawer={true}
                        height={'calc(100vh - 140px)'}/>
        </>
    );
};

export default Detail;

