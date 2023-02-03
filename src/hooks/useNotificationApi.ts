// Convenient hook.
import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';

const useNotificationApi = () => {
  const isGrantedAtom = atom<boolean>({
    key: 'IsGrantedAtom',
    default: false,
  });

  const [isGranted, setIsGranted] = useRecoilState(isGrantedAtom);

  const requestPermission = async () => {
    console.log('Requesting permission...');
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setIsGranted(true);
    }
  };

  const permission = Notification.permission;

  useEffect(() => {
    if (permission === 'granted') {
      setIsGranted(true);
    }
  }, [permission, setIsGranted]);
  const isDenied = permission === 'denied';

  const pushNotification = (title: string, options: NotificationOptions, link?: string) => {
    if (isGranted) {
      const notice = new Notification(title, options);
      notice.onclick = () => {
        const pathname = window.location.pathname;
        window.parent.parent.focus();
        if (link) {
          if (pathname !== link) {
            window.location.replace(link);
          }
        }
      };
    }
  };

  return {
    requestPermission,
    permission,
    isGranted,
    isDenied,
    pushNotification,
  };
};

export default useNotificationApi;
