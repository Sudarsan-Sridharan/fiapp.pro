import React from "react";
import LandingToolbar from "./LandingToolbar";
import {Box, ThemeProvider, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Favorite} from "@mui/icons-material";
import {Outlet} from "react-router-dom";
import {RecoilRoot} from "recoil";
import {theme} from "../../Theme/Theme";


interface ILandingLayout {
    width?: string,
    toolbar?: boolean,
    footer?: boolean,
}

const LandingLayout: React.FC<ILandingLayout> = ({width, toolbar = true, footer = true}) => {
    return (
        <>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
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
                </ThemeProvider>
            </RecoilRoot>
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