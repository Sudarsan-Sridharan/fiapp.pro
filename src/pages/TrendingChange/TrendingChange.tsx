import {Container, Toolbar} from "@mui/material";
import React from "react";
import TrendingChangeTable from "@/components/Table/TrendingChange";

const TrendingChange = () => {
    return (
        <>
            <Toolbar/>

            <Container maxWidth={"xl"}>
                <TrendingChangeTable/>
            </Container>
        </>
    )
}

export default TrendingChange;