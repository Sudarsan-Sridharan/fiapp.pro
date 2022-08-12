import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Tab} from "@mui/material";
import React, {useEffect} from "react";
import TrendingChangeTable, {trendingChangeAtom} from "@/components/Table/TrendingChange";
import RiskWarningTable, {riskWarningAtom} from "@/components/Table/RiskWarning";
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {useRecoilState} from "recoil";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {useMatch} from "react-router-dom";

const AllTabTable = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const APIQuery = useAPIQuery()
    const detail = useMatch('/d/:name');

    const conditions = {
        risk: '',
        timeframe: APIQuery.value.timeframe ?? '',
        currentTrending: '',
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

    const {data: riskWarningData} = useSWR(`${domain}/RiskWarning?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const [riskWarning, setRiskWarning] = useRecoilState(riskWarningAtom);

    useEffect(() => {
        setRiskWarning(riskWarningData)
    }, [trendingChange])


    return (
        <Box sx={{
            '& .MuiTabPanel-root': {
                padding: 0,
                py: 2
            }
        }}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="趋势转换" value="1"/>
                        <Tab label="风险预警" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <TrendingChangeTable/>
                </TabPanel>
                <TabPanel value="2">
                    <RiskWarningTable/>
                </TabPanel>
            </TabContext>
        </Box>
    )
}

export default AllTabTable;