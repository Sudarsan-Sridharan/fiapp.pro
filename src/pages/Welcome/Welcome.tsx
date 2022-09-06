import React from 'react';
import {Box, Button, Container, Divider, Grid, Stack, Typography,} from '@mui/material';
import {red} from '@mui/material/colors';
import Meta from '@/components/Meta';
import InventStart from '@/pages/Welcome/_inventStart';
import Price from '@/pages/Welcome/_price';
import ProductInfo from '@/pages/Welcome/_productInfo';
import AllTabTable from "@/components/Table/AllTab";
import Chart from "@/pages/Welcome/_chart";
import {Link} from "react-router-dom";
import {useUser} from "@/hooks/useUser";

const desc = [
    {number: '8+', desc: '个交易策略'},
    {number: '5+', desc: '个风险预警'},
    {number: '3+', desc: '个选币系统'},
    {number: '200+', desc: '个监控标的'},
];

function Welcome() {
    const user = useUser()
    return (
        <>
            <Meta title="量化交易系统"/>

            <Box py={10} sx={{background: 'linear-gradient(#f5f9fe, #fff)'}}>
                <Container maxWidth={'xl'}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography variant="h1">量化交易系统</Typography>
                                <Typography variant="subtitle1">
                                    轻松抓住市场上
                                    <Typography variant="subtitle1" component={'span'} color={red[500]}>
                                        所有标的
                                    </Typography>
                                    交易机会
                                </Typography>

                                {!user.value.token && (<Box>
                                    <Button
                                        component={Link}
                                        to={'/login'}
                                        size={'small'}
                                        color={'inherit'}
                                        variant={'contained'}
                                    >
                                        登录
                                    </Button>
                                </Box>)}
                            </Stack>
                        </Grid>

                        {/*<Grid item xs={12} md={6}>*/}
                        {/*    <Box>*/}
                        {/*        <MarketOverview/>*/}
                        {/*    </Box>*/}
                        {/*</Grid>*/}
                    </Grid>

                    {/*<Box sx={{my: 6}} display={'flex'} justifyContent={'space-between'}>*/}
                    {/*    {desc.map((item, index) => (*/}
                    {/*        <Typography variant="h3" key={index}>*/}
                    {/*            {item.number}*/}
                    {/*            <Typography component={'span'} variant={'body1'}>*/}
                    {/*                {item.desc}*/}
                    {/*            </Typography>*/}
                    {/*        </Typography>*/}
                    {/*    ))}*/}
                    {/*</Box>*/}

                    <Box mt={8}>
                        <Chart/>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth={'xl'} sx={{mt: 2, pb: 5}}>
                <Stack
                    spacing={2}
                >

                    <Box>
                        <AllTabTable/>
                    </Box>

                </Stack>
            </Container>

            <Container maxWidth={'xl'} sx={{pb: 5}}>
                <Stack spacing={2}>
                    <InventStart/>
                </Stack>
            </Container>

            <Box sx={{background: 'linear-gradient(to top, #f5f9fe, #fff)'}}>
                <Container maxWidth={'xl'} sx={{py: 10}}>
                    <Stack spacing={5}>
                        <ProductInfo/>

                        <Divider/>

                        <Price/>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Welcome;
