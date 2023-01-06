// REACT
import React, { Fragment, useContext } from 'react';

// NEXT
import Image from 'next/image';

// CONTEXT STORE
import { globalContextStore } from '../context/context';

// MATERIAL UI
import { Typography } from '@mui/material';

// HEADLESS UI
import { Menu, Transition } from '@headlessui/react';

// ICONS
import { KeyboardArrowDown } from '@mui/icons-material';

// IMAGE
import ML_LOGO from '@/logos/ML_logo.png';

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

      <section className="flex items-center gap-5">
        <Image
          alt="ML Logo"
          src={ML_LOGO}
          width={40}
          height={40}
          className="rounded-full"
        />

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <Typography variant="h6" noWrap component="div" color={'black'}>
                {context} <KeyboardArrowDown />
              </Typography>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-2">
                <Menu.Item>
                  <button className="text-black w-full text-left hover:bg-neutral-100 duration-300 p-2 rounded">
                    Log out
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </section>
    </div>
  );
}

export default AppBarLayout;
