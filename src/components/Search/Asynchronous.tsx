import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Card,
  Chip,
  Dialog,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { List } from 'linqts';
import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import { useAPIQuery } from '@/hooks/useAPIQuery';

import './raycast.scss';
import { CurrencyBitcoin } from '@mui/icons-material';
import { useCoinList } from '@/hooks/useCoinList';

interface ICoin {
  name: string;
  exchange: string;
}

interface IAsynchronous {
  height?: number;
  mode?: 'input' | 'button';
  label?: string;
  color?: string;
}

const Asynchronous: React.FC<IAsynchronous> = (props) => {
  let { mode } = props;
  let { label } = props;
  const isWhale = label === 'BTCUSDSHORTS' || label === 'BTCUSDLONGS';

  if (isWhale) {
    label = label === 'BTCUSDSHORTS' ? `空头仓位` : `多头仓位`;
  }

  mode = mode || 'button';
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly ICoin[]>([]);
  const APIQuery = useAPIQuery();
  const { data } = useSWR<any>(`${domain}/Coin`, fetcher);

  const [timer, setTimer] = useState<any>(null);

  const CoinList = useCoinList();
  const realtimePrice =
    CoinList?.value?.find(item => item.name === label)?.coin_realtime_price
    ?? '';

  function changeDelay(change: any) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        searchItem(change);
      }, 500),
    );
  }

  const loading = open && options.length === 0;
  const [searchData, setSearchData] = useState<any>();
  const searchItem = (query: string) => {
    if (!query) {
      setSearchData(data?.data.data);
      return;
    }
    query = query.toLowerCase();

    const finalResult: any[] | React.SetStateAction<undefined> = [];
    data?.data.data.forEach((item: { name: string; exchange: string | string[]; }) => {
      if (
        item.name.toLowerCase().indexOf(query) !== -1 ||
        item.exchange.includes(query)
      ) {
        finalResult.push(item);
      }
    });
    setSearchData(finalResult);
  };

  const nav = useNavigate();

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }

    if (data?.data) {
      const coins = new List<ICoin>(data.data.data).OrderBy((x) => x.name).ToArray();

      setOptions(coins);
      setSearchData(coins);
    }
  }, [data, open]);

  const handleChange = (option: any) => {
    nav(`/d/${option.name}`);
  };

  const [dialog, setDialog] = React.useState(false);

  const navLink = (link: string) => {
    nav(link);
    setDialog(false);
  };
  return (
    <>
      {mode === 'button' && (
        <Chip label={`${label} - ${parseFloat(realtimePrice)}`} avatar={<Avatar sx={{
          bgcolor: props.color,
        }}>{label?.slice(0, 1)}</Avatar>} variant={'outlined'}
              onClick={() => setDialog(true)} />
      )}

      {mode === 'input' && (
        <OutlinedInput
          readOnly
          sx={{ height: '30px' }}
          size={'small'}
          placeholder={'搜索币种'}
          onClick={() => setDialog(true)}
        />
      )}
      <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth>
        <Card variant={'outlined'} sx={{ py: 2 }}>
          <Stack spacing={1}>
            <Typography variant={'h5'} sx={{ px: 2 }}>商品代码搜索</Typography>
            <TextField
              onChange={(e) => changeDelay(e.target.value)}
              margin={'none'}
              sx={{
                '& fieldset': {
                  border: 0,
                  borderTop: 'solid 1px #e0e0e0',
                  borderRadius: 0,
                  borderBottom: 'solid 1px #e0e0e0',
                },
              }}
              label=''
              id='outlined-start-adornment'
              fullWidth
              size={'small'}
              InputProps={{
                startAdornment: <InputAdornment position='start'>
                  <CurrencyBitcoin />
                </InputAdornment>,
              }}
            />

            <Box px={2}>
              <Chip label={'全部'} color={'primary'} size={'small'} />
            </Box>

            <Box sx={{ overflowY: 'scroll', maxHeight: '500px' }}>
              {
                searchData ? searchData.map((item: any, i: number) => {
                  return (
                    <Box py={1} key={i} display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                         onClick={() => navLink(`/d/${item.name}`)}
                         sx={{
                           cursor: 'pointer',
                           px: 2,
                           '&:hover': {
                             backgroundColor: '#f5f5f5',
                           },
                           borderBottom: 'solid 1px #e0e0e0',
                         }}>
                      <Typography variant={'body2'}>
                        {item.name}
                      </Typography>

                      <Chip
                        size={'small'}
                        avatar={<Avatar alt='Natacha'
                                        src={item.exchange === 'binance' ? 'https://s3-symbol-logo.tradingview.com/provider/binance.svg' : 'https://s3-symbol-logo.tradingview.com/provider/bitfinex.svg'} />}
                        label={item.exchange.toUpperCase()}
                        variant='outlined'
                      />
                    </Box>
                  );
                }) : <></>
              }
            </Box>
          </Stack>
        </Card>
      </Dialog>
      {/*{data ? (*/}
      {/*    <Autocomplete*/}
      {/*        id="asynchronous-demo"*/}
      {/*        sx={{*/}
      {/*            maxWidth: 250, width: '100%',*/}
      {/*        }}*/}
      {/*        size={'small'}*/}
      {/*        open={open}*/}
      {/*        onOpen={() => {*/}
      {/*            setOpen(true);*/}
      {/*        }}*/}
      {/*        onClose={() => {*/}
      {/*            setOpen(false);*/}
      {/*        }}*/}
      {/*        isOptionEqualToValue={(option, value) => option.name === value.name}*/}
      {/*        getOptionLabel={(option) => option.name}*/}
      {/*        options={options}*/}
      {/*        loading={loading}*/}
      {/*        renderInput={(params) => (*/}
      {/*            <TextField*/}
      {/*                {...params}*/}
      {/*                size={'small'}*/}
      {/*                label={label ?? (APIQuery.value.name ?? '搜索币种')}*/}
      {/*                InputProps={{*/}
      {/*                    ...params.InputProps,*/}
      {/*                    endAdornment: (*/}
      {/*                        <React.Fragment>*/}
      {/*                            {loading ? <CircularProgress color="inherit" size={20}/> : null}*/}
      {/*                            {params.InputProps.endAdornment}*/}
      {/*                        </React.Fragment>*/}
      {/*                    ),*/}
      {/*                }}*/}
      {/*            />*/}
      {/*        )}*/}
      {/*        renderOption={(props, option, {inputValue}) => {*/}
      {/*            const matches = match(option.name, inputValue);*/}
      {/*            const parts = parse(option.name, matches);*/}

      {/*            return (*/}
      {/*                <li {...props}*/}
      {/*                    onClick={() => handleChange(option)}>*/}
      {/*                    <div>*/}
      {/*                        {parts.map((part, index) => (*/}
      {/*                            <span*/}
      {/*                                key={index}*/}
      {/*                                style={{*/}
      {/*                                    fontWeight: part.highlight ? 700 : 400,*/}
      {/*                                }}*/}
      {/*                            >*/}
      {/*                              {part.text}*/}
      {/*                            </span>*/}
      {/*                        ))}*/}
      {/*                    </div>*/}
      {/*                </li>*/}
      {/*            );*/}
      {/*        }}*/}
      {/*    />*/}
      {/*) : <Skeleton sx={{width: '250px'}}>*/}
      {/*    <OutlinedInput/>*/}
      {/*</Skeleton>}*/}
    </>
  );
};

export default Asynchronous;