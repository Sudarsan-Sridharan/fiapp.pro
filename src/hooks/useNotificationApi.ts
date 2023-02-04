// Convenient hook.
import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/ network/fether';
import noticeSound from '@/assets/sound/notice.mp4';

export const isGrantedAtom = atom<boolean>({
  key: 'IsGrantedAtom',
  default: false,
});

const useNotificationApi = () => {
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

  // 发送买卖信号通知
  const { data: tradingSignalNotification } = useSWR<any>('TradingSignal/notification', fetcher, {
    refreshInterval: 1000,
  });

  const pushNotificationObject = {
    title: tradingSignalNotification?.data?.name,
    options: {
      body: tradingSignalNotification?.data?.message,
    },
  };

  const isPushedTradingNotification = () => {
    const localPushedTradingNotificationId = localStorage.getItem('pushedTradingNotificationId');
    return localPushedTradingNotificationId === tradingSignalNotification?.data?.id;
  };

  if (!isPushedTradingNotification() && tradingSignalNotification?.data?.name && localStorage.getItem('token')) {
    const sound: HTMLAudioElement = new Audio();
    sound.src = noticeSound;
    sound.load();
    sound.play().then(() => {
      console.log('play sound');
    });
    pushNotification(pushNotificationObject.title, pushNotificationObject.options, '/signal');
    localStorage.setItem('pushedTradingNotificationId', tradingSignalNotification?.data?.id);
  }

  return {
    requestPermission,
    permission,
    isGranted,
    isDenied,
    pushNotification,
  };
};

export default useNotificationApi;
