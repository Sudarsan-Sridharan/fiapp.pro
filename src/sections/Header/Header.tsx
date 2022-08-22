import React from 'react';
import {Link, useMatch} from 'react-router-dom';

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
    Typography
} from '@mui/material';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import useSidebar from '@/store/sidebar';
import {title} from "@/config";
import {PlainLink} from "@/components/styled";
import Asynchronous from "@/components/Search/Asynchronous";
import PopupState, {bindHover, bindMenu} from "material-ui-popup-state";
import {ArrowDropDown} from "@mui/icons-material";

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
            text: '选币系统（即将上线）',
            link: '#',
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

function Header() {
    const [isSidebarOpen] = useSidebar();

    const detail = useMatch('/d/:name');

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                open={isSidebarOpen}
                position="fixed"
                color="inherit"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(20px)',
                    height: '84px',
                    boxShadow: 'none',
                }}
            >
                <Box sx={{bgcolor: '#000', color: '#fff', textAlign: 'center'}}>
                    <Typography variant={'body1'}>架构升级中，服务暂不可用</Typography>
                </Box>
                <Toolbar sx={{justifyContent: 'space-between'}} disableGutters>
                    <List>
                        <ListItem
                            sx={{'& a': {'&:hover': {textDecoration: 'none', color: 'initial!important'}}}}
                        >
                            <PlainLink sx={{display: 'block'}}>
                                <ListItemText>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <img src={'/black-48dp/1x/outline_currency_bitcoin_black_48dp.png'}/>
                                        <Badge badgeContent={'alpha'}>
                                            <Typography
                                                component={Link}
                                                to={'/'}
                                                variant="h5"
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
                        <Box sx={{mr: 1}}>
                            <Asynchronous label={'搜索币种'} mode={"input"}/>
                        </Box>
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
                        <Stack direction={'row'} spacing={1}>
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
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
