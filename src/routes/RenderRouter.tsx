import { FC, lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
// import WrapperRouteComponent from "./WrapperRouteComponent";
import Register from "pages/Register/Register";
import Login from "pages/Login/Login";
import RouteComponent from "./RouteComponent";

import Outlet from "components/Outlet/Outlet";
import EmailDetail from "pages/EmailManager/EmailDetail";
import DynamicForm from "pages/DynamicForm/DynamicForm";

const NotFound = lazy(() => import("pages/NotFound/NotFound"));
const Dashboard = lazy(() => import("pages/DashBoard/DashBoard"));
const EmailTemplate = lazy(() => import("pages/EmailTemplate/EmailTemplate"));
const VisitorLog = lazy(() => import("pages/VisitorLog/VisitorLog"));
const Schedule = lazy(() => import("pages/Schedule/Schedule"));
const HealthDeclaration = lazy(() => import("pages/HealthDeclaration/HealthDeclaration"));
const EmailLogsForm = lazy(() => import("pages/EmailLogsForm/EmailLogsForm"));
const EventsManagement = lazy(() => import("pages/EventsManagement/EventsManagement"));
const MenuManager = lazy(() => import("pages/MenuManager/MenuList"));
const MenuDetail = lazy(() => import("pages/MenuManager/MenuDetail"));
const PermissionFeatures = lazy(() => import("pages/Group/PermissionFeatures"));
const Role = lazy(() => import("pages/Role/Role"));
const Visitors = lazy(() => import("pages/Visitors/Visitors"));
const Employee = lazy(() => import("pages/Employee/Employee"));
const ErrorPermissionDenied = lazy(() => import("pages/Error/PermissionDenied"));
const Feature = lazy(() => import("pages/Feature/FeatureList"));
const FeatureDetail = lazy(() => import("pages/Feature/FeatureDetail"));
const PermissionManager = lazy(() => import("pages/Permission/PermissionList"));
const GroupManager = lazy(() => import("pages/GroupManager/GroupList"));
const PermissionDetails = lazy(() => import("pages/Permission/PermissionDetails"));
const GroupDetails = lazy(() => import("pages/GroupManager/GroupDetails"));
const AccountSettings = lazy(() => import("pages/AccountSettings/AccountSettings"));
const UserDetail = lazy(() => import("pages/UserManager/UserDetail"));
const UserList = lazy(() => import("pages/UserManager/UserList"));
const JobList = lazy(() => import("pages/JobManager/JobList"));
const JobDetail = lazy(() => import("pages/JobManager/JobDetail"));
const JobLogsList = lazy(() => import("pages/JobLogs/JobLogsList"));
const JobLogsDetail = lazy(() => import("pages/JobLogs/JobLogsDetail"));
const EmailList = lazy(() => import("pages/EmailManager/EmailList"));
const SystemSetting = lazy(() =>import("pages/SystemSetting/SystemSettingList"))
const SystemSettingDetails = lazy(() => import('pages/SystemSetting/SystemSettingDetail'))
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
    element: <RouteComponent element={<Outlet />} titleId="dashboard" wrapper />,
    children: [
      {
        path: "dashboard",
        element: (
          <RouteComponent
            element={<Dashboard />}
            titleId="menu.dashboard"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.dashboard",
              },
            ]}
          />
        ),
      },

      {
        path: "user-manager/edit/:userId",
        element: (
          <RouteComponent
            element={<UserDetail />}
            titleId="menu.edit_user"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.user_detail",
                url: "/user-manager"
              },
              {
                title: "detail.edit",
              },
            ]}
          />
        ),
      },
      {
        path: "user-manager/view/:userId",
        element: (
          <RouteComponent
            element={<UserDetail />}
            titleId="menu.user_detail"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.user_detail",
                url: "/user-manager"
              },
              {
                title: "detail.view",
              },
            ]}
          />
        ),
      },
      {
        path: "user-manager/add",
        element: (
          <RouteComponent
            element={<UserDetail />}
            titleId="menu.add_user"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.user_manager",
                url: "/user-manager"
              },
              {
                title: "detail.create",
              },
            ]}
          />
        ),
      },
      {
        path: "user-manager",
        element: (
          <RouteComponent
            element={<UserList />}
            titleId="menu.user_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.user_manager",
              },
            ]}
          />
        ),
      },
      {
        path: "job-manager",
        element: (
          <RouteComponent
            element={<JobList />}
            titleId="menu.job_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              
              {
                title: "menu.job_manager",
              },
            ]}
          />
        ),
      },
      {
        path: "job-manager/edit/:id",
        element: (
          <RouteComponent
            element={<JobDetail />}
            titleId="menu.job_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.job_manager",
                url: "/job-manager"
              },
              {
                title: "detail.edit",
              },
            ]}
          />
        ),
      },
      {
        path: "jobLogs",
        element: (
          <RouteComponent
            element={<JobLogsList />}
            titleId="menu.job_logs_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.job_logs_manager",
              },
            ]}
          />
        ),
      },
      {
        path: "jobLogs/add",
        element: (
          <RouteComponent
            element={<JobLogsDetail />}
            titleId="menu.job_logs_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.job_logs_manager",
                url: "/jobLogs"
              },
              {
                title: "detail.create",
              },
            ]}
          />
        ),
      },
      {
        path: "email-manager",
        element: (
          <RouteComponent
            element={<EmailList />}
            titleId="menu.email_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.email_manager",
              },
            ]}
          />
        ),
      },
      {
        path: "email-manager/edit/:id",
        element: (
          <RouteComponent
            element={<EmailDetail />}
            titleId="menu.email_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.email_manager",
                url: "/email-manager"
              },
              {
                title: "detail.edit",
              },
            ]}
          />
        ),
      },
      {
        path: "email-templates",
        element: (
          <RouteComponent
            element={<EmailTemplate />}
            titleId="menu.email_templates"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.email_templates",
              },
            ]}
          />
        ),
      },
      {
        path: "email-templates/create",
        element: (
          <RouteComponent
            element={<EmailLogsForm />}
            titleId="menu.email_templates"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.email_templates",
              },
            ]}
          />
        ),
      },
      {
        path: "email-templates/edit/:templateId",
        element: (
          <RouteComponent
            element={<EmailLogsForm />}
            titleId="menu.email_templates"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.email_templates",
              },
            ]}
          />
        ),
      },
      {
        path: "visitorLogs",
        element: (
          <RouteComponent
            element={<VisitorLog />}
            titleId="menu.serviceRequest"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.serviceRequest",
              },
            ]}
          />
        ),
      },
      {
        path: "contacts",
        element: (
          <RouteComponent
            element={<Employee />}
            titleId="menu.serviceRequest"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.serviceRequest",
              },
            ]}
          />
        ),
      },
      {
        path: "events",
        element: (
          <RouteComponent
            element={<EventsManagement />}
            titleId="menu.event_management"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.event_management",
              },
            ]}
          />
        ),
      },
      {
        path: "invitation",
        element: (
          <RouteComponent
            element={<HealthDeclaration />}
            titleId="menu.invitation"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.invitation",
              },
            ]}
          />
        ),
      },
      {
        path: "menu-manager",
        element: (
          <RouteComponent
            element={<MenuManager />}
            titleId="menu.roles_management"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.roles_management",
              },
            ]}
          />
        ),
      },
      {
        path: "menu-manager/create",
        element: (
          <RouteComponent
            element={<MenuDetail />}
            titleId="menu.roles_management"
            routeName={"FN_DASHBOARD"}
            pageUrl={[ 
              {
                title: "menu.roles_management",
                url: "/menu-manager"
              },
              {
                title: "detail.create",
              }
            ]}
          />
        ),
      },
      {
        path: "menu-manager/edit/:id",
        element: (
          <RouteComponent
            element={<MenuDetail />}
            titleId="menu.roles_management"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.roles_management",
                url: "/menu-manager"
              },
              {
                title: "detail.edit",
              }
            ]}
          />
        ),
      },
      {
        path: "menu-manager/view/:id",
        element: (
          <RouteComponent
            element={<MenuDetail />}
            titleId="menu.roles_management"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.roles_management",
                url: "/menu-manager"
              },
              {
                title: "detail.view",
              }
            ]}
          />
        ),
      },
      {
        path: "schedule",
        element: (
          <RouteComponent
            element={<Schedule />}
            titleId="menu.roles_management"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.roles_management",
              },
            ]}
          />
        ),
      },
      {
        path: "permission-feature",
        element: (
          <RouteComponent
            element={<PermissionFeatures />}
            titleId="menu_group.permission_feature"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu_group.permission_feature",
              },
            ]}
          />
        ),
      },
      {
        path: "permission",
        element: (
          <RouteComponent
            element={<Role />}
            titleId="menu.roles_management"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.roles_management",
              },
            ]}
          />
        ),
      },
      {
        path: "visitors",
        element: (
          <RouteComponent
            element={<Visitors />}
            titleId="menu.visitors_management"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.visitors_management",
              },
            ]}
          />
        ),
      },
      {
        path: "account-settings",
        element: (
          <RouteComponent
            element={<AccountSettings />}
            titleId="account_settings.account"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "account_settings.account",
              },
            ]}
          />
        ),
      },
      {
        path: "system-settings",
        element: (
          <RouteComponent
            element={<SystemSetting />}
            titleId="system_settings.system_setting"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "system_settings.system_setting",
              },
            ]}
          />
        ),
      },
      {
        path: "system-settings/view/:id",
        element: (
          <RouteComponent
            element={<SystemSettingDetails />}
            titleId="system_settings.system_setting"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "system_settings.system_setting",
              },
            ]}
          />
        ),
      },
      {
        path: "system-settings/create",
        element: (
          <RouteComponent
            element={<SystemSettingDetails />}
            titleId="system_settings.system_setting"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.feature",
                url: "/system-settings"
              },
              {
                title: "detail.create",
              },
            ]}
          />
        ),
      },
      {
        path: "system-settings/edit/:id",
        element: (
          <RouteComponent
            element={<SystemSettingDetails />}
            titleId="system_settings.system_setting"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "system_settings.system_setting",
              },
            ]}
          />
        ),
      },
      {
        path: "features",
        element: (
          <RouteComponent
            element={<Feature />}
            titleId="menu.feature"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.feature",
              },
            ]}
          />
        ),
      },

      {
        path: "features/create",
        element: (
          <RouteComponent
            element={<FeatureDetail />}
            titleId="menu.feature"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.feature",
                url: "/features"
              },
              {
                title: "detail.create",
              },
            ]}
          />
        ),
      },

      {
        path: "features/edit/:id",
        element: (
          <RouteComponent
            element={<FeatureDetail />}
            titleId="menu.feature"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.feature",
                url: "/features"
              },
              {
                title: "detail.edit",
              },
            ]}
          />
        ),
      },

      {
        path: "features/view/:id",
        element: (
          <RouteComponent
            element={<FeatureDetail />}
            titleId="menu.feature"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.feature",
                url: "/features"
              },
              {
                title: "detail.view",
              },
            ]}
          />
        ),
      },

      {
        path: "error/permission-denied",
        element: (
          <RouteComponent
            element={<ErrorPermissionDenied />}
            titleId="menu.error_permission_denied"
            wrapper
            authExist
            pageUrl={[
              {
                title: "menu.error_permission_denied",
              },
            ]}
          />
        ),
      },
      {
        path: "permission-manager",
        element: (
          <RouteComponent
            element={<PermissionManager />}
            titleId="menu.permission_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.permission_manager",
              },
            ]}
          />
        ),
      },
      {
        path: "permission-manager/view/:id",
        element: (
          <RouteComponent
            element={<PermissionDetails />}
            titleId="menu.permission_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.permission_manager",
                url: "/permission-manager",
              },
              {
                title: "detail.view",
              },
            ]}
          />
        ),
      },
      {
        path: "permission-manager/edit/:id",
        element: (
          <RouteComponent
            element={<PermissionDetails />}
            titleId="menu.permission_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.permission_manager",
                url: "/permission-manager",
              },
              {
                title: "detail.edit",
              },
            ]}
          />
        ),
      },
      {
        path: "permission-manager/create",
        element: (
          <RouteComponent
            element={<PermissionDetails />}
            titleId="menu.permission_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.permission_manager",
                url: "/permission-manager",
              },
              {
                title: "detail.create",
              },
            ]}
          />
        ),
      },
      {
        path: "group-manager",
        element: (
          <RouteComponent
            element={<GroupManager />}
            titleId="menu.group_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.group_manager",
              },
            ]}
          />
        ),
      },
      {
        path: "group-manager/view/:id",
        element: (
          <RouteComponent
            element={<GroupDetails />}
            titleId="menu.group_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.group_manager",
                url: "/group-manager",
              },
              {
                title: "detail.view",
              },
            ]}
          />
        ),
      },
      {
        path: "group-manager/edit/:id",
        element: (
          <RouteComponent
            element={<GroupDetails />}
            titleId="menu.group_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.group_manager",
                url: "/group-manager",
              },
              {
                title: "detail.edit",
              },
            ]}
          />
        ),
      },
      {
        path: "group-manager/create",
        element: (
          <RouteComponent
            element={<GroupDetails />}
            titleId="menu.group_manager"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
               
              {
                title: "menu.group_manager",
                url: "/group-manager",
              },
              {
                title: "detail.create",
              },
            ]}
          />
        ),
      },
      {
        path: "dynamic-form",
        element: (
          <RouteComponent
            element={<DynamicForm />}
            titleId="menu.dynamic_form"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.dynamic_form",
              },
            ]}
          />
        ),
      },
      {
        path: "",
        element: (
          <RouteComponent
            element={<Dashboard />}
            titleId="menu.dashboard"
            routeName={"FN_DASHBOARD"}
            pageUrl={[
              {
                title: "menu.dashboard",
              },
            ]}
          />
        ),
      },
      {
        path: "*",
        element: (
          <RouteComponent
            element={<NotFound />}
            titleId="menu.not_found"
            wrapper
            authExist
            pageUrl={[
              {
                title: "menu.not_found",
              },
            ]}
          />
        ),
      },
    ],
  },
];
const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return <Suspense fallback={""}>{element}</Suspense>;
};

export default RenderRouter;
