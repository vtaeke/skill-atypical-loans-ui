import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartPage from './pages/StartPage/StartPage';
import FormPage from "./pages/FormPage/FormPage";
import RequestsList from "./pages/RequestsList/RequestsList";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <StartPage />,
    },
    {
        path: "/form",
        element: <FormPage />,
    },
    {
        path: "/requests",
        element: <RequestsList />,
    },
]);

root.render(
    <RouterProvider router={router}/>
);
