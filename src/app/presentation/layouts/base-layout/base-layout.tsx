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
    return isIncluded ? 'white' : '#9D85C1'
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
            Questionários
          </Link>
          <Link
            style={{
              color: styleActiveTo(['/#', '/#/new', '/#/edit']),
              textDecoration: 'none',
              marginLeft: 18
            }}
            href='/#'
          >
            Gerenciar questionários
          </Link>
        </Box>
      </Toolbar>

      {children}
    </>
  )
}
