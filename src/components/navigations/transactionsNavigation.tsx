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
import { transactions } from '@/src/data/staticData';

function TransactionsNavigation({ open }: { open: boolean }) {
  const router = useRouter();
  return (
    <List>
      {transactions.map((text, index) => (
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

export default TransactionsNavigation;
