import { Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

interface INeedLogin {
  children?: React.ReactNode;
}

const NeedLogin: React.FC<INeedLogin> = (props) => {
  const nav = useNavigate();
  const user = useUser();
  const location = useLocation();
  return (
    <>
      {user.value.token ? props.children : (
        <Button variant={'contained'} onClick={() => nav(`/login?fiappRef=${location.pathname}`)} sx={{
          cursor: 'pointer',
        }}>登录后使用</Button>
      )}
    </>
  );
};

export default NeedLogin;