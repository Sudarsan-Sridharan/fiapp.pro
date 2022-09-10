// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from "axios";

const hostname = location.hostname;
export const domain =
    hostname === '127.0.0.1' ? `http://${hostname}:5148` : 'https://api.fiapp.pro';

export const http = axios.create({
    baseURL: domain,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${localStorage.getItem('token')}`
    }
})

export const fetcher = http

