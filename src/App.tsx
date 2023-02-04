import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, useMatch } from 'react-router-dom';

import { Box, styled, Toolbar, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import { sideBarWidth } from '@/sections/Sidebar/Sidebar';
import Header from '@/sections/Header';
import './App.css';
import { useUser } from '@/hooks/useUser';
import useNotificationApi from '@/hooks/useNotificationApi';
import noticeSound from './assets/sound/notice.mp4';


const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
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
  const mdBreakDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const user = useUser();

  useEffect(() => {
    user.me();
  }, []);

  const isChartPage = useMatch('/chart/:coinName');


  return (
    <>
      {(!detailMatch && !isChartPage) ? (
        <>
          <Header />
          <Toolbar sx={{ height: mdBreakDown ? 'auto' : '88px' }} />
        </>
      ) : <></>}

      <Box sx={{ display: 'flex' }}>
        <Box component='main' sx={{ flexGrow: 1 }}>
          {/*<Toolbar />*/}
          <MainContent>
            <Pages />
          </MainContent>
        </Box>
      </Box>
    </>
  );
};

function App() {
  const notice = useNotificationApi();
  useEffect(() => {
    if (notice.isGranted && localStorage.getItem('notice') !== 'true') {
      const sound: HTMLAudioElement = new Audio();
      sound.src = noticeSound;
      sound.load();
      sound.play().then(() => {
        console.log('play sound');
      });
      notice.pushNotification('买卖信号通知已开启。', {
        body: '等待接收实时推送，请不要关闭浏览器窗口。',
      }, '/signal');

      localStorage.setItem('notice', 'true');
    }
  }, [notice]);

  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      <HotKeys />
      <BrowserRouter>
        <RouterPage />
      </BrowserRouter>

    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
