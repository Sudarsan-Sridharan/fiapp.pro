import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {useNavigate} from "react-router-dom";
import {OutlinedInput, Skeleton} from "@mui/material";

interface Film {
    name: string;
    exchange: string;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly Film[]>([]);

    const {data} = useSWR(`${domain}/Coin`, fetcher)

    const loading = open && options.length === 0;


    const nav = useNavigate()

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }

        if (data) {
            setOptions([...data.data])
        }

    }, [data, open]);

    return (
        <>
            {data ? (
                <Autocomplete
                    id="asynchronous-demo"
                    sx={{width: 300}}
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
                            label="搜索币种"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                    renderOption={(props, option, {inputValue}) => {
                        const matches = match(option.name, inputValue);
                        const parts = parse(option.name, matches);


                        return (
                            <li {...props} onClick={() => nav(`/d/${option.name}`)}>
                                <div>
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
                                </div>
                            </li>
                        );
                    }}
                />
            ) : <Skeleton sx={{width: '300px'}}>
                <OutlinedInput/>
            </Skeleton>}
        </>
    );
}
