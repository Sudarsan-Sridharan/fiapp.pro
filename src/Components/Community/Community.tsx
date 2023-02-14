import React from "react";
import {Box, Button, Dialog, Divider, Grow, Stack, Typography} from "@mui/material";
import {atom, useRecoilState} from "recoil";
import {useTranslation} from "react-i18next";
import {TransitionProps} from "@mui/material/transitions";

interface ICommunity {
    dialog: boolean
}

export const communityState = atom<boolean>({
    key: 'communityState',
    default: false,
})

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Grow ref={ref} {...props} />;
});

const Community: React.FC = () => {
    const [open, setOpen] = useRecoilState(communityState)
    const {t} = useTranslation()

    return (
        <Dialog open={open} onClose={() => setOpen(false)} TransitionComponent={Transition}>
            <Box p={5} py={10}>
                <Typography variant={"h4"} fontWeight={900}>
                    {t("加入社区获取免费实时的买卖信号")}
                </Typography>
                <Divider sx={{my: 2}}/>

                <Stack spacing={2}>
                    <Button variant={"contained"} size={"large"}
                            onClick={() => window.open('https://kook.top/14JUwd', '_black')}>
                        {t("Kook（国内用户推荐）")}
                    </Button>
                    <Button variant={"contained"} size={"large"}
                            onClick={() => window.open('https://discord.gg/HZD7uw5Hp9', '_black')}>
                        {t("Discord（海外用户推荐）")}
                    </Button>
                </Stack>
            </Box>
        </Dialog>
    )
}

export default Community