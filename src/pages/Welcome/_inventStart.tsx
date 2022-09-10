import React from 'react';

import {Badge, Box, Grid, Paper, Typography} from '@mui/material';
import {PeopleOutlined} from "@mui/icons-material";
import {lightBlue} from "@mui/material/colors";

const startInfo = [
    {
        title: '注册账号',
        desc: '免费注册 fiapp.pro 账号，立刻开始你的量化交易之旅',
        bgcolor: '#5689f3'
    },
    {
        title: '使用量化程序',
        desc: '快速浏览实时量化交易提示，或者在专业版图表中直观查阅',
        bgcolor: lightBlue[500],
    },
    {
        title: '开始交易',
        desc: '根据 fiapp.pro 的量化信号，在交易所开始稳定赚取利润',
        bgcolor: '#3f3b7d'
    },
]

const InventStart = () => {
    return (
        <>
            <Paper variant={'outlined'} sx={{py: 6, px: 3}}>
                <Grid container spacing={4}>
                    {startInfo.map((item, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index} sx={{height: '100%'}}>
                            <Badge badgeContent={index + 1}
                                   color="secondary"
                                   anchorOrigin={{
                                       vertical: 'top',
                                       horizontal: 'left',
                                   }}>
                                <Box sx={{py: 3, px: 6, bgcolor: item.bgcolor, borderRadius: 2}}
                                     textAlign={'center'}>
                                    <PeopleOutlined sx={{color: '#fff', fontSize: '42px'}}/>
                                    <Typography variant={'h5'} sx={{color: '#fff'}}>{item.title}</Typography>
                                    <Typography variant={'subtitle2'} sx={{color: '#fff'}}>
                                        {item.desc}
                                    </Typography>
                                </Box>
                            </Badge>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/*<Typography variant={'h2'}>免费解锁更多功能</Typography>*/}

            {/*<Card sx={{p: 2}} variant={'outlined'}>*/}
            {/*    <Typography variant={'h6'}>注册 okx 交易所账号</Typography>*/}

            {/*    <Box>*/}
            {/*        <Typography variant={'body2'}>*/}
            {/*            打开官网*/}
            {/*            <Link target={'_blank'} href={'https://www.okx.com/join/5083273'} sx={{ml: '2px'}}>*/}
            {/*                https://www.okx.com/join/5083273*/}
            {/*            </Link>*/}
            {/*            ，走正常注册账号流程，注册时填写邀请码：5083273。注册成功后，满足 okx 入金条件，在 fiapp*/}
            {/*            后台绑定 okx 账户，即可成功激活 fiapp 交易大师的基础会员 （免费解锁众多功能）。*/}
            {/*        </Typography>*/}
            {/*    </Box>*/}

            {/*    <Divider sx={{my: 2}}/>*/}
            {/*    <Typography variant={'body2'}>*/}
            {/*        老用户注意事项：*/}
            {/*        <br/>*/}
            {/*        1、OK老账户继续用，留作出入金。*/}
            {/*        <br/>*/}
            {/*        2、新账户用来交易，新账户不用身份认证也能交易。*/}
            {/*        <br/>*/}
            {/*        3、新老账户资金互转用用内部转账即可，免手续费，秒到账。*/}
            {/*    </Typography>*/}
            {/*</Card>*/}

            {/*<Card sx={{p: 2}} variant={'outlined'}>*/}
            {/*    <Typography variant={'h6'}>激活 fiapp 基础会员</Typography>*/}

            {/*    <Box>*/}
            {/*        <Typography variant={'body2'}>*/}
            {/*            在 fiapp.pro 交易大师官网后台（即将上线）中，填入你的 okx 账号，我们会自动帮你激活 fiapp*/}
            {/*            基础会员。*/}
            {/*        </Typography>*/}
            {/*    </Box>*/}
            {/*</Card>*/}
        </>
    );
};

export default InventStart;
