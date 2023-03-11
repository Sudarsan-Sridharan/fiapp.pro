import {useTranslation} from "react-i18next";
import {useRecoilState} from "recoil";
import {communityState} from "../Components/Community/Community";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import {ArrowCircleRightOutlined, CurrencyBitcoinRounded} from "@mui/icons-material";
import ChartImg from "../assets/11-3-2023_19351_fiapp.pro.jpeg";
import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    const {t} = useTranslation();
    const [open, setOpen] = useRecoilState(communityState)

    return (
        <Box mt={24}>
            <Box width={'80%'} margin={'0 auto'}>
                <Typography variant={'h1'} fontWeight={900} lineHeight={1.3}>
                    {t("轻松抓住")}<br/>
                    {t("所有标的市场")}<br/>
                    {t("量化交易系统")}<br/>
                </Typography>

                <Stack spacing={1} maxWidth={'800px'} direction={'row'} mt={4}>
                    <Button variant={"contained"} size={"large"} color={'primary'}
                            sx={theme => ({
                                boxShadow: theme.shadows[6],
                            })}
                            component={Link}
                            to={'/register'}
                            startIcon={<CurrencyBitcoinRounded/>}
                    >
                        {t("立即免费使用")}
                    </Button>
                    <Button variant={"outlined"} size={"large"} color={'primary'}
                            sx={theme => ({
                                boxShadow: theme.shadows[0],
                            })}
                            onClick={() => setOpen(true)}
                            endIcon={<ArrowCircleRightOutlined/>}
                    >
                        {t("获取免费的买卖信号")}
                    </Button>
                </Stack>
            </Box>
            <Box mt={12}>
                <Paper elevation={6} sx={{
                    backgroundImage: `url("${ChartImg}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '60vh',
                }}>
                    <Box sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backdropFilter: 'blur(3px)',
                    }}>
                        <Button variant={"contained"} size={"large"}
                                component={Link}
                                to={'/d/BTCUSDT'}
                                endIcon={<ArrowCircleRightOutlined/>}>
                            {t("解锁高级图表")}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default Home