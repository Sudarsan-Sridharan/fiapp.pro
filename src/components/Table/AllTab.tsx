import React from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import TrendingChangeTable from '@/components/Table/TrendingChange';
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
  ];

  return (
    <Card
      id={'all-tab-table'}
      variant={'outlined'}
      sx={{
        p: 2,
        '& .MuiTabPanel-root': {
          padding: 0,
          py: 2,
        },
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
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
    </Card>
  );
};

export default AllTabTable;