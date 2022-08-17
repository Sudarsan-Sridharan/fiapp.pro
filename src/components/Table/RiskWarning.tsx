import React, {useEffect} from 'react';

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
        headerName: '反转度',
        renderCell: (params) => {
            const value = params.value;
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
        renderCell: (params) => `$${params.value}`,
        width: 150,
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

    useEffect(() => {
        setRiskWarning(riskWarning)
    }, [riskWarning])


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
