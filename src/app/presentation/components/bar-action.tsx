import { AppBar, Box, Toolbar as ToolbarMui } from '@mui/material'

type BarActionProps = {
  children?: React.ReactNode
}

export default function BarAction({ children }: BarActionProps) {
  return (
    <AppBar
      component='div'
      position='static'
      elevation={0}
      style={{
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <ToolbarMui
        style={{
          padding: 0,
          minHeight: 141,
          backgroundColor: 'white'
        }}
      >
        <Box
          style={{
            margin: '0 80px 0 77.59px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {children}
        </Box>
      </ToolbarMui>
    </AppBar>
  )
}
