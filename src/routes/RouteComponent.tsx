import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { RouteProps, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { IFunctionGroup, useAuth } from "../contexts/AuthContext";
import { AppURL } from "../configs/consts";
import { PageUrl, setPageUrl } from "../pages/BaseLayout/BaseSlice";
import { useAppDispatch } from "../stores/Store";

interface IRouteComponent extends RouteProps {
  titleId: string;
  routeName?: string;
  element: React.ReactElement<any>;
  wrapper?: boolean;
  authExist?: boolean;
  pageUrl?: PageUrl[];
}

export const hasPermissionOn = (
  accessMenu: IFunctionGroup[],
  functionName: string,
  permissionId: string
) => {
  let index = -1;
  if (!permissionId) {
    index = accessMenu.findIndex((e: IFunctionGroup) => {
      return e.functionName === functionName && e.permission === permissionId;
    });
  } else {
    index = accessMenu.findIndex((e: IFunctionGroup) => {
      return (
        e.functionName === functionName && e.permission.includes(permissionId)
      );
    });
  }
  if (index < 0) return false;
  return true;
};

export const RouteComponent: FC<IRouteComponent> = ({
  wrapper,
  titleId,
  routeName,
  element,
  authExist,
  pageUrl,
  ...props
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const location = useLocation();

  const auth = useAuth();
  React.useEffect(() => {
    if (pageUrl) {
      dispatch(setPageUrl(pageUrl));
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pageUrl]);
  document.title = titleId ? t(titleId) : "";

  const hasAccessMenu = () => {
    return !!auth.accessMenu.length; // get access menu from user id
  };

  if (location.pathname === "/") {
    return <Navigate to={AppURL.DASHBOARD} replace={true} />;
  }

  if (wrapper) {
    if (authExist) {
      return hasAccessMenu() || auth.loading ? (
        React.cloneElement(element, { ...props })
      ) : (
        <Navigate to={AppURL.LOGIN} replace={true} />
      );
    } else {
      return React.cloneElement(element, { ...props });
    }
  }

  if (
    (hasAccessMenu() &&
      hasPermissionOn(auth.accessMenu, routeName as string, "R")) ||
    auth.loading
  ) {
    return React.cloneElement(element, { ...props }); // render BaseLayout Element (continue render Outlet inside BaseLayout)
  }

  if (
    hasAccessMenu() &&
    !hasPermissionOn(auth.accessMenu, routeName as string, "R")
  ) {
    return <Navigate to={AppURL.ERROR_PERMISSION} replace={true} />;
  }

  return <Navigate to={AppURL.LOGIN} replace={true} />;
};

export default RouteComponent;
