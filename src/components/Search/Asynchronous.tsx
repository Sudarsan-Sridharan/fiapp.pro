import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  OutlinedInput,
  Skeleton,
  TextField,
} from '@mui/material';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { List } from 'linqts';
import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import { useAPIQuery } from '@/hooks/useAPIQuery';

import './raycast.scss';

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

  const loading = open && options.length === 0;

  const nav = useNavigate();

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }

    if (data?.data) {
      const coins = new List<ICoin>(data.data.data).OrderBy((x) => x.name).ToArray();

      setOptions(coins);
    }
  }, [data, open]);

  const handleChange = (option: any) => {
    nav(`/d/${option.name}`);
  };

  const [dialog, setDialog] = React.useState(false);

  return (
    <>
      {mode === 'button' && (
        <Chip label={label} avatar={<Avatar sx={{
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
        <Box sx={{ p: 1 }}>
          {data ? (
            <Autocomplete
              id="asynchronous-demo"
              sx={{
                width: '100%',
              }}
              size={'small'}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={'small'}
                  autoFocus
                  label={label ?? APIQuery.value.name ?? '搜索币种'}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              renderOption={(props, option, { inputValue }) => {
                const matches = match(option.name, inputValue);
                const parts = parse(option.name, matches);

                return (
                  <li {...props} onClick={() => handleChange(option)}>
                    <Box
                      justifyContent={'space-between'}
                      display={'flex'}
                      alignItems={'center'}
                      width={'100%'}
                    >
                      <Box>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{
                              fontWeight: part.highlight ? 700 : 400,
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </Box>

                      {(option.name === 'BTCUSDSHORTS' || option.name === 'BTCUSDLONGS') && (
                        <>
                          <Chip label={option.name === 'BTCUSDSHORTS' ? '空头持仓' : '多头持仓'} />
                        </>
                      )}
                    </Box>
                  </li>
                );
              }}
            />
          ) : (
            <Skeleton sx={{ width: '250px' }}>
              <OutlinedInput />
            </Skeleton>
          )}
        </Box>
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