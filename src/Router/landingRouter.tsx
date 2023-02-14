import {createBrowserRouter} from "react-router-dom";
import Home from "../Page/Home";
import {Login, Register} from "../Page/Auth";
import LandingLayout from "../Components/Layout/LandingLayout";
import {Error} from "@mui/icons-material";

export const landingRouter = createBrowserRouter([
    {
        path: '/',
        element: <LandingLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            }
        ]
    }
])