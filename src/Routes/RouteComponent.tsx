import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { RouteProps } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import { AppURL } from "../configs/consts";
import { useTranslation } from "react-i18next";
import { hasPermissionOn } from "../utils/permission";

interface IRouteComponent extends RouteProps {
  titleId: string;
  routeName?: string;
  element: React.ReactElement<any>;
  wrapper?: boolean;
  authExist?: boolean;
}

export const RouteComponent: FC<IRouteComponent> = ({
  wrapper,
  titleId,
  routeName,
  element,
  authExist,
  ...props
}) => {
  const { t } = useTranslation();
  
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

  if (wrapper && !authExist) { 
    return React.cloneElement(element, { ...props }); 
  } 
  
  if (wrapper && authExist) {
    return hasRouteMenuOn() ? (
      React.cloneElement(element, { ...props }) 
    ) : (
      <Navigate to={AppURL.LOGIN} replace={true} />
    );
  } 

  if((hasRouteMenuOn() && hasPermissionOn(auth.menuNumbers, routeName as string, "R")) ||auth.loading) {
    return React.cloneElement(element, { ...props }) // render BaseLayout Element (continue render Outlet inside BaseLayout)
  }

  if((hasRouteMenuOn() && !hasPermissionOn(auth.menuNumbers, routeName as string, "R")) || auth.loading) {
    return <Navigate to={AppURL.ERROR_PERMISSION} replace={true} />
  }

  return <Navigate to={AppURL.LOGIN} replace={true} />
  
};

export default RouteComponent;
