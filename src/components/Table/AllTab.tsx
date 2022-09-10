import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Tab} from "@mui/material";
import React from "react";
import TrendingChangeTable from "@/components/Table/TrendingChange";
import RiskWarningTable from "@/components/Table/RiskWarning";
import VolatilityTable from "@/components/Table/Volatility";

const AllTabTable = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


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
                        <Tab label="动量检测" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <TrendingChangeTable/>
                </TabPanel>
                <TabPanel value="2">
                    <RiskWarningTable/>
                </TabPanel>
                <TabPanel value="3">
                    <VolatilityTable/>
                </TabPanel>
            </TabContext>
        </Box>
    )
}

export default AllTabTable;