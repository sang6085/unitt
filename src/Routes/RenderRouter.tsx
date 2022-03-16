import { FC, lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
// import WrapperRouteComponent from "./WrapperRouteComponent";
import RouteComponent from "./RouteComponent";
import Register from "../pages/Register/Register"
import Login from "../pages/Login/Login";

const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const BaseLayout = lazy(() => import("../pages/BaseLayout/BaseLayout"));
const Dashboard = lazy(() => import("../pages/DashBoard/DashBoard"));
const EmailTemplate = lazy(() => import("../pages/EmailTemplate/EmailTemplate"));
const VisitorLog = lazy(() => import("../pages/VisitorLog/VisitorLog"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Schedule = lazy(() => import("../pages/Schedule/Schedule"));
const HealthDeclaration = lazy(() => import("../pages/HealthDeclaration/HealthDeclaration"));
const EmailLogsForm = lazy(() => import("../pages/EmailLogsForm/EmailLogsForm"));
const EventsManagement = lazy(() => import("../pages/EventsManagement/EventsManagement"));
const MenuManager = lazy(() => import("../pages/MenuManager/MenuManager"));
const UpdateMenu = lazy(() => import("../pages/MenuManager/UpdateMenu"));
const Group = lazy(() => import("../pages/Group/Group"));
const Role = lazy(() => import("../pages/Role/Role"));
const Visitors = lazy(() => import("../pages/Visitors/Visitors"));
const Employee = lazy(() => import("../pages/Employee/Employee"));
const ErrorPerrmissionDenied = lazy(() => import("../pages/Error/PermissionDenied")); 


const routeList: any = [
  {
    path: "/login",
    element: <RouteComponent element={<Login />} titleId="login.login" wrapper />,
  },
  {
    path: "/register",
    element: <RouteComponent element={<Register />} titleId="menu.register" wrapper />,
  },
  {
    path: "/",
    element: <RouteComponent element={<BaseLayout />} titleId="dashboard" wrapper />,
    children: [
      {
        path: "dashboard",
        element: <RouteComponent element={<Dashboard />} titleId="menu.dashboard" routeName={"FN_DASHBOARD"} />,
      },
      {
        path: "email-templates",
        element: (
          <RouteComponent element={<EmailTemplate />} titleId="menu.email_templates" routeName={"FN_DASHBOARD"} />
        ),
      },
      {
        path: "email-templates/create",
        element: (
          <RouteComponent element={<EmailLogsForm />} titleId="menu.email_templates" routeName={"FN_DASHBOARD"} />
        ),
      },
      {
        path: "email-templates/edit/:templateId",
        element: (
          <RouteComponent element={<EmailLogsForm />} titleId="menu.email_templates" routeName={"FN_DASHBOARD"} />
        ),
      },
      {
        path: "visitorLogs",
        element: <RouteComponent element={<VisitorLog />} titleId="menu.serviceRequest" routeName={"FN_DASHBOARD"} />,
      },
      {
        path: "contacts",
        element: <RouteComponent element={<Employee />} titleId="menu.serviceRequest" routeName={"FN_DASHBOARD"} />,
      },
      {
        path: "events",
        element: (
          <RouteComponent element={<EventsManagement />} titleId="menu.event_management" routeName={"FN_DASHBOARD"} />
        ),
      },
      {
        path: "profile",
        element: <RouteComponent element={<Profile />} titleId="menu.profile" routeName={"FN_DASHBOARD"} />,
      },
      {
        path: "invitation",
        element: (
          <RouteComponent element={<HealthDeclaration />} titleId="menu.invitation" routeName={"FN_DASHBOARD"} />
        ),
      },
      {
        path: "menu-manager",
        element: (
          <RouteComponent element={<MenuManager />} titleId="menu.roles_management" routeName={"FN_DASHBOARD"} />
        ),
      },
      {
        path: "menu-manager/add",
        element: (
          <RouteComponent element={<UpdateMenu />} titleId="menu.roles_management" routeName={"FN_DASHBOARD"} />
        ),
      },
      {
        path: "menu-manager/edit/:id",
        element: (
          <RouteComponent element={<UpdateMenu />} titleId="menu.roles_management" routeName={"FN_DASHBOARD"} />
        ),
      },
      {
        path: "schedule",
        element: <RouteComponent element={<Schedule />} titleId="menu.roles_management" routeName={"FN_DASHBOARD"} />,
      },
      {
        path: "menu-group",
        element: <RouteComponent element={<Group />} titleId="menu.roles_management" routeName={"FN_DASHBOARD"} />,
      },
      {
        path: "permission",
        element: <RouteComponent element={<Role />} titleId="menu.roles_management" routeName={"FN_DASHBOARD"} />,
      },
      {
        path: "visitors",
        element: <RouteComponent element={<Visitors />} titleId="menu.visitors_management" routeName={"FN_DASHBOARD"} />,
      },
      {
        path: "error/permission-denied",
        element: <RouteComponent element={<ErrorPerrmissionDenied />} titleId="menu.error_permission_denied" wrapper authExist />,
      },
      {
        path: "*",
        element: <RouteComponent element={<NotFound />} titleId="menu.not_found" wrapper authExist />,
      },
    ],
  },
  
];
const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return <Suspense fallback={""}>{element}</Suspense>;
};

export default RenderRouter;
