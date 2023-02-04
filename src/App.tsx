import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, useMatch } from 'react-router-dom';

import { Box, Button, Stack, styled, Toolbar, Typography, useMediaQuery } from '@mui/material';
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
import SW from '@/sections/SW';
import { BrowserView, MobileView } from 'react-device-detect';

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

const PcComponents = () => {
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
      <SW />
      <BrowserRouter>
        <RouterPage />
      </BrowserRouter>

    </Fragment>
  );
};

const MobileComponents = () => {
  return (
    <>
      <Stack spacing={2}>
        <Typography>Fiapp.pro 手机端正在开发中，你可以加入以下频道获得我们的信号自动推送：</Typography>
        <Button variant='contained' color='primary' href='https://kook.top/14JUwd'
                target={'_blank'}>Kookapp（大陆用户推荐）</Button>
        <Button variant='contained' color='primary' href='https://discord.gg/HZD7uw5Hp9'
                target={'_blank'}>Discord（海外用户推荐）</Button>
      </Stack>
    </>
  );
};

function App() {
  return (
    <>
      <BrowserView>
        <PcComponents />
      </BrowserView>
      <MobileView>
        <MobileComponents />
      </MobileView>
    </>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
