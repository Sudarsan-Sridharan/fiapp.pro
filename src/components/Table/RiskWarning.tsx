import React from 'react';

import {Box, Container, Stack, Toolbar, Typography} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import TradeButton from "@/components/Market/TradeButton";
import QueryTable from "@/components/Table/Query";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {Link, useMatch} from "react-router-dom";
import Button from "@mui/material/Button";
import {ArrowRightOutlined} from "@mui/icons-material";

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
        renderCell: (params) => `${params.value}`,
        width: 200,
    },
    {
        field: 'risk',
        headerName: '风险',
    },
    {
        field: 'description',
        headerName: '描述',
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

    return (
        <Container maxWidth={'xl'}>
            <Toolbar/>

            <Stack spacing={2}>
                <Typography variant={'h4'}>风险预警</Typography>

                <QueryTable/>

                <Box height={'60vh'}>
                    {data && <DataGrid disableColumnFilter rows={data} columns={columns}/>}
                </Box>
            </Stack>
        </Container>
    );
};

export default RiskWarningTable;
