import React from 'react';
import { RouterProvider } from "react-router-dom";
import './App.css';
import { createBrowserRouter } from "react-router-dom";
import StartPage from './pages/StartPage/StartPage';
import FormPage from "./pages/FormPage/FormPage";
import RequestsList from "./pages/RequestsList/RequestsList";
import VerifyRequest from "./pages/VerifyPages/VerifyRequest";
import VipVerifyRequest from "./pages/VerifyPages/VipVerifyRequest";
import NonTransactionalRequest from "./pages/NonTransactionalPage/NonTransactionalRequest";

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
    {
        path: "/verify",
        element: <VerifyRequest />,
    },
    {
        path: "/vip-verify",
        element: <VipVerifyRequest />,
    },
    {
        path: "/non-transactional",
        element: <NonTransactionalRequest />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
