import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Badge, Box, Chip, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useMatch} from "react-router-dom";
import {ArrowRightOutlined} from "@mui/icons-material";
import BigNumber from "bignumber.js";
import React, {useEffect} from "react";
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {green, red} from "@mui/material/colors";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import TradeButton from "@/components/Market/TradeButton";
import {atom, useRecoilState} from "recoil";
import QueryTable from "@/components/Table/Query";

export interface ITrendingChange {
    name?: string,
    time_frame?: string,
    current_trending?: number,
    forward_time_duration?: number,
    open_price?: number,
    open_time: Date,
    risk: number
}

export const trendingChangeAtom = atom<ITrendingChange[]>({
    key: "trendingChangeAtomKey",
    default: []
})

export const trendingChangeColumns: GridColDef[] = [
    {
        field: 'current_trending',
        headerName: '趋势方向',
        renderCell: (params) => (
            <Chip
                size={'small'}
                color={params.value === 1 ? 'success' : params.value === 0 ? 'default' : 'error'}
                label={params.value === 1 ? '多' : params.value === 0 ? '中立' : '空'}
            />
        ),
    },
    {
        field: 'name',
        headerName: '名称',
        width: 150,
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
        width: 80
    },

    {
        field: 'open_time',
        headerName: '触发时间',
        renderCell: (params) => new Date(params.value).toLocaleString(),
        width: 180,
    },
    {
        field: 'risk',
        headerName: '可靠度',
        renderCell: (params) => {
            let value = params.value
            value = 6 - value
            if (value === 0) {
                value = 1
            }
            return (
                <Badge badgeContent={value}>
                    <Chip
                        size={'small'}
                        sx={{color: '#fff'}}
                        color={
                            value < 2
                                ? 'primary'
                                : value >= 2 && value <= 4
                                    ? 'warning'
                                    : 'error'
                        }
                        label={value < 2 ? '低' : value >= 2 && value <= 4 ? '中' : '高'}
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

export const timeframes = ['30M', '1H', '4H', '1D'];

const TrendingChangeTable = () => {
    const APIQuery = useAPIQuery()
    const detail = useMatch('/d/:name');

    const urlRisk = APIQuery.value.risk !== 0 ? (APIQuery.value.risk?.toString() ?? '') : '';

    const conditions = {
        risk: urlRisk,
        timeframe: APIQuery.value.timeframe ?? '',
        currentTrending: APIQuery.value.currentTrending ?? '',
        name: detail?.params?.name ?? ''
    };
    const sendUrl = new URLSearchParams(conditions).toString();

    const {data: trendingChange} = useSWR(`${domain}/TrendingChange?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const [trendingChangeData, setTrendingChangeData] = useRecoilState(trendingChangeAtom);

    useEffect(() => {
        setTrendingChangeData(trendingChange)
    }, [trendingChange])

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
                    {/*<Stack spacing={1} direction={'row'} sx={{alignItems: 'end'}}>*/}
                    {/*    <Badge badgeContent={'稳定版'}>*/}
                    {/*        <Typography variant={'h2'}>趋势转换 </Typography>*/}
                    {/*    </Badge>*/}
                    {/*</Stack>*/}

                    <Typography variant={'body1'}>
                        7 X 24小时跟踪趋势反转，持续监控中，监控周期：30m，1h，4h
                    </Typography>

                    <Typography variant={'body1'}>
                        趋势追踪是环境信号，可以辅助观察标的当前趋势情况，不对任何交易做出任何投资决策。
                    </Typography>
                </Box>

                <QueryTable/>

                {trendingChange && (
                    <Box>
                        <Box height={'60vh'}>
                            <DataGrid
                                rows={trendingChange}
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