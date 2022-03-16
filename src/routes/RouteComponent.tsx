import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { RouteProps } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { AppURL } from "../configs/consts";
import { useTranslation } from "react-i18next";
import { hasPermissionOn } from "../utils/permission";

interface IRouteComponent extends RouteProps {
  titleId: string;
  routeNumber?: string;
  element: React.ReactElement<any>;
  wrapper?: boolean;
}

export const RouteComponent: FC<IRouteComponent> = ({ wrapper, children, titleId, routeNumber, element, ...props }) => {
  const { t } = useTranslation();
  const getWrapper = wrapper ?? false;

  const auth = useAuth();
  if (titleId) {
    document.title = t(titleId);
  }

  const hasRouteMenuOn = () => {
    if (auth.menuNumbers.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  if (getWrapper) {
    return React.cloneElement(element, { ...props });
  } else {
    return (hasRouteMenuOn() && hasPermissionOn(auth.menuNumbers, routeNumber as string, "R")) || auth.loading ? (
      React.cloneElement(element, { ...props })
    ) : (hasRouteMenuOn() && !hasPermissionOn(auth.menuNumbers, routeNumber as string, "R")) || auth.loading ? (
      <Navigate to={AppURL.DASHBOARD} replace={true} />
    ) : (
      <Navigate to={AppURL.LOGIN} replace={true} />
    );
  }
};

export default RouteComponent;
