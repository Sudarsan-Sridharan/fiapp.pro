// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const hostname = location.hostname;
export const domain =
  hostname === 'localhost' ? `http://${hostname}:2000` : 'https://api.fiapp.pro';
