import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import useNotificationApi from '@/hooks/useNotificationApi';

const RequestSwitch = () => {
  const notice = useNotificationApi();
  return (
    <FormControlLabel disabled={notice.permission === undefined || notice.isDenied}
                      control={
                        <Switch
                          checked={notice.isGranted}
                          onChange={() => notice.requestPermission()}
                        />
                      }
                      label={(notice.permission === undefined || notice.isDenied) ? '已阻止通知，请在浏览器设置里面打开' : '开启通知'} />
  );
};

export default RequestSwitch;