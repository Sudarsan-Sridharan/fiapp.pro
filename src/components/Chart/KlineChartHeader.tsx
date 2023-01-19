import React from 'react';
import { Divider, Paper, Stack, Typography, TypographyProps } from '@mui/material';
import Asynchronous from '@/components/Search/Asynchronous';
import { styled } from '@mui/system';
import { Apps, MultilineChart } from '@mui/icons-material';
import { useAPIQuery } from '@/hooks/useAPIQuery';
import { grey } from '@mui/material/colors';


const PointerText = styled(Typography)<TypographyProps>((theme) => ({
  cursor: 'pointer',
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: grey[200],
  },
  padding: 4,
}));

const Indicate = () => {
  return (<>
    <PointerText sx={{ cursor: 'not-allowed', opacity: '.1' }}><Stack alignItems={'center'} direction={'row'}>
      <MultilineChart />
      指标
    </Stack> </PointerText>
  </>);
};

const Strategy = () => {
  return (<>
    <PointerText sx={{ cursor: 'not-allowed', opacity: '.1' }}><Stack alignItems={'center'} direction={'row'}>
      <Apps />
      量化
    </Stack> </PointerText>
  </>);
};

const TimeFrame = () => {
  const APIQuery = useAPIQuery();
  const I18Ntime: any = {
    'M': '分',
    'H': '小时',
    'D': '天',
  };

  const times = ['30M', '1H', '4H', '1D'];
  return (
    <>
      {times.map((item) => <PointerText
        sx={{
          bgcolor: item === APIQuery.value.timeframe ? grey[200] : '',
        }}
        onClick={() =>
          APIQuery.setValue({
            ...APIQuery.value,
            timeframe: item,
          })
        }
        key={item}>{item.replace(/M|H|D/gi, (match) => I18Ntime[match])}</PointerText>)}
    </>
  );
};

interface IKlineChartHeader {
  coin: string;
}

const VerticalDivider = () => <Divider orientation={'vertical'} variant={'middle'} flexItem />;
const KlineChartHeader: React.FC<IKlineChartHeader> = (props) => {
  return (
    <>
      <Paper variant={'outlined'} sx={{ borderRadius: 0, borderRight: 0 }}>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Asynchronous label={props.coin} />
          <VerticalDivider />
          <TimeFrame />
          <VerticalDivider />
          <Indicate />
          <VerticalDivider />
          <Strategy />
        </Stack>
      </Paper>
    </>
  );
};

export default KlineChartHeader;