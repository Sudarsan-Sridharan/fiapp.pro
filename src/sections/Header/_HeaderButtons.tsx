import React from 'react';

import {Button, Stack} from '@mui/material';
import {Link} from "react-router-dom";

interface ButtonProp {
    icon: React.ReactElement | string;
    text: string;
    link: string;
}

export interface HeaderButtonProps {
    data: ButtonProp[];
}

const HeaderButtons: React.FC<HeaderButtonProps> = (props) => {
    return (
        <Stack spacing={1} direction={'row'}>
            {props.data.map((item) => (
                <Button
                    key={item.text}
                    disableElevation
                    size={'small'}
                    color={'inherit'}
                    endIcon={item.icon}
                    to={item.link}
                    variant={'contained'}
                    component={Link}
                >
                    {item.text}
                </Button>
            ))}
        </Stack>
    );
};

export default HeaderButtons;
