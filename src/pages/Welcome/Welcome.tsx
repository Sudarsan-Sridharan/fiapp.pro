import React, {useState} from 'react';

import {CancelOutlined} from '@mui/icons-material';
import {Badge, Box, ButtonGroup, Container, Divider, Grid, IconButton, Rating, Stack, Typography,} from '@mui/material';
import Button from '@mui/material/Button';
import {green, red} from '@mui/material/colors';
import {DataGrid} from '@mui/x-data-grid';
import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import Meta from '@/components/Meta';
import InventStart from '@/pages/Welcome/_inventStart';
import Price from '@/pages/Welcome/_price';
import ProductInfo from '@/pages/Welcome/_productInfo';
import {trendingChangeColumns} from "@/pages/TrendingChange/TrendingChange";
import Asynchronous from "@/components/Search/Asynchronous";

const desc = [
    {number: '8+', desc: '个交易策略'},
    {number: '5+', desc: '个风险预警'},
    {number: '3+', desc: '个选币系统'},
    {number: '200+', desc: '个监控标的'},
];

const timeFrames = ['30m', '1H', '4H'];

function Welcome() {
    const [timeFrame, setTimeFrame] = useState<string>('');
    const [risk, setRisk] = useState<number>(0);
    const [currentTrending, setCurrentTrending] = useState<string>('');

    const urlRisk = risk !== 0 ? risk.toString() : '';

    const conditions = {
        risk: urlRisk,
        timeFrame,
        currentTrending,
    };
    const sendUrl = new URLSearchParams(conditions).toString();

    const {data: trendingChane} = useSWR(`${domain}/TrendingChange?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const {data: trendingOverview} = useSWR(`${domain}/TrendingChange/overview?name=BTC-USDT-SWAP`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    return (
        <>
            <Meta title="智能交易系统"/>

            <Box py={10} sx={{background: 'linear-gradient(#f5f9fe, #fff)'}}>
                <Container maxWidth={'xl'}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography variant="h1">智能交易系统</Typography>
                                <Typography variant="subtitle1">
                                    轻松抓住市场上
                                    <Typography variant="subtitle1" component={'span'} color={red[500]}>
                                        所有标的
                                    </Typography>
                                    交易机会
                                </Typography>

                                <Stack spacing={1} direction={'row'}>
                                    <Button
                                        variant={'contained'}
                                        color={'inherit'}
                                        href={'https://jq.qq.com/?_wv=1027&k=ThQbfwPX'}
                                        target={'_blank'}
                                    >
                                        QQ 群
                                    </Button>
                                    <Button
                                        variant={'contained'}
                                        color={'inherit'}
                                        target={'_blank'}
                                        href={'https://discord.gg/HZD7uw5Hp9'}
                                    >
                                        Discord 群
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>

                        {trendingOverview && (
                            <Grid item xs={12} md={6}>
                                <Typography variant={"subtitle2"}>
                                    当前 BTC
                                    偏{trendingOverview.coin.coinLong[0] ?? 0 > trendingOverview.coin.coinShort[0] ?? 0 ? '多' : '空'}： {trendingOverview.coin.coinLong[0] ?? 0} 多， {trendingOverview.coin.coinShort[0] ?? 0} 空
                                </Typography>
                                <Box height={'300px'}>
                                    {trendingOverview && (
                                        <DataGrid
                                            disableColumnFilter
                                            rows={trendingOverview.coin.coin}
                                            columns={trendingChangeColumns}
                                            hideFooterPagination
                                        />
                                    )}
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    <Box mt={1} display={'flex'} justifyContent={'space-between'}>
                        {desc.map((item, index) => (
                            <Typography variant="h3" key={index}>
                                {item.number}
                                <Typography component={'span'} variant={'body1'}>
                                    {item.desc}
                                </Typography>
                            </Typography>
                        ))}
                    </Box>
                </Container>
            </Box>

            <Container maxWidth={'xl'} sx={{mt: 2, pb: 5}}>
                <Stack
                    spacing={2}
                    sx={{
                        '& .hot': {
                            color: red[500],
                        },
                        '& .cold': {
                            color: green[500],
                        },
                    }}
                >
                    <Box textAlign={'center'} display={'flex'} alignItems={'center'} justifyContent={"center"}>
                        <Asynchronous/>
                    </Box>

                    <Box>
                        <Stack spacing={1} direction={'row'} sx={{alignItems: 'end'}}>
                            <Badge badgeContent={'稳定版'}>
                                <Typography variant={'h2'}>趋势转换 </Typography>
                            </Badge>

                            <Typography variant={'h6'}>今日</Typography>

                            {trendingOverview && (
                                <>
                                    <Typography variant={'h6'} sx={{color: green[500]}}>
                                        {trendingOverview.analysis.today.allLong[0] ?? 0} 多头
                                    </Typography>
                                    <Typography variant={'h6'} sx={{color: red[500]}}>
                                        {trendingOverview.analysis.today.allShort[0] ?? 0} 空头
                                    </Typography>
                                </>
                            )}
                        </Stack>

                        <Typography variant={'body1'}>
                            7 X 24小时跟踪趋势反转，持续监控中，监控周期：30m，1h，4h
                        </Typography>

                        <Typography variant={'body1'}>
                            趋势追踪是环境信号，可以辅助观察标的当前趋势情况，不对任何交易做出任何投资决策。
                        </Typography>
                    </Box>

                    <Stack spacing={2} direction={'column'}>
                        <Stack spacing={1} direction={'row'}>
                            <ButtonGroup variant={'outlined'} color={'primary'}>
                                {[
                                    {label: '多', value: '1'},
                                    {
                                        label: '空',
                                        value: '-1',
                                    },
                                    {
                                        label: '全部',
                                        value: '',
                                    },
                                ].map((item, i) => (
                                    <Button
                                        key={i}
                                        onClick={() => setCurrentTrending(item.value)}
                                        variant={currentTrending === item.value ? 'contained' : 'outlined'}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                            <ButtonGroup variant="outlined">
                                {timeFrames.map((item, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => setTimeFrame(item)}
                                        variant={item === timeFrame ? 'contained' : 'outlined'}
                                    >
                                        {item}
                                    </Button>
                                ))}
                                <Button
                                    onClick={() => setTimeFrame('')}
                                    variant={timeFrame === '' ? 'contained' : 'outlined'}
                                >
                                    所有时间
                                </Button>
                            </ButtonGroup>
                        </Stack>

                        <Stack direction={'row'} sx={{alignItems: 'center'}}>
                            <Typography variant={'body1'}>风险：</Typography>
                            <Rating value={risk} onChange={(event, value) => setRisk(value ?? 0)}/>

                            {risk !== 0 && risk && (
                                <IconButton size={'small'} onClick={() => setRisk(0)}>
                                    <CancelOutlined/>
                                </IconButton>
                            )}
                        </Stack>
                    </Stack>

                    {trendingChane && (
                        <Box>
                            <Box height={'500px'}>
                                <DataGrid
                                    rows={trendingChane}
                                    columns={trendingChangeColumns}
                                />
                            </Box>
                        </Box>
                    )}
                </Stack>
            </Container>

            <Container maxWidth={'xl'} sx={{pb: 5}}>
                <Stack spacing={2}>
                    <InventStart/>
                </Stack>
            </Container>

            <Box sx={{background: 'linear-gradient(to top, #f5f9fe, #fff)'}}>
                <Container maxWidth={'xl'} sx={{py: 10}}>
                    <Stack spacing={5}>
                        <ProductInfo/>

                        <Divider/>

                        <Price/>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Welcome;
