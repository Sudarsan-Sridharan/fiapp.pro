import isMobile from '@/utils/is-mobile';

import type {Notifications} from './types';

const title = '交易大师';

const email = 'agdholo@outlook.com';

const repository = '';

const messages = {
    app: {
        crash: {
            title: '网站发生了一些错误，你可以尝试以下方式解决问题：',
            options: {
                email: `通过邮件联系作者 - ${email}`,
                reset: '点击按钮重置数据',
            },
        },
    },
    loader: {
        fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
    },
    images: {
        failed: 'something went wrong during image loading :(',
    },
    404: 'Hey bro? What are you looking for?',
};

const dateFormat = 'MMMM DD, YYYY';

const notifications: Notifications = {
    options: {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        autoHideDuration: 6000,
    },
    maxSnack: isMobile ? 3 : 4,
};

const loader = {
    // no more blinking in your app
    delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
    minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
    image: '/cover.png',
    description: '不需要任何交易知识也可以在股市中赚大钱，交易大师全自动量化平台倾力打造！',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
    loader,
    notifications,
    dateFormat,
    messages,
    repository,
    email,
    title,
    defaultMetaTags,
    giphy404,
};
