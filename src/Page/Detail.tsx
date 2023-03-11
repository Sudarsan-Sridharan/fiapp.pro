import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Divider,
    OutlinedInput,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {grey} from "@mui/material/colors";
import {MenuOutlined, SearchOutlined} from "@mui/icons-material";
import {coinAPI, coinListAPI} from "../API/coinAPI";
import Chart from "../Components/Chart/Chart";
import {Link, useNavigate, useParams} from "react-router-dom";
import ChartToolbar from "../Components/Chart/ChartToolbar";

const StyledPaper = styled(Paper)({
    padding: '16px',
});

interface IToolbarData {
    title: string,
    value: string,
}

const Toolbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const {name} = useParams()
    const metaInfo = coinAPI({
        name: name ?? 'BTCUSDT',
        timeframe: '30M'
    })

    const toolbarData = metaInfo && [
        {
            title: metaInfo.name,
            desc: '合约(30M)'
        },
        {
            title: '价格',
            desc: metaInfo.price
        },
        {
            title: '最高价',
            desc: metaInfo.latestKline.highest_bid
        },
        {
            title: '最低价',
            desc: metaInfo.latestKline.lowest_bid
        },
        {
            title: '交易量(BTC)',
            desc: metaInfo.latestKline.volume_bid
        },
        {
            title: '交易量(USDT)',
            desc: metaInfo.latestKline.volume_bid * metaInfo.latestKline.open_bid
        }
    ];

    return (
        !isMobile ?
            (<StyledPaper sx={{
                minHeight: '50px'
            }}>
                <Grid2 container>
                    {toolbarData && toolbarData.map((item, index) => (
                        <Grid2 xs={"auto"} md={2}>
                            <Typography variant={'subtitle1'}>
                                {item.title}
                            </Typography>
                            <Typography variant={'body2'}>
                                {item.desc}
                            </Typography>
                        </Grid2>
                    ))}
                </Grid2>
            </StyledPaper>)
            : <></>
    )
}

const leftBarFilterData = [
    "市场", "热门", "流动性", "波动率", "新趋势", "波动预警", "买卖信号"
]

const containerMaxHeight = 'calc(100vh - 300px)'

const LeftBar = () => {
    const coinList = coinListAPI()
    const nav = useNavigate()
    return (
        <StyledPaper>
            <Stack spacing={2}>
                <OutlinedInput size={'small'}
                               fullWidth
                               startAdornment={<SearchOutlined/>}
                               placeholder={'搜索交易对'}
                               sx={{
                                   borderRadius: 10,
                                   bgcolor: grey[100],
                                   '& .MuiOutlinedInput-notchedOutline': {
                                       borderWidth: 0
                                   }
                               }}/>

                <Grid2 container alignItems={'center'} justifyContent={"space-between"}>
                    {leftBarFilterData.map((item, index) => (
                        index < 4 &&
                        <Grid2 xs={"auto"} md={2} key={item + index}>
                            <Typography variant={'body2'} key={item + index} sx={{
                                minWidth: '60px',
                                minHeight: '24px'
                            }}>
                                {item}
                            </Typography>
                        </Grid2>
                    ))}
                    <Grid2 xs={'auto'} justifySelf={'end'} alignSelf={'center'}>
                        <MenuOutlined/>
                    </Grid2>
                </Grid2>
                <Box sx={{
                    '& :hover': {
                        overflowY: 'scroll'
                    }
                }}>
                    <Divider/>
                    <TableContainer component={"div"} sx={{
                        overflowY: 'hidden',
                        maxHeight: containerMaxHeight,

                    }}>
                        <Table sx={{
                            maxWidth: '100%',
                            '& .MuiTableCell-root': {
                                pl: 0,
                            },
                        }} size={'small'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>标的</TableCell>
                                    <TableCell align="left">最新价</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    coinList && coinList.map((item, index) => (
                                        <TableRow
                                            key={item.name}
                                            sx={{
                                                '&:last-child td, &:last-child th': {border: 0},
                                                '& :hover': {
                                                    cursor: 'pointer'
                                                }
                                            }}
                                            onClick={() => nav(`/d/${item.name}`)}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link to={`/d/${item.name}`} style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit'
                                                }}>
                                                    {
                                                        // split the BTCUSDT to BTC/USDT
                                                        item.name.replace(/(.*)(USDT)/, '$1/$2')
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left">
                                                {item.price}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Stack>
        </StyledPaper>
    )
}

const RightBar = () => {
    const buttonGroupData = [
        '买卖信号', '趋势转换', '波动预警'
    ]

    return (
        <StyledPaper sx={{
            height: 'calc(100vh - 100px)',
            ml: 2
        }}>
            <Stack spacing={2}>
                <ButtonGroup fullWidth sx={{
                    borderRadius: 10
                }}>
                    {
                        buttonGroupData.map((item, index) => (
                            <Button key={item + index}
                                    variant={index === 0 ? 'contained' : 'outlined'}
                                    sx={{
                                        borderRadius: 10
                                    }}>{item}</Button>
                        ))}
                </ButtonGroup>
            </Stack>
        </StyledPaper>
    )
}


const Layout = (): JSX.Element => {
    let {name} = useParams();
    name = name?.toUpperCase() ?? 'BTCUSDT'
    return (
        <Box sx={{
            height: 'calc(100vh - 32px)',
        }}>
            <Grid2 container>
                <Grid2 xs={"auto"} md={9}>
                    <Stack spacing={2}>
                        <Toolbar/>

                        <Grid2 container>
                            <Grid2 xs={"auto"} md={4}>
                                <LeftBar/>
                            </Grid2>
                            <Grid2 xs={'auto'} md={8}>
                                <Card sx={{
                                    width: '98%',
                                    margin: '0 0 0 auto',
                                    height: '100%',
                                }}>
                                    <Stack spacing={2} p={2}>
                                        <ChartToolbar/>
                                        <Chart height={containerMaxHeight} name={name} timeframe={'30M'}/>
                                    </Stack>
                                </Card>
                            </Grid2>
                        </Grid2>
                    </Stack>
                </Grid2>
                <Grid2 xs={"auto"} md={3}>
                    <RightBar/>
                </Grid2>
            </Grid2>
        </Box>
    );
};
const Detail = () => {
    return (
        <Box sx={{
            p: 2,
            bgcolor: grey[100]
        }}>
            <Layout/>
        </Box>
    )
}

export default Detail