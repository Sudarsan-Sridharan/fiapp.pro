import React from 'react';
import {Link, useMatch, useNavigate} from 'react-router-dom';

import {
    Badge,
    Button,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    styled,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import useSidebar from '@/store/sidebar';
import {title} from "@/config";
import {PlainLink} from "@/components/styled";
import Asynchronous from "@/components/Search/Asynchronous";
import PopupState, {bindHover, bindMenu} from "material-ui-popup-state";
import {ArrowDropDown} from "@mui/icons-material";
import {useWhaleWarningAPI} from "@/api/useWhaleWarningAPI";
import {timejs} from "@/utils/time";
import {useUser} from "@/hooks/useUser";

const linkButtonData = {
    data: [
        {
            text: '趋势转换',
            link: '/TrendingChange',
        },
        {
            text: '风险预警',
            link: '/RiskWarning',
        },
        {
            text: '动量检测',
            link: '/Volatility',
        },
        {
            text: '选币系统（即将上线）',
            link: '#',
        },
    ],
};

const communityButtonData = {
    data: [
        {
            text: 'Discord 群',
            link: 'https://discord.gg/HZD7uw5Hp9',
        },
        {
            text: ' QQ 群',
            link: 'https://jq.qq.com/?_wv=1027&k=ThQbfwPX',
        },
    ],
};

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const AlertBar = () => {
    const {whaleWarningData} = useWhaleWarningAPI(1)

    const nav = useNavigate()

    return (
        <>
            {whaleWarningData && whaleWarningData.data.length > 0 && (
                // <>
                //     {timejs(whaleWarningData[0].open_time).isAfter(timejs().subtract(30, 'minutes')) && (
                //
                //     )}
                // </>

                <Box sx={{bgcolor: '#000', color: '#fff', textAlign: 'center', cursor: 'pointer'}}
                     onClick={() => nav(`/d/${whaleWarningData.data[0].name}`)}>
                    <Typography variant={'body1'}>
                        {timejs(new Date(whaleWarningData.data[0].open_time).toLocaleString()).fromNow()} - {whaleWarningData.data[0].name === 'BTCUSDSHORTS' ? '空头' : '多头'}
                        {" "}-
                        持仓量 {whaleWarningData.data[0].value > 0 ? '增加' : '减少'} {((whaleWarningData.data[0].value) * 100).toFixed(2)}%
                    </Typography>
                </Box>
            )}
        </>
    )
}

function Header() {
    const [isSidebarOpen] = useSidebar();

    const detail = useMatch('/d/:name');
    const mdBreakDown = useMediaQuery((theme: any) => theme?.breakpoints.down('md'))
    const user = useUser()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                open={isSidebarOpen}
                position="fixed"
                color="inherit"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(20px)',
                    boxShadow: 'none',
                }}
            >
                <AlertBar/>
                <Toolbar sx={{justifyContent: 'space-between'}} disableGutters>
                    <List>
                        <ListItem
                            sx={{'& a': {'&:hover': {textDecoration: 'none', color: 'initial!important'}}}}
                        >
                            <PlainLink sx={{display: 'block'}}>
                                <ListItemText>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <img src={'/black-48dp/1x/outline_currency_bitcoin_black_48dp.png'} style={{
                                            display: mdBreakDown ? 'none' : 'block',
                                        }}/>
                                        <Badge badgeContent={'alpha'}>
                                            <Typography
                                                component={Link}
                                                to={'/'}
                                                variant={mdBreakDown ? 'subtitle2' : 'h5'}
                                                noWrap
                                                sx={{
                                                    letterSpacing: 0,
                                                    textDecoration: 'none',
                                                    '&:visited': {
                                                        color: 'inherit',
                                                    },
                                                    mr: 1,
                                                }}
                                            >
                                                {title} fiapp.pro
                                            </Typography>
                                        </Badge>
                                        {/*<Typography variant="subtitle2" noWrap>*/}
                                        {/*    {detail && `${detail?.params?.name}`}*/}
                                        {/*</Typography>*/}
                                    </Box>
                                </ListItemText>
                            </PlainLink>
                        </ListItem>
                    </List>

                    <Box display={'flex'} alignItems={'center'}>
                        {!mdBreakDown && (
                            <Box sx={{mr: 1}}>
                                <Asynchronous label={'搜索币种'} mode={"input"}/>
                            </Box>
                        )}
                        <PopupState variant="popover" popupId="productMenu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button color={'inherit'}
                                            variant={'contained'} size={"small"} {...bindHover(popupState)}
                                            endIcon={<ArrowDropDown/>}>
                                        量化产品
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        {linkButtonData.data.map((item, index) => (
                                            <Box key={index} sx={{
                                                textDecoration: 'none',
                                                color: 'inherit'
                                            }} component={Link} to={`${item.link}`}>
                                                <MenuItem onClick={popupState.close} sx={{
                                                    height: '30px'
                                                }}>
                                                    <Typography variant={'body2'}>
                                                        {
                                                            item.text
                                                        }
                                                    </Typography>
                                                </MenuItem>
                                            </Box>
                                        ))}
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </Box>

                    <Box mr={1}>
                        {!mdBreakDown ? (<Stack direction={'row'} spacing={1}>
                            <Button
                                target={'_blank'}
                                href={'https://jq.qq.com/?_wv=1027&k=ThQbfwPX'}
                                size={'small'}
                                color={'inherit'}
                                variant={'contained'}
                            >
                                QQ 群
                            </Button>
                            <Button
                                target={'_blank'}
                                href={'https://discord.gg/HZD7uw5Hp9'}
                                size={'small'}
                                color={'inherit'}
                                variant={'contained'}
                            >
                                Discord 群
                            </Button>

                            {user.value.token ? (
                                <PopupState variant={'popover'} popupId={'userMenu'}>
                                    {(popupState) => (
                                        <>
                                            <Button size={'small'}
                                                    color={'inherit'}
                                                    endIcon={<ArrowDropDown/>}
                                                    {...bindHover(popupState)}
                                                    variant={'contained'}>
                                                {user.value.info?.email}
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={() => {
                                                    user.logout()
                                                    popupState.close()
                                                }} sx={{maxHeight: '30px'}}>
                                                    <Typography variant={'body2'}>
                                                        退出
                                                    </Typography>
                                                </MenuItem>
                                            </Menu>
                                        </>
                                    )}
                                </PopupState>

                            ) : (
                                <Button
                                    component={Link}
                                    to={'/login'}
                                    size={'small'}
                                    color={'inherit'}
                                    variant={'contained'}
                                >
                                    登录
                                </Button>
                            )}
                        </Stack>) : (
                            <PopupState variant="popover" popupId="communityMenu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <Button color={'inherit'}
                                                variant={'contained'} size={"small"} {...bindHover(popupState)}
                                                endIcon={<ArrowDropDown/>}>
                                            加入社区
                                        </Button>
                                        <Menu {...bindMenu(popupState)}>
                                            {communityButtonData.data.map((item, index) => (
                                                <Box key={index} sx={{
                                                    textDecoration: 'none',
                                                    color: 'inherit'
                                                }}>
                                                    <Button href={`${item.link}`} target={'_blank'} size={"small"}
                                                            color={"inherit"}>
                                                        <MenuItem onClick={popupState.close} sx={{
                                                            maxHeight: '30px'
                                                        }}>
                                                            <Typography variant={'body2'}>
                                                                {
                                                                    item.text
                                                                }
                                                            </Typography>
                                                        </MenuItem>
                                                    </Button>

                                                </Box>
                                            ))}
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
