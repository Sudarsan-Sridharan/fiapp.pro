import {createTheme, responsiveFontSizes} from "@mui/material";

const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#eeeeee',
        }
    },
    typography: {
        fontFamily: [
            '"SF Pro Display Bold"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontWeight: "inherit"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: ({ownerState}) => ({
                    ...(ownerState.variant === 'contained' && {
                        boxShadow: 'none',
                    }),
                    textTransform: 'none',
                    borderRadius: 10,
                    ...(ownerState.size === 'large' && {
                        height: 64,
                    })
                }),
            }
        }
    }
});

muiTheme.shadows[1] = "0 0 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)"
muiTheme.shadows[2] = "0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)"
muiTheme.shadows[3] = "0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.14)"
muiTheme.shadows[4] = "0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)"
muiTheme.shadows[5] = "0 0 8px rgba(0,0,0,0.12), 0 14px 28px rgba(0,0,0,0.14)"
muiTheme.shadows[6] = "0 0 8px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.14)"
export const theme = responsiveFontSizes(muiTheme);