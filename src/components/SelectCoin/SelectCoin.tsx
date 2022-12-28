import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from '@mui/material';

import { messageType } from '@/pages/Detail/Detail';

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

const stopMarks = [
  { value: 1, label: '<1%' },
  { value: 1.5, label: '1-1.5%' },
  { value: 2, label: '1.5-2%' },
];

const Trending = () => {
  const [trending, setTrending] = React.useState('');
  const trendingTips = ['无', '多头', '空头'];
  const handleChange = (event: SelectChangeEvent) => {
    setTrending(event.target.value as string);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="trending">趋势</InputLabel>
        <Select
          labelId="trending"
          id="category"
          value={trending}
          label="趋势"
          onChange={handleChange}
        >
          {trendingTips.map((item, index) => (
            <MenuItem key={index} value={index === 0 ? '' : item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2}>
        <Typography>等级</Typography>
        <Slider
          aria-label="rank"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={5}
        />
      </Box>
    </>
  );
};

const Risk = () => {
  const [risk, setRisk] = React.useState('');
  const riskTips = ['无', ...Object.values(messageType)];
  const handleChange = (event: SelectChangeEvent) => {
    setRisk(event.target.value as string);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="trending">风险</InputLabel>
        <Select labelId="trending" id="category" value={risk} label="风险" onChange={handleChange}>
          {riskTips.map((item, index) => (
            <MenuItem key={index} value={index === 0 ? '' : item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2}>
        <Typography>等级</Typography>
        <Slider
          aria-label="rank"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={5}
        />
      </Box>
    </>
  );
};

const Signal = () => {
  const [signal, setSignal] = React.useState('');
  const [signalType, setSignalType] = React.useState('');
  const signalTips = ['无', '买/多', '卖/空'];
  const signalTypies = ['无', '趋势', '震荡'];
  const handleChange = (event: SelectChangeEvent) => {
    setSignal(event.target.value as string);
  };

  const handleSignalTypeChange = (event: SelectChangeEvent) => {
    setSignalType(event.target.value as string);
  };

  return (
    <Stack spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="signalType">买卖类型</InputLabel>
        <Select
          labelId="signalType"
          id="signal"
          value={signalType}
          label="类型"
          onChange={handleChange}
        >
          {signalTypies.map((item, index) => (
            <MenuItem key={index} value={index === 0 ? '' : item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="signal">买卖/多空信号</InputLabel>
        <Select
          labelId="signal"
          id="signal"
          value={signal}
          label="买卖/多空信号"
          onChange={handleChange}
        >
          {signalTips.map((item, index) => (
            <MenuItem key={index} value={index === 0 ? '' : item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Typography>等级</Typography>
        <Slider
          aria-label="rank"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={5}
        />
      </Box>

      <Box>
        <Typography>止损（百分比）</Typography>
        <Slider
          aria-label="stop"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={0.5}
          marks={stopMarks}
          min={1}
          max={2}
        />
      </Box>
    </Stack>
  );
};

const SelectCoin = () => {
  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={2}>
          <Card>
            <CardContent>
              <Trending />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <Card>
            <CardContent>
              <Risk />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider />

      <Box>
        <Typography variant={'h4'}>高级会员专享：</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Signal />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Button
        size={'large'}
        sx={{ maxWidth: '200px' }}
        variant="contained"
        color="primary"
        disabled
      >
        筛选（即将上线）
      </Button>
    </Stack>
  );
};

export default SelectCoin;