import React, {Fragment} from 'react';
import {BrowserRouter, useMatch} from 'react-router-dom';

import {Box, styled, Toolbar} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import {withErrorHandler} from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import {sideBarWidth} from '@/sections/Sidebar/Sidebar';
import Header from "@/sections/Header";

const MainContent = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${sideBarWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const RouterPage = () => {
    const detailMatch = useMatch('/d/:name');
    return (
        <>
            <Header/>
            <Toolbar sx={{height: '90px'}}/>
            <Box sx={{display: 'flex'}}>
                <Box component="main" sx={{flexGrow: 1}}>
                    {/*<Toolbar />*/}
                    <MainContent>
                        <Pages/>
                    </MainContent>
                </Box>
            </Box>
        </>
    )
}

function App() {

    return (
        <Fragment>
            <CssBaseline/>
            <Notifications/>
            <HotKeys/>
            <SW/>
            <BrowserRouter>
                <RouterPage/>
            </BrowserRouter>

        </Fragment>
    );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
