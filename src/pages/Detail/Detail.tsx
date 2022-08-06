import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

import {Box, ButtonGroup, Container, Menu, Stack, Toolbar, Typography} from '@mui/material';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import Meta from '@/components/Meta';
import {timeFrames, trendingChangeColumns} from "@/pages/TrendingChange/TrendingChange";
import EChartsReact from "echarts-for-react";
import Button from "@mui/material/Button";
import Asynchronous from "@/components/Search/Asynchronous";
import {bindHover, bindMenu, usePopupState} from "material-ui-popup-state/hooks";
import {ArrowDropDown} from "@mui/icons-material";

const Detail = () => {
    let {name} = useParams();
    const symbol = `${name?.split('-')[0]}${name?.split('-')[1]}${
        name && name?.split('-')?.length > 1 && name?.split('-')[2] === 'SWAP' && 'PERP'
    }`;

    const {data: trendingChange} = useSWR(
        `${domain}/TrendingChange?name=${name}`,
        fetcher,
        {
            refreshInterval: 1000 * 60 * 1,
        },
    );

    const [timeFrame, setTimeFrame] = useState('30M');

    name = name as string

    const conditions = {
        timeFrame,
        name
    };
    const sendUrl = new URLSearchParams(conditions).toString();


    const {data: klines} = useSWR(`${domain}/Coin?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 30,
    });

    const options = {
        grid: {top: 8, right: 8, bottom: 24, left: 36},
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
                name: `${name} - ${timeFrame}`,
                data: klines?.data?.klines.map((item: { open_bid: any; close_bid: any; highest_bid: any; lowest_bid: any; }) => [item.open_bid, item.close_bid, item.lowest_bid, item.highest_bid]),
                type: 'candlestick',
                smooth: true,
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

    const popupState = usePopupState({variant: 'popover', popupId: 'demoMenu'})

    return (
        <>
            <Meta title={name}/>

            <Toolbar/>

            <Box px={2}>
                <Stack spacing={2}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Asynchronous/>

                        <Button variant={'contained'}
                                endIcon={<ArrowDropDown/>}
                                {...bindHover(popupState)}>
                            交易
                        </Button>

                        <Menu {...bindMenu(popupState)}>
                            <Stack spacing={1}>
                                <Button fullWidth href={`https://www.binance.com/zh-CN/trade/${name}`}
                                        target={'_blank'}>币安</Button>
                                <Button
                                    href={`https://www.okx.com/trade-spot/${name.split('USDT')[0]}-USDT`}
                                    target={'_blank'}>OKX</Button>
                            </Stack>
                        </Menu>
                    </Box>

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
                    </ButtonGroup>

                    <EChartsReact option={options} style={{height: '300px'}}/>
                </Stack>
            </Box>

            <Container maxWidth={'xl'} sx={{mt: 2}}>
                <Box>
                    <Typography variant={'h2'}>趋势转换 </Typography>

                    <Typography variant={'body1'}>实时跟踪趋势反转</Typography>
                </Box>

                <Box height={'500px'}>
                    {trendingChange && (
                        <DataGrid
                            rows={trendingChange}
                            columns={trendingChangeColumns}
                            componentsProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: {debounceMs: 500},
                                },
                            }}
                            disableColumnFilter
                            components={{Toolbar: GridToolbar}}
                        />
                    )}
                </Box>
            </Container>
        </>
    );
};

export default Detail;
