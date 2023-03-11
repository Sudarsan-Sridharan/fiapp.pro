import axios from "axios";

axios.defaults.baseURL = "https://api.fiapp.pro";
axios.defaults.headers.common = {
    "Content-Type": "application/json",
}


interface GolangApiResponse<T> {
    code: number;
    data: T;
}

// Add a response interceptor to catch errors with non-zero response codes
axios.interceptors.response.use(
    (response) => {
        // Only apply to ApiResponse from the /g/ endpoint
        if (
            response.config.url?.startsWith("/g/") &&
            response.data &&
            "code" in response.data
        ) {
            const {code} = response.data as GolangApiResponse<unknown>;
            if (code !== 0) {
                const error = new Error(`Request failed with code ${code}`);
                return Promise.reject(error);
            }
        }
        return response;
    },
    (error) => {
        if (axios.isAxiosError(error) && error?.config?.url?.startsWith("/g/")) {
            // Only catch errors for requests made to the /g/ endpoint
            return Promise.reject(new Error("Failed to fetch data"));
        }
        return Promise.reject(error);
    }
);

export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const http = axios