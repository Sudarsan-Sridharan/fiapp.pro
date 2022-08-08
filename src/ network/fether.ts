// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const hostname = location.hostname;
export const domain =
    hostname === '127.0.0.1' ? `http://${hostname}:5148` : 'https://api.fiapp.pro';
