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
import { BarChart } from '@mui/icons-material';

function SettingsNavigation({ open }: { open: boolean }) {
  const [open2, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open2);
  };
  return (
    <List>
      {transactions.map((text, index) => (
        <ListItemButton key={index}>
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItemButton>
      ))}

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open2 ? <BarChart /> : <BarChart />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default SettingsNavigation;
