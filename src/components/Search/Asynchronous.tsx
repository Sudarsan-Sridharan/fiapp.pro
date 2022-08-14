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
import {List} from "linqts";
import {useAPIQuery} from "@/hooks/useAPIQuery";

interface ICoin {
    name: string;
    exchange: string;
}

interface IAsynchronous {
    height?: number;
    mode?: 'link' | 'switch';
    label?: string;
}

const Asynchronous: React.FC<IAsynchronous> = (props) => {
    const {mode, label} = props
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly ICoin[]>([]);
    const APIQuery = useAPIQuery()
    const {data} = useSWR(`${domain}/Coin`, fetcher)

    const loading = open && options.length === 0;

    const nav = useNavigate()

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }

        if (data) {
            const coins = new List<ICoin>(data.data)
                .OrderBy(x => x.name)
                .ToArray()

            setOptions(coins)
        }

    }, [data, open]);

    const handleChange = (option: any) => {
        nav(`/d/${option.name}`)
    }

    return (
        <>
            {data ? (
                <Autocomplete
                    id="asynchronous-demo"
                    sx={{
                        maxWidth: 250, width: '100%',
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
                            label={label ?? (APIQuery.value.name ?? '搜索币种')}
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
                            <li {...props}
                                onClick={() => handleChange(option)}>
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
            ) : <Skeleton sx={{width: '250px'}}>
                <OutlinedInput/>
            </Skeleton>}
        </>
    );
}

export default Asynchronous;