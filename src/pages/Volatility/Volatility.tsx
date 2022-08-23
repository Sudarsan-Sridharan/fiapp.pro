import VolatilityTable from "@/components/Table/Volatility";
import React from "react";
import {Container, Toolbar} from "@mui/material";

const Volatility = () => {
    return (
        <>
            <Toolbar/>
            <Container maxWidth={"xl"}>
                <VolatilityTable/>
            </Container>
        </>
    )
}

export default Volatility