import React from "react";
import { FullSizeCenteredFlexBox } from "@/components/styled";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, CardActions, CardContent, Input, Paper, Stack, TextField } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

const Login = () => {
  return (
    <>
     <FullSizeCenteredFlexBox>
          <Card sx={{width: '100%', maxWidth: '600px', p:2}} elevation={0}>
            <CardContent>
              <Stack spacing={1}>
                <TextField variant={'outlined'} placeholder="Email" fullWidth />
                <TextField variant={'outlined'} placeholder="Password" fullWidth />
              </Stack>
            </CardContent>

            <CardActions>
              <Box sx={{textAlign: 'right', width: '100%'}}>
                <Button variant={'contained'} endIcon={<LoginOutlined/>}>Login</Button>
              </Box>
            </CardActions>
          </Card>
     </FullSizeCenteredFlexBox>
    </>
  )
}

export default Login;
