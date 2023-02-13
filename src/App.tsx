import {Box, Button, Paper, ThemeProvider, Tooltip, Typography} from '@mui/material';
import Toolbar from './Components/Layout/Toolbar';
import {theme} from "./Theme/Theme";
import {ArrowCircleRightOutlined, CurrencyBitcoinRounded, Favorite} from "@mui/icons-material";
import ChartImg from './assets/FireShot Capture 003.png'
import React from "react";
import {grey} from "@mui/material/colors";
import {useTranslation} from "react-i18next";
import {RecoilRoot, useRecoilState} from "recoil";
import {communityState} from "./Components/Community/Community";

interface ILayout {
    children: React.ReactNode
}

const Layout: React.FC<ILayout> = (props) => {
    return (
        <>
            <Toolbar/>
            {props.children}

            <Box mt={12} mb={2}>
                <Typography variant={"body1"} alignItems={'center'} display={'flex'}
                            sx={{
                                color: grey[500]
                            }}
                            justifyContent={"center"} gap={1}>
                    <Favorite/> by Fiapp.pro @ 2023
                </Typography>
            </Box>
        </>
    );
};

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

                <Button variant={"contained"} size={"large"} color={'primary'}
                        sx={theme => ({
                            mt: 4,
                            boxShadow: theme.shadows[6],
                        })}
                        onClick={() => setOpen(true)}
                        startIcon={<CurrencyBitcoinRounded/>}
                >
                    {t("立即免费使用")}
                </Button>
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
                        <Tooltip title={t("升级中，稍后再来查看")} arrow placement={"top"}>
                            <Button variant={"contained"} size={"large"}
                                    sx={{
                                        cursor: 'not-allowed',
                                        bgcolor: grey[600]
                                    }}
                                    endIcon={<ArrowCircleRightOutlined/>}>
                                {t("解锁高级图表")}
                            </Button>
                        </Tooltip>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}

function App() {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Box width={'90%'} margin={'0 auto'}>
                        <Home/>
                    </Box>
                </Layout>
            </ThemeProvider>
        </RecoilRoot>
    );
}

export default App;
