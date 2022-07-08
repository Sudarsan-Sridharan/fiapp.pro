// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
export const domain = 'https://api.fiapp.pro';
