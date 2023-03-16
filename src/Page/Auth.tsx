import {Box, Card, Container, LinearProgress, Stack, TextField, Typography, useMediaQuery} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {grey} from "@mui/material/colors";
import SignSvg from "../assets/Bitcoin _Flatline.svg";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import React, {Suspense, useState} from "react";
import {LoadingButton} from "@mui/lab";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {useUser} from "../Hooks/useUser";
import {IAuthType} from "../API/userAPI";

export const Login = () => {
    return (
        <AuthLayout img={SignSvg} type={"login"}/>
    )
}

interface IRegister {
    username?: string;
    password: string;
    email: string;
    "g-recaptcha-response": string
}

interface IAuthLayout {
    img: string;
    type: IAuthType
}

const AuthLayout: React.FC<IAuthLayout> = (props) => {
    const {t} = useTranslation()
    const isMobile = useMediaQuery((theme: any) => theme?.breakpoints.down('md'));
    const isRegister = props.type === 'register'
    const nav = useNavigate()
    const {register, handleSubmit, watch, formState: {errors}} = useForm<IRegister>();
    const [token, setToken] = useState<string | null>(null);
    const {i18n} = useTranslation()
    const user = useUser()
    const onSubmit: SubmitHandler<IRegister> = async (data) => {
        if (token) {
            data["g-recaptcha-response"] = token
            await user.auth(data, props.type)
        }
    };

    const handleVerificationSuccess = (token: string, ekey: string) => {
        setToken(token)
    }

    return (
        <>
            <Box alignItems={'center'} justifyContent={'center'} display={'flex'} width={'100%'}
                 sx={{
                     minHeight: 'calc(100vh - 250px)',
                     mt: '150px'
                 }}>
                <Grid2 container width={'100%'} alignItems={'center'}>
                    {!isMobile && <Grid2 md={5} xs={12} textAlign={'center'}>
                        <img src={props.img} width={'80%'}/>
                    </Grid2>}

                    <Grid2 md={7} xs={12}>
                        <Container maxWidth={"sm"}>
                            <Stack spacing={1}>
                                <Typography variant={"body2"} sx={{
                                    color: grey[500]
                                }}>
                                    {t(isRegister ? "创建账户" : "登录账户")}
                                </Typography>
                                <Typography variant={"h5"}>
                                    {t((`${isRegister ? "注册" : "登录"} Fiapp.pro 会员`))}
                                </Typography>
                                <Typography variant={"body2"} sx={{
                                    color: grey[500]
                                }}>
                                    {isRegister && t("现在注册立即获得 30 天免费试用")}
                                </Typography>

                                {
                                    user.isLogin && <Card onClick={() => nav('/d/BTCUSDT')} sx={{
                                        p: 2,
                                        cursor: 'pointer'
                                    }}>
                                        <Typography variant={"body2"} sx={{
                                            color: grey[500]
                                        }}>
                                            {t("您已经登录账户")} {user.get?.data?.userInfo?.username}
                                        </Typography>
                                    </Card>
                                }
                            </Stack>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={4} mt={6}>
                                    {isRegister && <TextField label={t("用户名")}
                                                              {...register('username', {
                                                                  required: `${t("用户名不能为空")}`,
                                                                  maxLength: {
                                                                      value: 20,
                                                                      message: `${t("用户名不能超过20个字符")}`
                                                                  }
                                                              })}
                                                              error={!!errors.username}
                                                              helperText={errors.username?.message}/>}
                                    <TextField label={t("邮箱")} type={'email'}
                                               {...register('email', {required: `${t("邮箱不能为空")}`})}
                                               error={!!errors.email}
                                               helperText={errors.email?.message}/>
                                    <TextField label={t("密码")}
                                               type={'password'} {...register('password', {required: `${t("密码不能为空")}`})}
                                               error={!!errors.password}
                                               helperText={errors.password?.message}/>

                                    <HCaptcha
                                        sitekey="0bad7e17-32a8-4c71-a26a-01be54426ef3"
                                        onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
                                        languageOverride={i18n.language}
                                    />

                                    <LoadingButton disabled={!token} loading={user.isLoading} variant={"contained"}
                                                   type={"submit"} fullWidth
                                                   sx={{
                                                       height: '56px'
                                                   }}>
                                        {t(`${isRegister ? "创建账户" : "登录账户"}`)}
                                    </LoadingButton>

                                    <Typography variant={"body2"} sx={{
                                        color: grey[500],
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }} onClick={() => nav(isRegister ? '/login' : '/register')}>
                                        {t(isRegister ? "已有账户？登录" : "没有账户？注册")}
                                    </Typography>
                                </Stack>
                            </form>
                        </Container>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    )
}

export const Register = () => {
    return (
        <Suspense fallback={<LinearProgress/>}>
            <AuthLayout type={'register'} img={SignSvg}/>
        </Suspense>
    )
}