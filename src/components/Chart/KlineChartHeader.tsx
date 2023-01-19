import React from 'react';
import { Divider, Paper, Stack, Typography, TypographyProps } from '@mui/material';
import Asynchronous from '@/components/Search/Asynchronous';
import { styled } from '@mui/system';
import { Apps, FavoriteBorderOutlined, MultilineChart } from '@mui/icons-material';
import { useAPIQuery } from '@/hooks/useAPIQuery';
import { grey, indigo } from '@mui/material/colors';
import { UserAtom } from '@/hooks/useUser';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';


const PointerText = styled(Typography)<TypographyProps>((theme) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: grey[200],
  },
  padding: 4,
}));

interface IPointerButton {
  cursor?: string,
  opacity?: string,
  icon?: React.ReactNode,
  children: React.ReactNode,
  color?: string
}

const PointerButton: React.FC<IPointerButton> = (props) => (
  <PointerText color={props.color} variant={'body2'} sx={{ cursor: props.cursor, opacity: props.opacity }}>
    <Stack alignItems={'center'} direction={'row'}>
      {props.icon}
      {props.children}
    </Stack>
  </PointerText>
);

const Indicate = () => {
  return (<>
    <PointerButton icon={<MultilineChart />} cursor={'not-allowed'} opacity={'.1'}>指标</PointerButton>
  </>);
};

const Strategy = () => {
  return (<>
    <PointerButton icon={<Apps />} cursor={'not-allowed'} opacity={'.1'}>量化</PointerButton>
  </>);
};


const WatchCoin: React.FC<IKlineChartHeader> = (props) => {
  const { token } = useRecoilValue(UserAtom);
  const nav = useNavigate();
  const currentPath = window.location.pathname;

  const watch = () => {
    console.log(props.coin);
  };

  return (
    <PointerButton icon={<FavoriteBorderOutlined />} cursor={'not-allowed'} opacity={'.1'}>
      关注
    </PointerButton>
  );
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
        color={item === APIQuery.value.timeframe ? indigo[600] : ''}
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
          <VerticalDivider />
          <WatchCoin coin={props.coin} />
        </Stack>
      </Paper>
    </>
  );
};

export default KlineChartHeader;