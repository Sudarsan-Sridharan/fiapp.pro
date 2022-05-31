import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import {
    Box, Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    Typography,
    useTheme
} from '@mui/material';
import { SxProps, alpha } from '@mui/system';


import Meta from '@/components/Meta';
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import { PlainDivider } from '@/components/styled';
import {
    DoorbellOutlined,
    Looks,
    Looks4Outlined,
    LooksOneOutlined,
    LooksTwo,
    LooksTwoOutlined, Notifications
} from "@mui/icons-material";
import {green, red} from "@mui/material/colors";


const rows: GridRowsProp = [
    { id: 1, name: 'BTC', price: '$31652.79', '30min': 'Long', '1hour': 'Long', "4hour": 'Short', lastSignal: 'Long at 2022/5/31 14:11', trend: 'short' },
    { id: 2, name: 'ETH', price: '$1980.97', '30min': 'Long', '1hour': 'Long', "4hour": 'Short', lastSignal: 'Short at 2022/5/30 3:48', trend: 'short' },
    { id: 3, name: 'BNB', price: '$319.80', '30min': 'Long', '1hour': 'Long', "4hour": 'Short', lastSignal: 'Long at 2022/5/31 16:56', trend: 'short' },
    { id: 4, name: 'ADA', price: '$0.6443', '30min': 'Long', '1hour': 'Short', "4hour": 'Short', lastSignal: 'Long at 2022/5/28 19:22', trend: 'short' },
];

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Rank' },
    { field: 'name', headerName: 'Name' },
    { field: 'price', headerName: 'Price' },
    { field: '30min', headerName: '30min' },
    { field: '1hour', headerName: '1hour' },
    { field: '4hour', headerName: '4hour' },
    { field: 'lastSignal', headerName: 'Signal', width: 200 },
    { field: 'trend', headerName: 'Trend' },
];

const dRows: GridRowsProp = [
    { id: 1,name: 'BTC', price: '$31652.79', '30min': 'Long', '1hour': 'Long', "4hour": 'Short', lastSignal: 'Long at 2022/5/31 14:11', trend: 'short' },
];

const dColumns: GridColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'price', headerName: 'Price' },
    { field: '30min', headerName: '30min' },
    { field: '1hour', headerName: '1hour' },
    { field: '4hour', headerName: '4hour' },
    { field: 'lastSignal', headerName: 'Signal', width: 200 },
    { field: 'trend', headerName: 'Trend' },
];

const nRows: GridRowsProp = [
    { id: 1,level: 'X1', price: '$28200.48', 'time': '30min', 'action': 'Long', 'signal': '2022/5/28 15:31' },
    { id: 2,level: 'X3', price: '$30200.96', 'time': '1hour', 'action': 'Long', 'signal': '2022/5/31 14:11' },
    { id: 3,level: 'X4', price: '$40797.31', 'time': '4hour', 'action': 'Short', 'signal': '2022/4/26 08:48' },
];

const nColumns: GridColDef[] = [
    { field: 'level', headerName: 'Level' },
    { field: 'price', headerName: 'Price' },
    { field: 'time', headerName: 'Time' },
    { field: 'action', headerName: 'Action' },
    { field: 'signal', headerName: 'Signal', width: 200 },
];

function Welcome() {
  return (
    <>
      <Meta title="Welcome" />

        <Grid container>
            <Grid item xs={12} md={9}>
                <Typography variant={'h2'}>
                    Today&apos;s Cryptocurrency recommend by Coin Master
                </Typography>

                <DataGrid rows={rows} columns={columns} autoHeight hideFooter />

                <PlainDivider sx={{my:2}} />

                <Typography variant={'h2'}>
                    Details
                </Typography>

                <DataGrid rows={dRows} columns={dColumns} autoHeight hideFooter />

                <DataGrid rows={nRows} columns={nColumns} autoHeight hideFooter />

            </Grid>

            <Grid>
                <Box>
                    <List dense>
                        <ListItemButton>
                            <ListItemIcon>
                                <Notifications sx={{color: green[100]}} />
                            </ListItemIcon>
                            <ListItemText>
                                30min: *BTC* Long X1 at 2022/5/28 15:31
                            </ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <Notifications sx={{color: green[300]}} />
                            </ListItemIcon>
                            <ListItemText>
                                1hour: *ETH* Long X3 at 2022/5/31 14:11
                            </ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <Notifications sx={{color: red[400]}} />
                            </ListItemIcon>
                            <ListItemText>
                                4hour: *ADA* Short X4 at 2022/5/31 19:48
                            </ListItemText>
                        </ListItemButton>
                    </List>
                </Box>
            </Grid>
        </Grid>

    </>
  );
}

export default Welcome;
