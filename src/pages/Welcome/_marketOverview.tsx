import {domain, fetcher} from "@/ network/fether";
import React from "react";
import useSWR from "swr";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {green, grey, red} from "@mui/material/colors";

const MarketOverview = () => {
    const {data: btcOverview} = useSWR(`${domain}/TrendingChange/overview?name=BTCUSDT`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    })

    return (
        <Stack spacing={2}>
            <Box>
                <Typography variant={"h4"}>
                    BTC 概况
                </Typography>

                {btcOverview && (
                    <Stack spacing={2}>
                        <Stack spacing={1} direction={'row'}>
                            <Typography variant={"subtitle1"} sx={{color: green[500]}}>
                                {btcOverview.detail.coinLong[0] ?? 0} 多头
                            </Typography>
                            <Typography variant={"subtitle1"} sx={{color: red[500]}}>
                                {btcOverview.detail.coinShort[0] ?? 0} 空头
                            </Typography>
                        </Stack>

                        <Stack spacing={2} direction={"row"}>
                            {btcOverview.detail?.coin?.map((item: { time_frame: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; risk: number; current_trending: number; }, index: React.Key | null | undefined) => (
                                <Box key={index}>
                                    <Typography variant={"subtitle1"}>
                                        {item.time_frame} - 可靠度 {6 - item.risk}
                                    </Typography>
                                    <Divider sx={{my: 1, borderColor: grey[500]}}/>
                                    <Typography variant={"subtitle1"}>
                                        {item.current_trending === -1 ? "空头" : item.current_trending === 1 ? "多头" : "中立"}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                )}
            </Box>

            <Box>
                <Typography variant={"h4"}>
                    市场概况
                </Typography>

                {btcOverview && (
                    <Stack spacing={1} direction={'row'}>
                        <Typography variant={"subtitle1"} sx={{color: green[500]}}>
                            {btcOverview.analysis.allLong} 多头
                        </Typography>
                        <Typography variant={"subtitle1"} sx={{color: red[500]}}>
                            {btcOverview.analysis.allShort} 空头
                        </Typography>
                    </Stack>
                )}
            </Box>
        </Stack>

    )
}

export default MarketOverview