import {Button, Dialog, IconButton, Stack, Typography} from "@mui/material";
import useUser from "../../Hooks/useUser";
import {AccountCircleOutlined, LogoutOutlined} from "@mui/icons-material";
import {atom, useRecoilState} from "recoil";
import {StyledPaper} from "../../Page/Detail";

type IAccountDialog = boolean

export const accountDialogState = atom<IAccountDialog>({
    key: 'accountDialogState',
    default: false
})

const AccountDialog = () => {
    const [open, setOpen] = useRecoilState(accountDialogState);
    const user = useUser()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        user.logout()
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <AccountCircleOutlined/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <StyledPaper>
                    <Stack spacing={1}>
                        <Typography variant={"subtitle1"}>
                            用户账户
                        </Typography>
                        <>
                            <Typography variant="body1">Username: {user.get?.data.userInfo.username}</Typography>
                            <Typography variant="body1">Email: {user.get?.data.userInfo.email}</Typography>
                        </>
                    </Stack>

                    <Button variant="contained" onClick={handleLogout} color={'error'}
                            sx={{mt: 2, width: '100%'}}>
                        <LogoutOutlined/>
                        登出
                    </Button>
                </StyledPaper>
            </Dialog>
        </>
    );
}

export default AccountDialog