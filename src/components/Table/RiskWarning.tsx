import React, {useEffect} from 'react';

import {Box, Skeleton, Stack, Tooltip} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import {TimeframeQuery} from "@/components/Table/Query";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {Link, useMatch} from "react-router-dom";
import Button from "@mui/material/Button";
import {atom, useRecoilState} from "recoil";
import {messageType} from "@/pages/Detail/Detail";
import {timejs} from "@/utils/time";

export interface IRiskWarning {
    description_type: number,
    name?: string,
    open_price?: number,
    open_time: Date,
    time_frame?: string,
    risk?: number
}

export const riskWarningAtom = atom<IRiskWarning[]>({
    key: "riskWarningAtom",
    default: []
})

const columns: GridColDef[] = [
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
                color={"inherit"}
            >
                {params.value.substring(0, params.value.indexOf("USDT"))}

                <Tooltip title={'反转度'} arrow placement={"right"}>
                   <span>
                        ({params.row.risk})
                   </span>
                </Tooltip>
            </Button>
        ),
    },
    {
        field: 'open_time',
        headerName: '触发时间',
        renderCell: (params) => timejs(new Date(params.value).toLocaleString()).toNow(),
        width: 120,
    },
    {
        field: 'open_price',
        headerName: '触发价格',
        renderCell: (params) => `$${params.value}`,
        width: 120,
    },
    {
        field: 'description_type',
        headerName: '描述',
        renderCell: (params) => {
            return messageType[params.value as keyof typeof messageType];
        },
        width: 200
    },
];

const RiskWarningTable = () => {
    const APIQuery = useAPIQuery()
    const detail = useMatch('/d/:name');

    const conditions = {
        risk: APIQuery.value.risk !== 0 ? (APIQuery.value.risk?.toString() ?? '') : '',
        timeframe: APIQuery.value.timeframe ?? '',
        currentTrending: APIQuery.value.currentTrending ?? '',
        name: detail?.params?.name ?? ''
    };

    const sendUrl = new URLSearchParams(conditions).toString();

    const {data} = useSWR(`${domain}/RiskWarning?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const [riskWarning, setRiskWarning] = useRecoilState(riskWarningAtom);

    useEffect(() => {
        setRiskWarning(riskWarning)
    }, [riskWarning])


    return (
        <Stack spacing={1}>
            {/*<Typography variant={'h4'}>风险预警</Typography>*/}

            <TimeframeQuery/>

            {data ? (
                <Box height={'60vh'}>
                    <DataGrid density={"compact"} disableColumnFilter rows={data} columns={columns}/>
                </Box>
            ) : <Skeleton height={'60vh'}/>}
        </Stack>
    );
};

export default RiskWarningTable;
