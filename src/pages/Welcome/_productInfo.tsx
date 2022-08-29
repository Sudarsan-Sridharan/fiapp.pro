import React from 'react';

import {Card, Grid, Stack, Typography} from '@mui/material';
import {lightBlue} from "@mui/material/colors";
import {Link} from "react-router-dom";

const info = [
    {
        title: '买卖信号（即将上线）',
        desc: 'fiapp.pro 交易大师提供全自动，高胜率，高盈亏比，高灵敏度的交易信号，覆盖短中长线，无论你是日内交易还是大趋势上班族，都可以轻松抓住专属你自己的交易机会。',
    },
    {
        title: '风险预警（已上线）',
        desc: '全自动智能提示大周期的关口位，fiapp.pro 交易大师帮助你更快的判断当前局势，更好的找到止赢止损点位。',
        link: '/RiskWarning',
        ready: true
    },
    {
        title: '趋势转换（已上线）',
        link: '/TrendingChange',
        ready: true,
        desc: '市面上数千个标的都是一起波动，但是每个标的的趋势都不一样，fiapp.pro 交易大师可以全自动追踪所有趋势状况，更好的增强你持仓信心和减少入场难度。',
    },
    {
        title: '选币系统（即将上线）',
        desc: '乱花渐欲迷人眼，fiapp.pro 交易大师的选币系统可以按照你想要的数据，帮助你自动的筛选出合适的标的。',
    },
    {
        title: '波动预警（即将上线）',
        desc: '活跃标的突然装死？相比正常情况严重背离？大盘在跌它却纹丝不动？fiapp.pro 交易大师全智能波动预警系统，每个标的都逃不出我们的视野。',
    },
    {
        title: '山寨季（内测中）',
        desc: '牛市来了，资金大量流入，板块随时轮动，btc 先带动大盘，资金再向外暗涌，什么时候到了轻松百倍的山寨季？fiapp.pro 交易大师可以帮助你自动进行判断。',
    },
    {
        title: '避险预警（即将上线）',
        desc: '大盘跌跌不休，我的山寨币也跌跌不休，什么时候才到头？不用担心，当山寨币相对弱势时，fiapp.pro 交易大师即可抢险发出预警，提示你规避风险。',
    },
    {
        title: '动量检测（已上线）',
        desc: '我是一个日内投机客，我想要只做高波动率的标的，成百上千的标的太多根本无法人肉筛选，fiapp.pro 交易大师对所有标的进行全自动对动量检测并提供筛选列表。',
        ready: true,
        link: '/Volatility',
    },
    {
        title: '多空瞬时持仓（已上线）',
        desc: 'fiapp.pro 交易大师实时毫秒级检测真实交易所的多空头持仓变化，出现大量波动时及时预警，为交易增加更多透明度。',
        ready: true,
        link: '/d/BTCUSDLONGS',
    },
];

const ProductInfo = () => {
    return (
        <Stack spacing={2}>
            <Typography variant={'h2'}>我们的产品生态</Typography>

            <Grid container spacing={1}>
                {info.map((item, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}
                          sx={{textDecoration: 'none'}}>
                        <Card sx={{p: 2, height: '100%', bgcolor: item.ready ? lightBlue[50] : 'white'}}
                              component={item.ready ? Link : "div"} to={item.link ?? ''}
                              variant={'outlined'}>
                            <Stack spacing={1}>
                                <Typography variant={'h6'}>{item.title}</Typography>
                                <Typography variant={'body2'}>{item.desc}</Typography>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default ProductInfo;
