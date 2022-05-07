import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { Link } from '~/app/presentation/components'
import { Toolbar } from '~/app/presentation/layouts/components'

type BaseLayoutProps = {
  children: React.ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const router = useRouter()

  function styleActiveTo(pathname: string[]) {
    const isIncluded = pathname.find((name) => router.pathname === name)
    return isIncluded ? 'white' : '#8d9fbb'
  }

  return (
    <>
      <Toolbar>
        <Box
          style={{
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
            Formulários
          </Link>
          <Link
            style={{
              color: styleActiveTo(['/forms']),
              textDecoration: 'none',
              marginLeft: 18
            }}
            href='/forms'
          >
            Gerenciar formulários
          </Link>
        </Box>
      </Toolbar>

      {children}
    </>
  )
}
