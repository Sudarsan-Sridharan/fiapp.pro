import {Box, Button, Stack, styled, ToggleButtonGroup, Typography, useMediaQuery} from '@mui/material';
import {CurrencyBitcoinRounded, Paid} from '@mui/icons-material';
import {useTranslation} from "react-i18next";
import Community, {communityState} from "../Community/Community";
import {useSetRecoilState} from "recoil";
import {Link, useNavigate} from "react-router-dom";
import useUser from "../../Hooks/useUser";

const PointerTypography = styled(Typography)({
    cursor: 'pointer',
})

const TranslatingButtonGroup = () => {
    const {i18n} = useTranslation()
    return (
        <ToggleButtonGroup>
            {[['zh', '中文'], ['en', 'English']].map(([lang, text]) => (
                <Button variant={i18n.language === lang ? 'contained' : 'outlined'}
                        key={text}
                        color={'primary'}
                        onClick={() => i18n.changeLanguage(lang)}>
                    {text}
                </Button>
            ))}
        </ToggleButtonGroup>
    )
}

const LandingToolbar = () => {
    const {t} = useTranslation()
    const setOpen = useSetRecoilState(communityState)
    const isMobile = useMediaQuery((theme: any) => theme?.breakpoints.down('md'));
    const nav = useNavigate()
    const user = useUser()

    return (
        <Box sx={{
            position: 'fixed',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 100,
        }}>
            <Box sx={theme => ({
                backdropFilter: 'blur(40px)',
                boxShadow: theme.shadows[1],
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 4,
                py: 2,
            })}>
                {!isMobile && <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Paid sx={{
                        fontSize: 36,
                    }}/>
                    <PointerTypography variant={"h4"} onClick={() => nav('/')}>
                        Fiapp.pro
                    </PointerTypography>
                </Stack>}

                <Stack direction={"row"} alignItems={"center"} gap={4}>
                    <TranslatingButtonGroup/>

                    <PointerTypography variant={"h6"} onClick={() => setOpen(true)}>
                        {t("社区")}
                    </PointerTypography>

                    <PointerTypography variant={"h6"} onClick={() => nav('product')}>
                        {t("产品")}
                    </PointerTypography>

                    <Community/>

                    <PointerTypography variant={"h6"}
                                       onClick={() => window.open('https://twitter.com/fiapp_pro', '_black')}>
                        {t("Twitter")}
                    </PointerTypography>
                    {!isMobile && <Button variant={"contained"} size={"large"} color={'secondary'}
                                          startIcon={<CurrencyBitcoinRounded/>}
                                          component={Link}
                                          to={user.tryItFreeNowLink}>
                        {t("立即免费使用")}
                    </Button>}
                </Stack>
            </Box>
        </Box>
    );
};

export default LandingToolbar;