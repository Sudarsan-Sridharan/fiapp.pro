import {ButtonGroup, IconButton, Rating, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {CancelOutlined} from "@mui/icons-material";
import React from "react";
import {timeframes} from "@/components/Table/TrendingChange";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {useMatch} from "react-router-dom";

const QueryTable = () => {
    const APIQuery = useAPIQuery()
    const riskWarningMatch = useMatch('risk-warning')

    return (
        <Stack spacing={2} direction={'column'}>
            <Stack spacing={1} direction={'row'}>
                {!riskWarningMatch && (<ButtonGroup variant={'outlined'} color={'primary'}>
                    {[
                        {label: '多', value: '1'},
                        {
                            label: '空',
                            value: '-1',
                        },
                        {
                            label: '全部',
                            value: '',
                        },
                    ].map((item, i) => (
                        <Button
                            key={i}
                            onClick={() => APIQuery.setValue({
                                ...APIQuery.value,
                                currentTrending: item.value,
                            })}
                            variant={APIQuery.value.currentTrending === item.value ? 'contained' : 'outlined'}
                        >
                            {item.label}
                        </Button>
                    ))}
                </ButtonGroup>)}

                <ButtonGroup variant="outlined">
                    {timeframes.map((item, index) => (
                        <Button
                            key={index}
                            onClick={() => APIQuery.setValue({
                                timeframe: item
                            })}
                            variant={item === APIQuery.value.timeframe ? 'contained' : 'outlined'}
                        >
                            {item}
                        </Button>
                    ))}
                </ButtonGroup>
            </Stack>

            <Stack direction={'row'} sx={{alignItems: 'center'}}>
                <Typography variant={'body1'}>风险：</Typography>
                <Rating value={APIQuery.value.risk} onChange={(event, value) => APIQuery.setValue({
                    ...APIQuery.value,
                    risk: value,
                })}/>

                {APIQuery.value.risk !== 0 && APIQuery.value.risk && (
                    <IconButton size={'small'} onClick={() => APIQuery.setValue({
                        ...APIQuery.value,
                        risk: 0,
                    })}>
                        <CancelOutlined/>
                    </IconButton>
                )}
            </Stack>
        </Stack>
    )
}

export default QueryTable;