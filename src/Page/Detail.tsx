import {
    Alert,
    Box,
    Button,
    Card,
    Divider,
    IconButton,
    LinearProgress,
    LinearProgressProps,
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
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React, {useEffect, useRef} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {grey} from "@mui/material/colors";
import {
    AccountCircleOutlined,
    CloseOutlined,
    DownloadOutlined,
    HomeOutlined,
    MenuOutlined,
    MonitorOutlined,
    SearchOutlined,
    Translate
} from "@mui/icons-material";
import {coinAPI, coinListAPI, ICoin, signalAPI, trendChangeAPI} from "../API/coinAPI";
import Chart from "../Components/Chart/Chart";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import ChartToolbar from "../Components/Chart/ChartToolbar";
import timejs, {isEarlierThan1500X, timeframeToTargetTime} from "../Unit/timejs";
import useQuery from "../Hooks/useQuery";
import exportAsImage from "../Unit/exportAsImage";
import {Watermark} from "@hirohe/react-watermark";
import {useTranslation} from "react-i18next";
import useUser from "../Hooks/useUser";
import {useRecoilState} from "recoil";
import {accountDialogState} from "../Components/Account/AccountDialog";
import useChart from "../Hooks/useChart";
import {formatNumber} from "../Unit/formatNumber";

export const StyledPaper = styled(Paper)({
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
    const query = useQuery()
    const metaInfo = coinAPI({
        name: name ?? 'BTCUSDT',
        timeframe: query.get.timeframe,
    })
    const {t} = useTranslation()

    const toolbarData = metaInfo && [
        {
            title: metaInfo.name,
            desc: `${t('合约')}(${query.get.timeframe})`
        },
        {
            title: t('价格'),
            desc: metaInfo.latestKline.open_bid
        },
        {
            title: t('最高价'),
            desc: metaInfo.latestKline.highest_bid
        },
        {
            title: t('最低价'),
            desc: metaInfo.latestKline.lowest_bid
        },
        {
            title: `${t('交易量')}(${metaInfo.name.split('USDT')[0]})`,
            desc: metaInfo.latestKline.volume_bid.toFixed(2)
        },
        {
            title: `${t('交易量')}(USDT)`,
            desc: (metaInfo.latestKline.volume_bid * metaInfo.latestKline.open_bid).toFixed(2)
        }
    ];

    return (
        !isMobile ?
            (<StyledPaper sx={{
                minHeight: '50px'
            }}>
                <Grid2 container>
                    {toolbarData && toolbarData.map((item, index) => (
                        <Grid2 xs={"auto"} md={2} key={item.title + index}>
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
    "市场", "流动性", "波动率", "新趋势", "波动预警", "买卖信号"
]

const sortQuoteVolume = (coins: ICoin[]): ICoin[] => {
    const res = coins.sort((a, b) => {
        return b.price.quoteVolume - a.price.quoteVolume
    })

    return res
}

export const containerMaxHeight = 'calc(100vh - 300px)'
const LeftBar = () => {
    const {t} = useTranslation();


    const coinList = coinListAPI()
    const nav = useNavigate()

    const SEARCH_DELAY = 1000; // 1 second
    let searchTimer: any;

    function search(query: string, coins: ICoin[]): ICoin[] {
        const normalizedQuery = query.toLowerCase().trim();
        if (normalizedQuery === '') {
            return coins;
        }
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(normalizedQuery)
        );
    }

    const [searchResult, setSearchResult] = React.useState<ICoin[]>([]);
    const [searchQuery, setSearchQuery] = React.useState<object | string>('');

    useEffect(() => {
        if (!searchQuery) {
            setSearchResult(coinList)
        }
    }, [coinList])

    function handleSearchInput(event: { target: { value: string; }; }) {
        const query = event.target.value.trim();
        setSearchQuery(query)
        // Clear the previous timer
        clearTimeout(searchTimer);

        // Set a new timer to delay the search function execution
        searchTimer = setTimeout(() => {
            const res = search(query, coinList);
            setSearchResult(res)
        }, SEARCH_DELAY);
    }

    return (
        <StyledPaper>
            <Stack spacing={2}>
                <OutlinedInput size={'small'}
                               fullWidth
                               startAdornment={<SearchOutlined/>}
                               placeholder={'搜索交易对'}
                               value={typeof searchQuery === 'string' ? searchQuery : '流动性降序'}
                               onChange={handleSearchInput}
                               endAdornment={
                                   searchQuery && <IconButton size={'small'} onClick={() => {
                                       setSearchQuery('')
                                       setSearchResult(coinList.sort((a, b) => {
                                           if (a.name < b.name) {
                                               return -1;
                                           }
                                           if (a.name > b.name) {
                                               return 1;
                                           }
                                           return 0;
                                       }))
                                   }}>
                                       <CloseOutlined/>
                                   </IconButton>
                               }
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
                                minHeight: '24px',
                                cursor: 'pointer'
                            }} onClick={() => {
                                const res = sortQuoteVolume(coinList)
                                setSearchQuery(res)

                            }}>
                                {t(item)}
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
                                    <TableCell>{t('标的(usdt)')}</TableCell>
                                    <TableCell align="left">{t('最新价')}</TableCell>
                                    <TableCell align="left">{t('成交额')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    searchResult && searchResult.map((item, index) => (
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
                                                        // item.name.replace(/(.*)(USDT)/, '$1/$2')
                                                        item.name.replace(/(.*)(USDT)/, '$1')
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left">
                                                {item.price.open}
                                            </TableCell>
                                            <TableCell align="left">
                                                {formatNumber(item.price.quoteVolume)}
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

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box>
                <Typography sx={{
                    color: grey[500],
                    fontSize: '10px'
                }
                } color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

interface IPosition {
    outlined?: boolean,
    stop: boolean
}

const Position: React.FC<IPosition> = (props): JSX.Element => {
    const {name} = useParams()

    return (
        <StyledPaper elevation={props.outlined ? 0 : 2}>
            <Stack spacing={1}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant={'body2'}>做多{props.stop ? '平仓' : '持仓'} {name}</Typography>
                    <Typography sx={{
                        fontSize: '10px',
                        color: grey[500]
                    }}>8 小时前</Typography>
                </Box>

                <LinearProgressWithLabel value={60} color={'success'}/>

                <Stack spacing={1} direction={'row'} alignItems={'center'}>
                    <Typography variant={"subtitle1"}>
                        $540900
                    </Typography>

                    <Typography sx={{
                        color: grey[500],
                        fontSize: '10px'
                    }}>
                        收益
                    </Typography>
                </Stack>
            </Stack>
        </StyledPaper>
    )
}

const Signal = () => {
    const {name} = useParams()
    const query = useQuery()
    const chart = useChart()

    const signalData = signalAPI({
        name: name ?? 'BTCUSDT',
        timeframe: ''
    })

    return (
        <>
            <Stack spacing={1}>
                {
                    signalData && signalData.map((item, index) => {
                        const isBuy = item.direction === 1
                        return (
                            <Stack direction={"row"} key={item.name + index} spacing={1}>
                                <Alert sx={{
                                    width: '100%',
                                    cursor: 'pointer'
                                }} severity={isBuy ? 'success' : 'error'} onClick={
                                    () => {
                                        const targetTime = timeframeToTargetTime(item.timeframe, item.open_time)
                                        query.set({
                                            ...query.get,
                                            timeframe: item.timeframe
                                        })
                                        chart.setTargetTimestamp(targetTime)
                                    }
                                }>
                                    <Typography variant={'body2'} color={isBuy ? 'success' : 'error'}>
                                        {isBuy ? '买入' : '卖出'} ({item.timeframe})
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        {timejs(item.created_at).fromNow()} - {timejs(item.created_at).format('YYYY/MM/DD HH:mm:ss')}
                                    </Typography>
                                </Alert>
                            </Stack>
                        )
                    })}
            </Stack>
            <Box>
                <Stack spacing={2}>
                    {[0, 1, 2, 3].map((item, index) => (
                        <Box sx={{
                            filter: index > 0 ? 'grayscale(100%)' : '',
                            opacity: index > 0 ? 0.4 : 1
                        }}>
                            <Position key={item + index} outlined={index > 0} stop={index > 0}/>
                            {index > 0 && <Divider/>}
                        </Box>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

const TrendChange = () => {
    const {name} = useParams()
    const query = useQuery()
    const chart = useChart()
    const trendChangeData = trendChangeAPI({
        name: name ?? 'BTCUSDT',
        timeframe: ''
    })

    return (
        <>
            {trendChangeData && trendChangeData.map((item, index) => {
                const isBull = item.direction === 1
                const isEarlierThan1500 = isEarlierThan1500X(new Date(), item.timeframe)
                return (
                    <Stack key={item.name + index} spacing={2} sx={{
                        filter: !isEarlierThan1500 ? 'grayscale(100%)' : '',
                        opacity: !isEarlierThan1500 ? 0.4 : 1
                    }}>
                        <Alert severity={isBull ? 'success' : 'error'}
                               sx={{
                                   cursor: 'pointer'
                               }}
                               onClick={
                                   () => {
                                       const targetTime = timeframeToTargetTime(item.timeframe, item.open_time)
                                       query.set({
                                           ...query.get,
                                           timeframe: item.timeframe
                                       })
                                       chart.setTargetTimestamp(targetTime)
                                   }
                               }>
                            <Typography variant={'body2'} color={isBull ? 'success' : 'error'}>
                                {isBull ? '趋势转多' : '趋势转空'} ({item.timeframe})
                            </Typography>
                            <Typography variant={'body2'}>
                                {timejs(item.open_time).fromNow()} - {timejs(item.open_time).format('YYYY/MM/DD HH:mm:ss')}
                            </Typography>
                        </Alert>
                    </Stack>
                )
            })}
        </>
    )
}

const RightBar = () => {
    const buttonGroupData: { name: string, render?: JSX.Element }[] = [
        {name: '持仓信号（开发中）', render: <Signal/>}, {name: '趋势转换', render: <TrendChange/>}, {name: '波动预警'}
    ]

    const {t} = useTranslation(

    )
    return (
        <StyledPaper sx={{
            maxHeight: 'calc(100vh - 100px)',
            ml: 2,
            height: '100%',
            overflowY: 'hidden',
            ':hover': {
                overflowY: 'auto'
            }
        }}>
            <Stack spacing={2}>
                {
                    buttonGroupData.map((item, index) => (
                        <Stack spacing={1} key={item.name + index}>
                            <Button
                                variant={index === 0 ? 'contained' : 'outlined'}
                                sx={{
                                    borderRadius: 10
                                }}>{t(item.name)}</Button>
                            <Stack spacing={1} sx={{
                                maxHeight: '200px',
                                height: '100%',
                                overflowY: 'hidden',
                                ':hover': {
                                    overflowY: 'auto'
                                }
                            }}>
                                {item.render}
                            </Stack>
                        </Stack>
                    ))}
            </Stack>
        </StyledPaper>
    )
}


interface INavBar {
    link: string,
    icon: JSX.Element
}

const Layout = (): JSX.Element => {
    let {name} = useParams();

    const query = useQuery()

    useEffect(() => {
        name = name?.toUpperCase() ?? 'BTCUSDT'
        query.set({
            ...query.get,
            name
        })
    }, [name])

    const exportRef = useRef();
    const location = useLocation();
    const navBarData: INavBar[] = [
        {
            link: '/',
            icon: <HomeOutlined/>,
        },
        {
            link: location.pathname,
            icon: <MonitorOutlined/>,
        },
    ]

    const nav = useNavigate()
    // set language
    const {i18n} = useTranslation();

    const user = useUser();

    const [open, setOpen] = useRecoilState(accountDialogState);

    return (
        <Box sx={{
            height: 'calc(100vh - 32px)',
        }}>
            <Box sx={{
                display: 'flex',
                gap: 2,
            }}>
                <Box>
                    <StyledPaper sx={{
                        height: 'calc(100vh - 100px)'
                    }}>
                        <Stack spacing={2} height={'100%'} alignItems="center"
                               justifyContent="space-between">
                            <Stack>
                                {navBarData.map((item, index) => (
                                    <IconButton key={item.link + index} onClick={() => nav(item.link)} sx={{
                                        bgcolor: location.pathname === item.link ? grey[100] : 'transparent',
                                    }}>
                                        {item.icon}
                                    </IconButton>
                                ))}
                            </Stack>
                            <Stack>
                                <IconButton>
                                    <AccountCircleOutlined onClick={
                                        () => {
                                            user.isLogin
                                                ? setOpen(true)
                                                : nav('/register')
                                        }
                                    }/>
                                </IconButton>
                                <Tooltip title={i18n.language === 'zh' ? 'English' : '中文'} arrow
                                         placement={'right'}>
                                    <IconButton
                                        onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}>
                                        <Translate/>
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </Stack>
                    </StyledPaper>
                </Box>
                <Box sx={{
                    flex: 1
                }}>
                    <Grid2 container>
                        <Grid2 xs={"auto"} md={9}>
                            <Stack spacing={2}>
                                <Toolbar/>

                                <Grid2 container>
                                    <Grid2 xs={"auto"} md={3}>
                                        <LeftBar/>
                                    </Grid2>
                                    <Grid2 xs={'auto'} md={9}>
                                        <Card sx={{
                                            width: '98%',
                                            margin: '0 0 0 auto',
                                            height: '100%',
                                        }}>
                                            <Stack spacing={2} p={2}>
                                                <Stack justifyContent={'space-between'} direction={'row'}>
                                                    <ChartToolbar/>
                                                    <Tooltip title={'导出图片'} arrow placement={"top"}>
                                                        <IconButton
                                                            onClick={() => exportAsImage(exportRef.current)}>
                                                            <DownloadOutlined/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>

                                                <Box ref={exportRef}>
                                                    <Watermark text="Fiapp.pro" gutter={60} opacity={0.15}>
                                                        <Chart height={containerMaxHeight} name={query.get.name}
                                                               timeframe={query.get.timeframe}/>
                                                    </Watermark>
                                                </Box>
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
            </Box>
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