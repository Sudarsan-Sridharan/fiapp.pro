import React from 'react';
import {useParams} from 'react-router-dom';

import {Box, ButtonGroup, Chip, Container, Stack, Toolbar} from '@mui/material';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import Meta from '@/components/Meta';
import EChartsReact from "echarts-for-react";
import Button from "@mui/material/Button";
import Asynchronous from "@/components/Search/Asynchronous";
import {green, red} from "@mui/material/colors";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import TrendingChangeTable, {timeframes} from "@/components/Table/TrendingChange";
import TradeButton from "@/components/Market/TradeButton";

const Detail = () => {
    let {name} = useParams();
    const symbol = `${name?.split('-')[0]}${name?.split('-')[1]}${
        name && name?.split('-')?.length > 1 && name?.split('-')[2] === 'SWAP' && 'PERP'
    }`;

    const APIQuery = useAPIQuery()

    name = name as string

    const conditions = {
        timeFrame: APIQuery.value.timeframe ?? '',
        name
    };
    const sendUrl = new URLSearchParams(conditions).toString();


    const {data: klines} = useSWR(`${domain}/Coin?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 5,
    });

    const options = {
        grid: {top: 8, right: 8, bottom: 24, left: 45},
        xAxis: {
            type: 'category',
            data: klines?.data?.klines.map((item: { open_at: any; }) => item.open_at.toLocaleString()),
        },
        yAxis: {
            type: 'value',
            scale: true,
        },
        series: [
            {
                name: `${name} - ${APIQuery.value.timeframe}`,
                data: klines?.data?.klines.map((item: { open_bid: number; close_bid: number; highest_bid: number; lowest_bid: number; }) => [item.open_bid, item.close_bid, item.lowest_bid, item.highest_bid]),
                type: 'candlestick',
                smooth: true,
                itemStyle: {
                    color: green[500],
                    color0: red[500],
                    borderWidth: 0
                },
                markPoint: {
                    symbolSize: 100,
                    label: {
                        formatter: function (param: any) {
                            return param.name;
                        }
                    },
                    data: [
                        {
                            name: '趋势转多',
                            coord: ['2022-08-03T01:30:00Z', 3.815],
                            value: 3.815,
                            itemStyle: {
                                color: 'green'
                            }
                        },
                    ],
                    tooltip: {
                        formatter: function (param: { name: string; data: { coord: any; }; }) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
            },
        ],
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                top: '90%',
                start: 50,
                end: 100
            }
        ],
        tooltip: {
            trigger: 'axis',
        },
    };


    return (
        <>
            <Meta title={name}/>

            <Toolbar/>

            <Box px={2}>
                <Stack spacing={2}>
                    <Chip label={name} sx={{width: '250px'}}/>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Asynchronous/>

                        <TradeButton name={name}/>
                    </Box>

                    <ButtonGroup variant="outlined">
                        {timeframes.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    onClick={() => APIQuery.setValue({
                                        timeframe: item
                                    })}
                                    variant={item === APIQuery.value.timeframe ? 'contained' : 'outlined'}
                                >
                                    {item}
                                </Button>
                            )
                        })}
                    </ButtonGroup>

                    <EChartsReact option={options} style={{height: '300px'}}/>
                </Stack>
            </Box>

            <Container maxWidth={'xl'} sx={{mt: 2}}>
                <TrendingChangeTable/>
            </Container>
        </>
    );
};

export default Detail;
