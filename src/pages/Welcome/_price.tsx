import React from 'react';

import {Box, Chip, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography} from '@mui/material';
import {CheckOutlined} from "@mui/icons-material";

export const okxInventLink = 'https://www.ouyicn.art/join/5083273';

const price = [
    {
        title: '基础会员',
        subtitle: `使用我们的邀请码 5083273 注册 okx 并激活账户即可`,
        price: '0',
        items: ['1个交易信号', '趋势预警', '风险预警'],
    },
    {
        title: '高级会员（内测中，全部免费）',
        subtitle: '解锁 fiapp.pro 所有功能',
        price: (
            <>
                100
            </>
        ),
        items: ['8+个短中长线交易信号', '5个预警系统', '3个选币系统', '优先定制信号', '独家k线教学', 'VIP频道推送'],
    },
];

const Price = () => {
    return (
        <Stack spacing={2}>
            <Box textAlign={'center'}>
                <Typography variant={'h2'}>会员价格</Typography>
            </Box>
            <Grid container spacing={1} justifyContent={'center'}>
                {price.map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Box height={'100%'}>
                            <Paper variant={'elevation'} sx={{p: 2, height: '100%', opacity: 1}}>
                                <Box sx={{textAlign: 'center', width: '100%'}}>
                                    <Chip label={item.title} sx={{mt: -6}} color={index === 1 ? 'primary' : 'default'}/>
                                </Box>
                                <Stack spacing={1}>
                                    <Box display={'flex'} justifyContent={'center'}>
                                        <Typography variant={'subtitle1'} alignSelf={'start'}>$</Typography>
                                        <Typography variant={'h3'}>{item.price}</Typography>
                                        <Typography variant={'subtitle1'} alignSelf={'end'}>/月</Typography>
                                    </Box>

                                    <List dense>
                                        {item.items.map((t, k) => (
                                            <ListItem>
                                                <ListItemIcon><CheckOutlined fontSize={"small"}/></ListItemIcon>
                                                <ListItemText key={k} sx={{ml: -3}}>{t}</ListItemText>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Stack>
                            </Paper>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default Price;
