import {Button, Stack, Typography} from "@mui/material";
import React from "react";
import useQuery from "../../Hooks/useQuery";
import {IQuery} from "../../Atoms/queryAtom";

export const timeframe: IQuery["timeframe"][] = ['30M', '1H', '4H', '1D']

const ChartToolbar = () => {
    const query = useQuery()
    return (
        <Stack direction={"row"} spacing={3} alignItems={'center'}>
            <Typography variant={'body2'}>
                时间
            </Typography>

            {
                timeframe.map((item, index) => (
                    <Button key={item + index} onClick={() => query.set({
                        ...query.get,
                        timeframe: item
                    })} size={"small"} variant={item === query.get.timeframe ? 'contained' : 'text'}>
                        <Typography variant={'body2'} sx={{
                            cursor: 'pointer'
                        }}>
                            {item}
                        </Typography>
                    </Button>
                ))
            }
        </Stack>
    )
}

export default ChartToolbar