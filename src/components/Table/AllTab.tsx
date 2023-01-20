import React from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

import SelectCoin from '@/components/SelectCoin/SelectCoin';
import RiskWarningTable from '@/components/Table/RiskWarning';
import TrendingChangeTable from '@/components/Table/TrendingChange';
import VolatilityTable from '@/components/Table/Volatility';
import Monitor from '@/components/Monitor/Monitor';

interface ITabList {
  label: string;
  value: string;
  element: React.ReactNode;
}

const AllTabTable = () => {
  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabList: ITabList[] = [
    { label: '全局监控（实时）', value: '0', element: <Monitor /> },
    { label: '趋势转换', value: '1', element: <TrendingChangeTable /> },
    { label: '风险预警', value: '2', element: <RiskWarningTable /> },
    { label: '动量检测', value: '3', element: <VolatilityTable /> },
    { label: '选币系统（内测中）', value: '4', element: <SelectCoin /> },
  ];

  return (
    <Box
      sx={{
        '& .MuiTabPanel-root': {
          padding: 0,
          py: 2,
        },
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabList.map((item, index) => (
              <Tab key={index} label={item.label} value={item.value} />
            ))}
          </TabList>
        </Box>
        {tabList.map((item, index) => (
          <TabPanel key={index} value={item.value}>
            {item.element}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default AllTabTable;