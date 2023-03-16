import React from "react";
import LandingToolbar from "./LandingToolbar";
import {Box, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Favorite} from "@mui/icons-material";
import {Outlet} from "react-router-dom";


interface ILandingLayout {
    width?: string,
    toolbar?: boolean,
    footer?: boolean,
}


const LandingLayout: React.FC<ILandingLayout> = ({width, toolbar = true, footer = true}) => {
    return (
        <>

            <Box width={width ?? '100%'} margin={'0 auto'}>
                {toolbar && (
                    <>
                        <LandingToolbar/>
                        <Box mt={'96px'}/>
                    </>
                )}

                <Outlet/>

                {
                    footer && (
                        <Footer/>
                    )
                }
            </Box>
        </>
    );
};

const Footer = () => (
    <Box mt={12} mb={2}>
        <Typography variant={"body1"} alignItems={'center'} display={'flex'}
                    sx={{
                        color: grey[500]
                    }}
                    justifyContent={"center"} gap={1}>
            <Favorite/> by Fiapp.pro @ 2023
        </Typography>
    </Box>
)

export default LandingLayout;