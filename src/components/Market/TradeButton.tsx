import Button from "@mui/material/Button";
import {ArrowDropDown} from "@mui/icons-material";
import {Menu, Stack} from "@mui/material";
import React from "react";
import {bindHover, bindMenu, usePopupState} from "material-ui-popup-state/hooks";

interface ITradeButton {
    name: string
}

const TradeButton: React.FC<ITradeButton> = (props) => {
    const popupState = usePopupState({variant: 'popover', popupId: 'tradeButtonMenu'})

    return (
        <>
            <Button variant={'contained'}
                    endIcon={<ArrowDropDown/>}
                    {...bindHover(popupState)}>
                交易
            </Button>

            <Menu {...bindMenu(popupState)}>
                <Stack spacing={1}>
                    <Button fullWidth href={`https://www.binance.com/zh-CN/trade/${props.name}`}
                            target={'_blank'}>币安</Button>
                    <Button
                        href={`https://www.okx.com/trade-spot/${props.name.split('USDT')[0]}-USDT`}
                        target={'_blank'}>OKX</Button>
                </Stack>
            </Menu>
        </>
    )
}

export default TradeButton;