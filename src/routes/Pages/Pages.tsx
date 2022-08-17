import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';

function Pages() {
    return (
        <Box>
            <Routes>
                {Object.values(routes).map(({path, component: Component}) => {
                    return <Route key={path} path={path} element={<Component/>}/>;
                })}
            </Routes>
        </Box>
    );
}

export default Pages;
