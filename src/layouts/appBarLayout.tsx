// REACT
import React, { useContext } from 'react';

// CONTEXT STORE
import { globalContextStore } from '../context/context';

// MATERIAL UI
import { Typography } from '@mui/material';

function AppBarLayout({ open }: { open: boolean }) {
  const context = useContext(globalContextStore);

  return (
    <div className="flex w-full justify-between items-center">
      <div>
        {!open && (
          <Typography variant="h6" noWrap component="div" color={'black'}>
            ML Loans Platform v2.0
          </Typography>
        )}
      </div>
      <Typography variant="h6" noWrap component="div" color={'black'}>
        {context}
      </Typography>
    </div>
  );
}

export default AppBarLayout;
