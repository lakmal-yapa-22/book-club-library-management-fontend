import {createBrowserRouter} from "react-router-dom";
import Layout from "./pages/Layout"
import Signup from "./pages/SignUpPage.tsx";
import Login from "./pages/LoginPage.tsx";
import AdminRoutes from "./pages/AdminRoutes.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import BookPage from "./pages/BookPage.tsx";
import ReaderPage from "./pages/ReaderPage.tsx";
import IssueBook from "./pages/IssuebookPage.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {path: "/",element: <Login />},
            {path: "/login",element: <Login />},
            {path: "/signup",element: <Signup />},
            {
                element: <AdminRoutes />,
                children: [
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "/dashboard/book", element: <BookPage /> },
                    { path: "/dashboard/reader", element: <ReaderPage /> },
                    { path: "/dashboard/issuebook", element: <IssueBook /> },

                ],
            }   ,

        ],
    }
])

export default router