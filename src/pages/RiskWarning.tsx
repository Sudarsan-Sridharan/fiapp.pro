import React from 'react';

import {Container, Toolbar} from '@mui/material';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import RiskWarningTable from "@/components/Table/RiskWarning";
import Meta from "@/components/Meta";

const RiskWarning = () => {
    const {data} = useSWR(`${domain}/RiskWarning`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    return (
        <Container maxWidth={'xl'}>
            <Meta title={'风险预警'}/>
            <Toolbar/>

            <RiskWarningTable/>
        </Container>
    );
};

export default RiskWarning;
