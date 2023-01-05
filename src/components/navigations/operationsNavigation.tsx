import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { BarChart } from '@mui/icons-material';

import React from 'react';
import { useRouter } from 'next/router';
import { operations, transactions } from '@/src/data/staticData';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function OperationsNavigation({ open }: { open: boolean }) {
  const router = useRouter();
  return (
    <List>
      {operations.map((text, index) => (
        <ListItemButton
          key={index}
          sx={{
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
  );
}

export default OperationsNavigation;
