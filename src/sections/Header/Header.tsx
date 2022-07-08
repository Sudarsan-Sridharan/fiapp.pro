import React from 'react';
import { Link, useMatch } from 'react-router-dom';

import { Badge, List, ListItem, ListItemText, Typography, styled } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { PlainLink } from '@/components/styled';
import { title } from '@/config';
import HeaderButtons, { HeaderButtonProps } from '@/sections/Header/_HeaderButtons';
import useSidebar from '@/store/sidebar';

const linkButtonData: HeaderButtonProps = {
  data: [],
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        open={isSidebarOpen}
        position="fixed"
        elevation={0}
        color="inherit"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
          <List>
            <ListItem>
              <PlainLink sx={{ display: 'block' }}>
                <ListItemText sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Badge badgeContent={'alpha'}>
                    <Typography
                      component={Link}
                      to={'/'}
                      variant="h4"
                      noWrap
                      sx={{
                        letterSpacing: 0,
                        width: '100%',
                        textDecoration: 'none',
                        '&:visited': {
                          color: 'inherit',
                        },
                      }}
                    >
                      {title} fiapp.pro {detail && `| ${detail?.params?.name}`}
                    </Typography>
                  </Badge>
                </ListItemText>
              </PlainLink>
            </ListItem>
          </List>

          <Box>
            <HeaderButtons {...linkButtonData} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
