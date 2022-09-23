import VolatilityTable from "@/components/Table/Volatility";
import React from "react";
import {Container, Toolbar} from "@mui/material";
import Meta from "@/components/Meta";

const Volatility = () => {
    return (
        <>
            <Meta title={'动量检测'}/>
            <Toolbar/>
            <Container maxWidth={"xl"}>
                <VolatilityTable/>
            </Container>
        </>
    )
}

export default Volatility