import { Box, Divider, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Link, Menu } from '~/app/presentation/components';
import { Toolbar } from '~/app/presentation/layouts/components';

type BaseLayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  const router = useRouter();
  function styleActiveTo(pathname: string[]) {
    const isIncluded = pathname.find(name => router.pathname === name);
    return isIncluded ? 'white' : '#8d9fbb';
  }
  return (
    <>
      <Toolbar>
        <Box
          style={{
            display: 'flex',
            margin: '0 80px 0 77.59px'
          }}
        >
          <Link
            style={{
              color: styleActiveTo(['/']),
              textDecoration: 'none'
            }}
            href='/'
          >
            Inicial
          </Link>
          <Link
            style={{
              color: styleActiveTo(['/forms']),
              textDecoration: 'none',
              marginLeft: 18
            }}
            href='/forms'
          >
            Formulários
          </Link>
          <Menu
            title='Violência Domestica'
            color={styleActiveTo(['/vdf', '/vdf/new'])}
          >
            <MenuItem>
              <Link style={{ textDecoration: 'none' }} href='/vdf/new'>
                Novo questionário
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Link style={{ textDecoration: 'none' }} href='/vdf'>
                Acompanhamento
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      {children}
    </>
  );
}
