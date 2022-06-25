import { AppBar, Toolbar as ToolbarMui } from '@mui/material';

type ToolbarProps = {
  children?: React.ReactNode;
};

export default function Toolbar({ children }: ToolbarProps) {
  return (
    <>
      <AppBar
        position='static'
        elevation={0}
        style={{
          backgroundColor: '#153d77'
        }}
      >
        <ToolbarMui
          style={{
            padding: 0,
            minHeight: 44
          }}
        >
          {children}
        </ToolbarMui>
      </AppBar>
      <AppBar
        component='div'
        position='static'
        elevation={0}
        style={{
          backgroundColor: '#153d77'
        }}
      >
        <ToolbarMui
          style={{
            minHeight: 78,
            justifyContent: 'center'
          }}
        >
          <span
            style={{
              fontSize: 33,
              fontWeight: 400,
              fontStyle: 'normal',
              color: 'rgb(255, 255, 255)',
              textDecoration: 'none'
            }}
          >
            E
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 400,
              fontStyle: 'normal',
              color: 'rgb(255, 255, 255)',
              textDecoration: 'none'
            }}
          >
            form
          </span>
        </ToolbarMui>
      </AppBar>
    </>
  );
}
