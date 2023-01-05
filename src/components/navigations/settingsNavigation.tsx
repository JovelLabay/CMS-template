import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { settings, transactions } from '@/src/data/staticData';
import {
  BarChart,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  Settings,
} from '@mui/icons-material';

function SettingsNavigation({ open }: { open: boolean }) {
  const [open2, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open2);
  };

  return (
    <List>
      <ListItemButton
        onClick={handleClick}
        sx={{
          color: 'white',
        }}
      >
        <ListItemIcon
          sx={{
            color: 'white',
          }}
        >
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
        {open2 ? <KeyboardArrowDown /> : <KeyboardArrowLeft />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {settings.map((text, index) => (
            <ListItemButton
              key={index}
              sx={{
                pl: 4,
                color: 'white',
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'white',
                }}
              >
                <BarChart />
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default SettingsNavigation;
