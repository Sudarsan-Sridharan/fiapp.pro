import React from 'react';
import {useParams} from 'react-router-dom';

import {Box, Container, Toolbar, Typography} from '@mui/material';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import Meta from '@/components/Meta';
import {trendingChangeColumns} from "@/pages/TrendingChange/TrendingChange";

const Detail = () => {
    const {name} = useParams();
    const symbol = `${name?.split('-')[0]}${name?.split('-')[1]}${
        name && name?.split('-')?.length > 1 && name?.split('-')[2] === 'SWAP' && 'PERP'
    }`;

    const {data: trendingChange} = useSWR(
        `${domain}/TrendingChange/detail?name=${name}`,
        fetcher,
        {
            refreshInterval: 1000 * 60 * 1,
        },
    );

    return (
        <>
            <Meta title={name}/>

            {/*<Box maxHeight={'100%'}>*/}
            {/*  {symbol && (*/}
            {/*    <SymbolOverview*/}
            {/*      chartOnly*/}
            {/*      lineColor={'rgba(0,0,0,255)'}*/}
            {/*      topColor={'rgba(0,0,0,0)'}*/}
            {/*      bottomColor={'rgba(0,0,0,0)'}*/}
            {/*      symbols={[[`${symbol}`]]}*/}
            {/*      scaleMode={'Logarithmic'}*/}
            {/*      chartType={'candlesticks'}*/}
            {/*      width={'100%'}*/}
            {/*      locale={'zh_CN'}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*</Box>*/}

            <Toolbar/>
            <Container maxWidth={'xl'}>
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
