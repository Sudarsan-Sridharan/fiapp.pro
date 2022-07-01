import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { LoginOutlined } from '@mui/icons-material';
import { Button, Link, Stack } from '@mui/material';

interface ButtonProp {
  icon: React.ReactElement;
  text: string;
  link: string;
}

export interface HeaderButtonProps {
  data: ButtonProp[];
}

const HeaderButtons: React.FC<HeaderButtonProps> = (props) => {
  return (
    <Stack spacing={1} direction={'row'} sx={{ mr: 1 }}>
      <Link component={RouterLink} to={'/login'}>
        <Button size={'small'} color={'inherit'} variant={'contained'} endIcon={<LoginOutlined />}>
          Login
        </Button>
      </Link>
      {props.data.map((item) => (
        <Button
          key={item.text}
          disableElevation
          size={'small'}
          color={'inherit'}
          endIcon={item.icon}
          href={item.link}
          target={'_blank'}
          variant={'contained'}
        >
          {item.text}
        </Button>
      ))}
    </Stack>
  );
};

export default HeaderButtons;