import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import React from "react";
import {usePopupState} from "material-ui-popup-state/hooks";

interface ITradeButton {
    name: string
}

const TradeButton: React.FC<ITradeButton> = (props) => {
    const popupState = usePopupState({variant: 'popover', popupId: 'tradeButtonMenu'})

    return (
        <>
            <Stack direction={'row'}>
                <Button fullWidth href={`https://www.binance.com/zh-CN/trade/${props.name}`}
                        color={"inherit"}
                        size={"small"}
                        target={'_blank'}>币安</Button>
                <Button
                    href={`https://www.okx.com/trade-spot/${props.name.split('USDT')[0]}-USDT`}
                    color={"inherit"}
                    size={"small"}
                    target={'_blank'}>OKX</Button>
            </Stack>
        </>
    )
}

export default TradeButton;