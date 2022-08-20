import * as React from 'react';
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {useNavigate} from "react-router-dom";
import {Box, Button, Chip, Dialog, Divider, Typography} from "@mui/material";
import {List} from "linqts";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {Command} from "cmdk";
import './raycast.scss'

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

    const [dialog, setDialog] = React.useState(false)

    return (
        <>
            <Button variant={'outlined'} sx={{color: 'inherit'}} size={"small"}
                    onClick={() => setDialog(true)}>{props.label}</Button>

            <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth>
                <Box sx={{p: 1}}>
                    <Command label="Command Menu" className={'raycast'}>
                        <Command.Input autoFocus placeholder="搜索币种"/>
                        <Divider/>
                        <Command.List>
                            <Command.Group>
                                {data && data.data.map((item: { name: string, exchange: string }, index: React.Key | null | undefined) => {
                                    return (
                                        <Command.Item key={index} style={{width: '100%'}}
                                        >
                                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}
                                                 onClick={() => nav(`/d/${item.name}`)}>
                                                <Typography variant={"subtitle2"}>
                                                    {item.name}
                                                </Typography>

                                                <Box>
                                                    <Chip label={item.exchange} size={"small"}/>
                                                </Box>
                                            </Box>
                                        </Command.Item>
                                    )
                                })
                                }
                            </Command.Group>
                        </Command.List>
                    </Command>
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