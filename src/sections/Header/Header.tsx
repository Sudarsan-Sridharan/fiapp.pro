import React from 'react';
import {Link, useMatch} from 'react-router-dom';

import {Badge, List, ListItem, ListItemText, styled, Toolbar, Typography} from '@mui/material';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {HeaderButtonProps} from '@/sections/Header/_HeaderButtons';
import useSidebar from '@/store/sidebar';
import {title} from "@/config";
import {PlainLink} from "@/components/styled";

const linkButtonData: HeaderButtonProps = {
    data: [],
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
                elevation={0}
                color="inherit"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(20px)',
                    height: '84px'
                }}
            >
                <Box sx={{bgcolor: '#000', color: '#fff', textAlign: 'center'}}>
                    <Typography variant={'body1'}>加入社区群获得第一时间的内测资格</Typography>
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

                    <Box>{/*<HeaderButtons {...linkButtonData} />*/}</Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
