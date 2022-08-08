import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Badge, Box, ButtonGroup, Chip, IconButton, Rating, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useMatch} from "react-router-dom";
import {ArrowRightOutlined, CancelOutlined} from "@mui/icons-material";
import BigNumber from "bignumber.js";
import React, {useState} from "react";
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {green, red} from "@mui/material/colors";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import TradeButton from "@/components/Market/TradeButton";

export const trendingChangeColumns: GridColDef[] = [
    {
        field: 'current_trending',
        headerName: '趋势方向',
        renderCell: (params) => (
            <Chip
                size={'small'}
                color={params.value === '1' ? 'success' : params.value === '0' ? 'default' : 'error'}
                label={params.value === '1' ? '多' : params.value === '0' ? '中立' : '空'}
            />
        ),
    },
    {
        field: 'name',
        headerName: '名称',
        width: 200,
        renderCell: (params) => (
            <Button
                component={Link}
                to={`/d/${params.value}`}
                sx={{paddingLeft: 0, minWidth: 0}}
                endIcon={<ArrowRightOutlined/>}
            >
                {params.value}
            </Button>
        ),
    },
    {
        field: 'time_frame',
        headerName: '周期',
    },

    {
        field: 'open_time',
        headerName: '触发时间',
        renderCell: (params) => new Date(params.value).toLocaleString(),
        width: 200,
    },
    {
        field: 'risk',
        headerName: '风险',
        renderCell: (params) => {
            return (
                <Badge badgeContent={params.value}>
                    <Chip
                        size={'small'}
                        sx={{color: '#fff'}}
                        color={
                            params.value < 2
                                ? 'primary'
                                : params.value >= 2 && params.value <= 4
                                    ? 'warning'
                                    : 'error'
                        }
                        label={params.value < 2 ? '低' : params.value >= 2 && params.value <= 4 ? '中' : '高'}
                    />
                </Badge>
            );
        },
    },
    {
        field: 'open_price',
        headerName: '触发价格',
        renderCell: (params) => `$${new BigNumber(params.value).toFixed()}`,
        width: 150,
    },
    // {
    //     field: 'forward_time_duration',
    //     headerName: '之前趋势持续时间',
    //     width: 200,
    //     renderCell: (params) => (
    //         <>
    //             {params.value.split(' ')[0] !== '0' && `${params.value.split(' ')[0]}天`}
    //             {params.value.split(' ')[2].split(':')[0] !== '00' &&
    //                 `${params.value.split(' ')[2].split(':')[0]}小时`}
    //             {params.value.split(' ')[2].split(':')[1] !== '00' &&
    //                 `${params.value.split(' ')[2].split(':')[1]}分`}
    //             {params.value.split(' ')[2].split(':')[2] !== '00' &&
    //                 `${params.value.split(' ')[2].split(':')[2]}秒`}
    //         </>
    //     ),
    // },
    {
        field: 'actions',
        headerName: '',
        width: 200,
        renderCell: (params) => {
            const name = params.row.name;

            return (
                <>
                    <TradeButton name={name}/>
                </>
            );
        },
    },
];

export const timeframes = ['5M', '30M', '1H', '4H'];

const TrendingChangeTable = () => {
    const [risk, setRisk] = useState<number>(0);
    const [currentTrending, setCurrentTrending] = useState<string>('');

    const APIQuery = useAPIQuery()
    const detail = useMatch('/d/:name');

    const urlRisk = risk !== 0 ? risk.toString() : '';

    const conditions = {
        risk: urlRisk,
        timeframe: APIQuery.value.timeframe ?? '',
        currentTrending,
        name: detail?.params?.name ?? ''
    };
    const sendUrl = new URLSearchParams(conditions).toString();

    const {data: trendingChane} = useSWR(`${domain}/TrendingChange?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    return (
        <>
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
                <Box>
                    <Stack spacing={1} direction={'row'} sx={{alignItems: 'end'}}>
                        <Badge badgeContent={'稳定版'}>
                            <Typography variant={'h2'}>趋势转换 </Typography>
                        </Badge>
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
                            {timeframes.map((item, index) => (
                                <Button
                                    key={index}
                                    onClick={() => APIQuery.setValue({
                                        timeframe: item
                                    })}
                                    variant={item === APIQuery.value.timeframe ? 'contained' : 'outlined'}
                                >
                                    {item}
                                </Button>
                            ))}
                            <Button
                                onClick={() => APIQuery.setValue({
                                    timeframe: ''
                                })}
                                variant={APIQuery.value.timeframe === '' ? 'contained' : 'outlined'}
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
                        <Box height={'60vh'}>
                            <DataGrid
                                rows={trendingChane}
                                columns={trendingChangeColumns}
                            />
                        </Box>
                    </Box>
                )}
            </Stack>
        </>
    )
}

export default TrendingChangeTable;