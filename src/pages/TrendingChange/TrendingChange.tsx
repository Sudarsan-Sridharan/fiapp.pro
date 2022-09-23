import {Container, Toolbar} from "@mui/material";
import React from "react";
import TrendingChangeTable from "@/components/Table/TrendingChange";
import Meta from "@/components/Meta";

const TrendingChange = () => {
    return (
        <>
            <Meta title={'趋势转换'}/>

            <Toolbar/>


            <Container maxWidth={"xl"}>
                <TrendingChangeTable/>
            </Container>
        </>
    )
}

export default TrendingChange;