import React from 'react';

import { Button, Stack } from '@mui/material';

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
      <Button
        target={'_blank'}
        href={'https://jq.qq.com/?_wv=1027&k=ThQbfwPX'}
        size={'small'}
        color={'inherit'}
        variant={'contained'}
      >
        QQ 群
      </Button>
      <Button
        target={'_blank'}
        href={'https://discord.gg/HZD7uw5Hp9'}
        size={'small'}
        color={'inherit'}
        variant={'contained'}
      >
        Discord 群
      </Button>
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
