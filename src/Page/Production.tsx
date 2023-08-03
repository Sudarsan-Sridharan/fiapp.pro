import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {RunningWithErrorsOutlined, TrendingUpOutlined} from "@mui/icons-material";
import {grey} from "@mui/material/colors";
import React from "react";
import {StyledPaper} from "./Detail";
import {Link} from "react-router-dom";
import useUser from "../Hooks/useUser";
import FiappLogo from "../Components/Icon/FiappLogo";

interface IProductionData {
    title: string
    description: string,
    icon: React.ReactNode
}

const ProductionData: IProductionData[] = [
    // {
    //     title: "持仓追踪",
    //     description: "即时更新并显示投资组合的实时市值和收益情况，帮助用户更好地了解和管理自己的投资组合。通过持仓追踪，用户可以随时掌握投资组合的风险和收益情况，及时做出相应的调整，从而提高投资效益。",
    //     icon: <GpsFixedOutlined/>
    // },
    // {
    //     title: "大数据分析",
    //     description: "自动执行交易策略，帮助用户更好地实现投资目标。根据预设的买卖规则，系统可以自动识别市场的变化，采取相应的交易行动，从而控制风险和获得更高的收益。通过大数据分析的自动化执行，用户可以减少人为干预和情绪影响，更加科学地管理自己的投资组合。",
    //     icon: <CellTowerOutlined/>
    // },
    {
        title: "趋势转换",
        description: "实时分析数据，协助用户深入了解市场趋势，以便更好地利用大数据分析机会。通过对市场趋势的及时识别，用户能够灵活调整其策略，做出更明智的决策，并控制风险。此外，趋势分析的转变也能够用于预测未来市场走向，为用户提供更可靠的数据支持。这样，用户可以更好地应对市场变化，优化业务流程，并获得更高的效益。",
        icon: <TrendingUpOutlined/>
    },
    {
        title: "波动预警",
        description: "实时监测市场波动情况，提供市场动态信息给用户。通过对市场波动的及时预警，用户可以了解市场的动态变化，以便做出相应的反应。",
        icon: <RunningWithErrorsOutlined/>
    },
    // {
    //     title: "智能推荐",
    //     description: "为用户提供个性化的投资建议，帮助用户做出更明智的投资决策。通过对用户的投资偏好、风险偏好、市场情况等多方面因素的分析，系统可以为用户推荐最适合的投资组合，提高投资效率。同时，智能推荐也可以根据市场变化对投资建议进行动态调整，帮助用户更好地适应市场变化，获取更高的投资收益。",
    //     icon: <RecommendOutlined/>
    // },
    // {
    //     title: '机构服务',
    //     description: "为金融机构提供量化投资研究和交易策略定制服务。通过深入挖掘市场数据和应用先进的机器学习算法，我们可以为机构客户提供高质量的投资研究报告，帮助客户分析市场趋势和发现投资机会。同时，我们还可以根据客户的需求定制交易策略，帮助客户实现投资目标并提高投资效率。我们的机构服务旨在为客户提供一流的量化投资解决方案，帮助机构客户在竞争激烈的市场中取得成功。",
    //     icon: <BusinessOutlined/>
    // }
]

const Production = () => {
    const user = useUser()
    const {t} = useTranslation()
    return (
        <Container maxWidth={"lg"} sx={{py: 10}}>
            <Stack spacing={10}>
                <Grid2 container>
                    <Grid2 xs={12}>
                        <Typography variant={"h1"} fontWeight={"bolder"} lineHeight={1.5}>
                            {t("专业级")}<br/>
                            {t("量化数据算法")}<br/>
                            {t("解决方案")}
                        </Typography>
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={2}>
                    {ProductionData.map((item, index) => (
                        <Grid2 xs={12} md={6} lg={4} mt={4}>
                            <StyledPaper sx={{
                                height: '100%'
                            }}>
                                <Stack spacing={2} sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 60
                                    }
                                }}>
                                    {item.icon}
                                    <Typography variant={"h4"}>
                                        {t(item.title)}
                                    </Typography>

                                    <Typography variant={"body2"} sx={{mt: 1, color: grey[500]}}>
                                        {t(item.description)}
                                    </Typography>
                                </Stack>
                            </StyledPaper>
                        </Grid2>
                    ))}
                </Grid2>

                <Box textAlign={'center'}>
                    <Button variant={'contained'} size={"large"} color={'primary'}
                            sx={theme => ({
                                boxShadow: theme.shadows[6],
                            })}
                            component={Link}
                            to={user.tryItFreeNowLink}
                            startIcon={<FiappLogo/>}>
                        {t('立即免费使用')}
                    </Button>
                </Box>
            </Stack>
        </Container>
    )
}

export default Production