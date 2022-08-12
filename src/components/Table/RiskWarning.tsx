import React from 'react';

import {Badge, Box, Chip, Stack} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import TradeButton from "@/components/Market/TradeButton";
import QueryTable from "@/components/Table/Query";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {Link, useMatch} from "react-router-dom";
import Button from "@mui/material/Button";
import {ArrowRightOutlined} from "@mui/icons-material";
import {atom, useRecoilState} from "recoil";
import {messageType} from "@/pages/Detail/Detail";

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
        field: 'open_price',
        headerName: '触发价格',
        renderCell: (params) => `$${params.value}`,
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
        field: 'description_type',
        headerName: '描述',
        renderCell: (params) => {
            return messageType[params.value as keyof typeof messageType];
        },
        width: 200
    },
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

    if (data) {
        setRiskWarning(data)
    }

    return (
        <Stack spacing={2}>
            {/*<Typography variant={'h4'}>风险预警</Typography>*/}

            <QueryTable/>

            <Box height={'60vh'}>
                {data && <DataGrid disableColumnFilter rows={data} columns={columns}/>}
            </Box>
        </Stack>
    );
};

export default RiskWarningTable;
