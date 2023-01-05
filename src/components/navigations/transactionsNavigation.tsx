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
        <ListItem
          key={text.id}
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => router.push('/operations/route')}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              color: 'white',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              {index % 2 === 0 ? <BarChart /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default TransactionsNavigation;
