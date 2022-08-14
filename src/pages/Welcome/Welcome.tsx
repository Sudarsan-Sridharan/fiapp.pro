import React from 'react';
import {Box, Container, Divider, Grid, Stack, Typography,} from '@mui/material';
import Button from '@mui/material/Button';
import {red} from '@mui/material/colors';
import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import Meta from '@/components/Meta';
import InventStart from '@/pages/Welcome/_inventStart';
import Price from '@/pages/Welcome/_price';
import ProductInfo from '@/pages/Welcome/_productInfo';
import Asynchronous from "@/components/Search/Asynchronous";
import AllTabTable from "@/components/Table/AllTab";
import Chart from "@/pages/Welcome/_chart";

const desc = [
    {number: '8+', desc: '个交易策略'},
    {number: '5+', desc: '个风险预警'},
    {number: '3+', desc: '个选币系统'},
    {number: '200+', desc: '个监控标的'},
];

function Welcome() {
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

                        {/*{trendingOverview && (*/}
                        {/*    <Grid item xs={12} md={6}>*/}
                        {/*        <Typography variant={"subtitle2"}>*/}
                        {/*            当前 BTC*/}
                        {/*            偏{trendingOverview.coin.coinLong[0] ?? 0 > trendingOverview.coin.coinShort[0] ?? 0 ? '多' : '空'}： {trendingOverview.coin.coinLong[0] ?? 0} 多， {trendingOverview.coin.coinShort[0] ?? 0} 空*/}
                        {/*        </Typography>*/}
                        {/*        <Box height={'300px'}>*/}
                        {/*            {trendingOverview && (*/}
                        {/*                <DataGrid*/}
                        {/*                    disableColumnFilter*/}
                        {/*                    rows={trendingOverview?.coin?.coin}*/}
                        {/*                    columns={trendingChangeColumns}*/}
                        {/*                    hideFooterPagination*/}
                        {/*                />*/}
                        {/*            )}*/}
                        {/*        </Box>*/}
                        {/*    </Grid>*/}
                        {/*)}*/}
                    </Grid>

                    <Box my={2} display={'flex'} justifyContent={'space-between'}>
                        {desc.map((item, index) => (
                            <Typography variant="h3" key={index}>
                                {item.number}
                                <Typography component={'span'} variant={'body1'}>
                                    {item.desc}
                                </Typography>
                            </Typography>
                        ))}
                    </Box>

                    <Chart/>
                </Container>
            </Box>

            <Container maxWidth={'xl'} sx={{mt: 2, pb: 5}}>
                <Stack
                    spacing={2}
                >
                    <Box textAlign={'center'} display={'flex'} alignItems={'center'} justifyContent={"center"}>
                        <Asynchronous mode={"link"} label={'搜索币种'}/>
                    </Box>

                    <Box>
                        <AllTabTable/>
                    </Box>

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
