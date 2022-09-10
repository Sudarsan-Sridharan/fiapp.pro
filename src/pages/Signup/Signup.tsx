import {FullSizeCenteredFlexBox} from "@/components/styled";
import {Box, Button, Card, CardActions, CardContent, Stack, TextField, Typography} from "@mui/material";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {SignpostOutlined} from "@mui/icons-material";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {domain} from "@/ network/fether";
import axios from "axios";
import {useUser} from "@/hooks/useUser";

interface ISignFormInput {
    email: string;
    password: string;
    username: string;
}

const Signup = () => {
    const nav = useNavigate()
    const user = useUser()
    const {register, handleSubmit, watch, formState: {errors}} = useForm<ISignFormInput>();
    const onSubmit: SubmitHandler<ISignFormInput> = data => axios.post(`${domain}/Authenticate/register`, data).then(res => {
        const token = res.data.token
        user.login(token, {email: data.email})
    }).catch(err => console.log(err))

    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email")
    register("email", {value: email ?? ''})

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box height={'60vh'}>
                <FullSizeCenteredFlexBox>
                    <Card sx={{width: '100%', maxWidth: '600px', p: 2}} elevation={0}>
                        <CardContent>
                            <Stack spacing={1}>
                                <TextField
                                    variant={'outlined'}
                                    helperText={errors.username?.message}
                                    placeholder="用户名"
                                    error={!!errors.username}
                                    {...register("username", {
                                        required: '用户名不能为空',
                                        maxLength: 20
                                    })}
                                    fullWidth/>
                                <TextField variant={'outlined'}
                                           placeholder="邮箱" {...register("email", {
                                    required: '邮箱不能为空',
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: '邮箱格式不正确'
                                    }
                                })}
                                           error={!!errors.email}
                                           helperText={errors.email?.message}
                                           fullWidth/>
                                <TextField variant={'outlined'}
                                           placeholder="密码"  {...register("password", {
                                    required: '密码不能为空',
                                    maxLength: 20
                                })}
                                           error={!!errors.password}
                                           helperText={errors.password?.message}
                                           fullWidth/>
                            </Stack>
                        </CardContent>

                        <CardActions sx={{width: '100%'}}>
                            <Stack spacing={1} direction={'row'}
                                   sx={{justifyContent: 'end', width: '100%', alignItems: 'center'}}>
                                <Typography component={Link} to={'/login'}
                                            sx={{textDecoration: 'none', color: 'inherit'}}>
                                    已有账户？立即登录
                                </Typography>
                                <Button variant={'contained'} endIcon={<SignpostOutlined/>}
                                        type={'submit'}>注册</Button>
                            </Stack>
                        </CardActions>
                    </Card>
                </FullSizeCenteredFlexBox>
            </Box>
        </form>
    )
}

export default Signup