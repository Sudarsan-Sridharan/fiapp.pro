import React from "react";
import LandingToolbar from "./LandingToolbar";
import {Box, ThemeProvider, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Favorite} from "@mui/icons-material";
import {Outlet} from "react-router-dom";
import {RecoilRoot} from "recoil";
import {theme} from "../../Theme/Theme";


const LandingLayout = () => {
    return (
        <>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <Box width={'90%'} margin={'0 auto'}>
                        <LandingToolbar/>
                        <Box mt={'116px'}/>
                        <Outlet/>

                        <Box mt={12} mb={2}>
                            <Typography variant={"body1"} alignItems={'center'} display={'flex'}
                                        sx={{
                                            color: grey[500]
                                        }}
                                        justifyContent={"center"} gap={1}>
                                <Favorite/> by Fiapp.pro @ 2023
                            </Typography>
                        </Box>
                    </Box>
                </ThemeProvider>
            </RecoilRoot>
        </>
    );
};

export default LandingLayout;