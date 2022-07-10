import React from 'react';

import { Box, Card, Divider, Link, Typography } from '@mui/material';

const InventStart = () => {
  return (
    <>
      <Typography variant={'h2'}>免费解锁更多功能</Typography>

      <Card sx={{ p: 2 }} variant={'outlined'}>
        <Typography variant={'h6'}>注册 okx 交易所账号</Typography>

        <Box>
          <Typography variant={'body2'}>
            打开官网
            <Link href={'https://www.okx.com/join/5083273'} sx={{ ml: '2px' }}>
              https://www.okx.art/join/5083273
            </Link>
            ，走正常注册账号流程，注册时填写邀请码：5083273。注册成功后，满足 okx 入金条件，即可
            成功激活 fiapp 交易大师的基础会员 （免费解锁众多功能）。
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant={'body2'}>
          老用户注意事项：
          <br />
          1、OK老账户继续用，留作出入金。
          <br />
          2、新账户用来交易，新账户不用身份认证也能交易。
          <br />
          3、新老账户资金互转用用内部转账即可，免手续费，秒到账。
        </Typography>
      </Card>

      <Card sx={{ p: 2 }} variant={'outlined'}>
        <Typography variant={'h6'}>激活 fiapp 基础会员</Typography>

        <Box>
          <Typography variant={'body2'}>
            在 fiapp.pro 交易大师官网后台（即将上线）中，填入你的 okx 账号，我们会自动帮你激活 fiapp
            基础会员。
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default InventStart;
