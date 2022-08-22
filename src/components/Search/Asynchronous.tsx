import * as React from 'react';
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {useNavigate} from "react-router-dom";
import {Autocomplete, Box, Button, CircularProgress, Dialog, OutlinedInput, Skeleton, TextField} from "@mui/material";
import {List} from "linqts";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import './raycast.scss'
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

interface ICoin {
    name: string;
    exchange: string;
}

interface IAsynchronous {
    height?: number;
    mode?: 'input' | 'button';
    label?: string;
}


const Asynchronous: React.FC<IAsynchronous> = (props) => {
    let {mode} = props
    const {label} = props
    mode = mode || 'button'
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

    const [dialog, setDialog] = React.useState(false)

    return (
        <>
            {mode === 'button' && (<Button variant={'outlined'} sx={{color: 'inherit'}} size={"small"}
                                           onClick={() => setDialog(true)}>{props.label}</Button>)
            }

            {mode === 'input' && (
                <OutlinedInput readOnly sx={{height: '30px'}} size={"small"} placeholder={'搜索币种'}
                               onClick={() => setDialog(true)}/>
            )}
            <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth>
                <Box sx={{p: 1}}>
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
}

export default Asynchronous;