import {Stack, Typography} from "@mui/material";
import React from "react";

export const timeframe = ['30M', '1H', '4H', '1D']

const ChartToolbar = () => {
    return (
        <Stack direction={"row"} spacing={3}>
            <Typography variant={'body2'}>
                时间
            </Typography>

            {
                timeframe.map((item, index) => (
                    <Typography variant={'body2'} key={item + index}>
                        {item}
                    </Typography>
                ))
            }
        </Stack>
    )
}

export default ChartToolbar