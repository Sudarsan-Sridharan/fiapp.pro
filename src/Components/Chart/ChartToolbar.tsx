import {Stack, Typography} from "@mui/material";
import React from "react";
import useQuery from "../../Hooks/useQuery";
import {IQuery} from "../../Atoms/queryAtom";

export const timeframe: IQuery["timeframe"][] = ['30M', '1H', '4H', '1D']

const ChartToolbar = () => {
    const query = useQuery()
    return (
        <Stack direction={"row"} spacing={3}>
            <Typography variant={'body2'}>
                时间
            </Typography>

            {
                timeframe.map((item, index) => (
                    <Typography variant={'body2'} key={item + index} sx={{
                        cursor: 'pointer'
                    }} onClick={() => query.set({
                        ...query.get,
                        timeframe: item
                    })}>
                        {item}
                    </Typography>
                ))
            }
        </Stack>
    )
}

export default ChartToolbar