import React, {useCallback, useEffect, useRef} from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import type {SnackbarKey} from 'notistack';
import {useRegisterSW} from 'virtual:pwa-register/react';

import useNotifications from '@/store/notifications';
import {blue} from "@mui/material/colors";

// TODO (Suren): this should be a custom hook :)
function SW() {
    const [, notificationsActions] = useNotifications();
    const notificationKey = useRef<SnackbarKey | null>(null);
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW();

    const close = useCallback(() => {
        setOfflineReady(false);
        setNeedRefresh(false);

        if (notificationKey.current) {
            notificationsActions.close(notificationKey.current);
        }
    }, [setOfflineReady, setNeedRefresh, notificationsActions]);

    useEffect(() => {
        if (offlineReady) {
            notificationsActions.push({
                options: {
                    autoHideDuration: 4500,
                    content: <Alert severity="success">App is ready to work offline.</Alert>,
                },
            });
        } else if (needRefresh) {
            notificationKey.current = notificationsActions.push({
                message: '新内容可用，请及时更新',
                options: {
                    variant: 'default',
                    persist: true,
                    action: (
                        <>
                            <Button sx={{bgcolor: blue[500], color: '#fff'}}
                                    onClick={() => updateServiceWorker(true)}>更新</Button>
                            <Button onClick={close}>忽略</Button>
                        </>
                    ),
                },
            });
        }
    }, [close, needRefresh, offlineReady, notificationsActions, updateServiceWorker]);

    return null;
}

export default SW;
