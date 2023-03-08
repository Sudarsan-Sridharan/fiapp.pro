import axios from "axios";

axios.defaults.baseURL = "https://api.fiapp.pro";
axios.defaults.headers.common = {
    "Content-Type": "application/json",
}
export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const http = axios