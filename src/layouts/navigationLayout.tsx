import React, { ReactNode } from 'react';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import TransactionNavigation from '@/src/components/navigations/transactionsNavigation';
import SettingsNavigation from '@/src/components/navigations/settingsNavigation';
import OperationsNavigation from '@/src/components/navigations/operationsNavigation';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: '#C01F0E',
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: '#C01F0E',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: '#fff',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function NavigationLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f6f6f6' }}>
      {/* APP BAR CONTAINER */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              marginRight: 5,
              color: 'black',
            }}
            onClick={togglerHanler}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          {!open && (
            <Typography variant="h6" noWrap component="div" color={'black'}>
              ML Loans Platform v2.0
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* ROUTES COMPONENTS */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div" color="white">
            ML Loans Platform v2.0
          </Typography>
        </DrawerHeader>
        <TransactionNavigation open={open} />
        <OperationsNavigation open={open} />
        <SettingsNavigation open={open} />
      </Drawer>

      {/* MAIN CONTENTS */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );

  // HANDLERS
  function togglerHanler() {
    setOpen(!open);
  }
}

export default NavigationLayout;
