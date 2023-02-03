import React, { useEffect } from 'react';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { domain } from '@/ network/fether';
import { useUser } from '@/hooks/useUser';
import Meta from '@/components/Meta';

interface ILoginFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const nav = useNavigate();
  const user = useUser();
  const [searchParams] = useSearchParams();
  const fiappRef = searchParams.get('fiappRef');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ILoginFormInput>();
  const onSubmit: SubmitHandler<ILoginFormInput> = data => axios.post(`${domain}/Authenticate/login`, data).then(res => {
    const token = res.data.token;
    user.login(token, { email: data.email });
  }).catch(err => console.log(err));

  useEffect(() => {
    if (user.value.token) {
      fiappRef ? nav(fiappRef) : nav('/dashboard');
    }
  }, [user.value.token, nav]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Meta title={'登录'} />

      <Box height={'60vh'}>
        <FullSizeCenteredFlexBox>
          <Card sx={{ width: '100%', maxWidth: '600px', p: 2 }} elevation={0}>
            <CardContent>
              <Stack spacing={1}>
                <TextField variant={'outlined'}
                           placeholder='邮箱' {...register('email', {
                  required: '邮箱不能为空',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: '邮箱格式不正确',
                  },
                })}
                           inputProps={{ type: 'email' }}
                           error={!!errors.email}
                           helperText={errors.email?.message}
                           fullWidth />

                <TextField variant={'outlined'}
                           placeholder='密码'  {...register('password', {
                  required: '密码不能为空',
                  maxLength: 20,
                })}
                           inputProps={{ type: 'password' }}
                           error={!!errors.password}
                           helperText={errors.password?.message}
                           fullWidth />
              </Stack>
            </CardContent>

            <CardActions sx={{ width: '100%' }}>
              <Stack spacing={1} direction={'row'}
                     sx={{ justifyContent: 'end', width: '100%', alignItems: 'center' }}>
                <Typography component={Link} to={'/signup'}
                            sx={{ textDecoration: 'none', color: 'inherit' }}>
                  没有账户？立即注册
                </Typography>
                <Button variant={'contained'} endIcon={<LoginOutlined />} type={'submit'}>登录</Button>
              </Stack>
            </CardActions>
          </Card>
        </FullSizeCenteredFlexBox>
      </Box>
    </form>
  );
};

export default Login;
