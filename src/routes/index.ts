import { LoginOutlined } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
  },
  [Pages.login]: {
    component: asyncComponentLoader(() => import('@/pages/Login')),
    path: '/login',
    title: 'Login',
    icon: LoginOutlined,
  },
  [Pages.Signup]: {
    component: asyncComponentLoader(() => import('@/pages/Signup')),
    path: '/signup',
  },
  [Pages.Detail]: {
    component: asyncComponentLoader(() => import('@/pages/Detail')),
    path: '/d/:name',
  },
  [Pages.RiskWarning]: {
    component: asyncComponentLoader(() => import('@/pages/RiskWarning')),
    path: '/RiskWarning',
  },
  [Pages.TrendingChange]: {
    component: asyncComponentLoader(() => import('@/pages/TrendingChange')),
    path: '/TrendingChange',
  },
  [Pages.Volatility]: {
    component: asyncComponentLoader(() => import('@/pages/Volatility')),
    path: '/Volatility',
  },
  [Pages.Chart]: {
    component: asyncComponentLoader(() => import('@/pages/Chart')),
    path: '/chart/:coinName',
  },
  [Pages.Dashboard]: {
    component: asyncComponentLoader(() => import('@/pages/Dashboard')),
    path: '/dashboard',
  },
  [Pages.Signal]: {
    component: asyncComponentLoader(() => import('@/pages/Signal')),
    path: '/signal',
  },
  [Pages.Feature]: {
    component: asyncComponentLoader(() => import('@/pages/Feature')),
    path: '/feature',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
