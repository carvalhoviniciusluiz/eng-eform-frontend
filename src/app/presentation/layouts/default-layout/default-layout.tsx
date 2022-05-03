import { Box } from '@mui/material'
import React from 'react'
import { Toolbar } from '~/app/presentation/layouts/components'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Box>
      <Toolbar />

      <Box
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          style={{
            width: 452,
            marginTop: 104
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
