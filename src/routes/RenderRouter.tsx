import { FC, lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
// import WrapperRouteComponent from "./WrapperRouteComponent";
// import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";
// import Request from "../pages/Request/Request";
import RouteComponent from "./RouteComponent";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const BaseLayout = lazy(() => import("../pages/BaseLayout/BaseLayout"));

const routeList: any = [
  {
    path: "/login",
    element: (
      <RouteComponent element={<Login />} titleId="login.login" wrapper />
    ),
  },

  {
    path: "/",
    element: (
      <RouteComponent element={<BaseLayout />} titleId="dashboard" wrapper />
    ),

    children: [
      {
        path: "dashboard",
        element: (
          <RouteComponent
            element={<Dashboard />}
            titleId="menu.dashboard"
            routeNumber={"FN_DASHBOARD"}
            wrapper
          />
        ),
      },
    ],
  },
];
const RenderRouter: React.FC = () => {
  const element = useRoutes(routeList);
  return <Suspense fallback={""}>{element}</Suspense>;
};

export default RenderRouter;
