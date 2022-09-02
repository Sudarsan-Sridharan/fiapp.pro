import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Skeleton, Stack, Tooltip, useMediaQuery} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useMatch} from "react-router-dom";
import BigNumber from "bignumber.js";
import React, {useEffect} from "react";
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {atom, useRecoilState} from "recoil";
import {RatingQuery, TimeframeQuery, TrendingQuery} from "@/components/Table/Query";
import {timejs} from "@/utils/time";


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
        field: 'name',
        headerName: '名称',
        width: 120,
        renderCell: (params) => (
            <Button
                component={Link}
                to={`/d/${params.value}`}
                sx={{paddingLeft: 0, minWidth: 0}}
                size={"small"}
                color={params.row.current_trending === 1 ? 'success' : params.row.current_trending === 0 ? 'inherit' : 'error'}
            >
                {params.value.substring(0, params.value.indexOf("USDT"))}

                <Tooltip title={'可靠度'} arrow placement={"right"}>
                   <span>
                        ({6 - params.row.risk})
                   </span>
                </Tooltip>
            </Button>
        ),
    },
    {
        field: 'open_time',
        headerName: '触发时间',
        renderCell: (params) => timejs(new Date(params.value).toLocaleString()).fromNow(),
        width: 120,
    },
    {
        field: 'open_price',
        headerName: '触发价格',
        renderCell: (params) => `$${new BigNumber(params.value).toFixed()}`,
        width: 120,
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


    const mdBreakDown = useMediaQuery((theme: any) => theme?.breakpoints.down('md'))
    console.log(mdBreakDown)

    return (
        <>
            <Stack
                spacing={1}
            >
                <Stack spacing={1} direction={mdBreakDown ? 'column' : 'row'}
                       alignItems={mdBreakDown ? 'start' : 'center'}>
                    <TrendingQuery/>
                    <TimeframeQuery/>
                    <RatingQuery/>
                </Stack>


                {trendingChange ? (
                    <Box>
                        <Box height={'60vh'}>
                            <DataGrid
                                rows={trendingChange}
                                density={"compact"}
                                columns={trendingChangeColumns}
                                getRowClassName={(params) => {
                                    return "F-row"
                                }}
                            />
                        </Box>
                    </Box>
                ) : <Skeleton height={'60vh'}/>}
            </Stack>
        </>
    )
}

export default TrendingChangeTable;