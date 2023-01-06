// REACT
import React, { ReactNode, useContext } from 'react';

// CONTEXT STORE
import { globalContextStore as Context } from '@/src/context/context';

// MATERIAL UI
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Box, Typography, Toolbar, IconButton } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Menu, ChevronLeft } from '@mui/icons-material';

// LAYOUTS
import TransactionNavigation from '@/src/components/navigations/transactionsNavigation';
import SettingsNavigation from '@/src/components/navigations/settingsNavigation';
import OperationsNavigation from '@/src/components/navigations/operationsNavigation';
import AppBarLayout from '@/src/layouts/appBarLayout';

const drawerWidth = 240;

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
  const globalContextStore = useContext(Context);
  const [open, setOpen] = React.useState(true);

  return (
    <Context.Provider value={'Jovel Labay'}>
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
              {open ? <ChevronLeft /> : <Menu />}
            </IconButton>

            {/* APP BAR */}
            <AppBarLayout open={open} />
          </Toolbar>
        </AppBar>

        {/* ROUTES COMPONENTS */}
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Typography variant="h6" noWrap component="div" color="white">
              ML Jewellers v1.0
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
    </Context.Provider>
  );

  // HANDLERS
  function togglerHanler() {
    setOpen(!open);
  }
}

export default NavigationLayout;
