import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import React from "react";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import Button from "@mui/material/Button";
import {Box, Skeleton, Stack} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {timejs} from "@/utils/time";
import {TimeframeQuery} from "@/components/Table/Query";

export const volatilityColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: '名称',
        width: 180,
        renderCell: (params) => (
            <Button
                component={Link}
                to={`/d/${params.value}`}
                sx={{paddingLeft: 0, minWidth: 0}}
                color={"inherit"}
                size={"small"}
            >
                {params.value.substring(0, params.value.indexOf("USDT"))} ({((params.row.value * 100).toFixed(3))}%)
            </Button>
        ),
    },
    {
        field: 'open_time',
        headerName: '触发时间',
        renderCell: (params) => timejs(new Date(params.value).toLocaleString()).fromNow(),
        width: 120,
    },
];


const VolatilityTable = () => {
    const APIQuery = useAPIQuery()
    const conditions = {
        timeframe: APIQuery.value.timeframe ?? '',
    }

    const sendUrl = new URLSearchParams(conditions).toString();

    const {data: volatility} = useSWR(`${domain}/Volatility?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60,
    })

    return (
        <Stack spacing={1}>
            <TimeframeQuery/>

            {volatility ? (
                <Box height={'60vh'}>
                    <DataGrid density={'compact'} columns={volatilityColumns} rows={volatility}/>
                </Box>
            ) : (<Skeleton height={'60vh'}/>)}
        </Stack>
    )
}

export default VolatilityTable