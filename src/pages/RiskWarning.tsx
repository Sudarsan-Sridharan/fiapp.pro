import React from 'react';

import {Container, Toolbar} from '@mui/material';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import RiskWarningTable from "@/components/Table/RiskWarning";

const RiskWarning = () => {
    const {data} = useSWR(`${domain}/RiskWarning`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    return (
        <Container maxWidth={'xl'}>
            <Toolbar/>

            <RiskWarningTable/>
        </Container>
    );
};

export default RiskWarning;
