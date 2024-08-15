import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

import Membar from "../pages/private/member/Membar";
import Deposit from "../pages/private/deposit/Deposit";
import Market from "../pages/private/market/Market";
import Meal from "../pages/private/meal/Meal";
import Summary from "../pages/private/summary/Summary";
import PrivateRoute from "./PrivateRoute";
import Registration from "../pages/public/registration/Registration";
import Login from "../pages/public/login/Login";
import Dashboard from "../pages/private/dashboard/Dashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
             <Root />

        </PrivateRoute>     
      ),
      // errorElement: <ErrorPage/>
      children: [
        {
          path: "/",
          element: <Dashboard/>
        },
        {
          path: "/membar",
          element: <Membar/>,
        },
        {
          path: "/deposit",
          element: <Deposit/>,
        },
        {
          path: "/market",
          element: <Market/>,
        },
        {
          path: "/meal",
          element: <Meal />,
        },
        {
          path: "/summary",
          element: <Summary />,
        },
        
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
  ]);
  