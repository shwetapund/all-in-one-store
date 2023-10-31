import ReactDOM from "react-dom/client";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

import { createBrowserRouter, RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"))

const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    }
])

root.render(
    <>
    <RouterProvider router = {router} />
    </>
)