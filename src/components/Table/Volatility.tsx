import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import React from "react";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {timeframes} from "@/components/Table/TrendingChange";
import Button from "@mui/material/Button";
import {Box, ButtonGroup} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {ArrowRightOutlined} from "@mui/icons-material";
import TradeButton from "@/components/Market/TradeButton";

export const volatilityColumns: GridColDef[] = [
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
        field: 'value',
        headerName: '波动率',
        width: 150,
        renderCell: (params) => (
            <>
                {((params.value * 100).toFixed(3))}%
            </>
        ),
    },
    {
        field: 'open_time',
        headerName: '触发时间',
        renderCell: (params) => new Date(params.value).toLocaleString(),
        width: 180,
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
        <>
            <ButtonGroup variant="outlined">
                {timeframes.map((item, index) => (
                    <Button
                        key={index}
                        onClick={() => APIQuery.setValue({
                            ...APIQuery.value,
                            timeframe: item,
                        })}
                        variant={item === APIQuery.value.timeframe ? 'contained' : 'outlined'}
                    >
                        {item}
                    </Button>
                ))}
            </ButtonGroup>

            {volatility && (
                <Box height={'60vh'}>
                    <DataGrid columns={volatilityColumns} rows={volatility}/>
                </Box>
            )}
        </>
    )
}

export default VolatilityTable