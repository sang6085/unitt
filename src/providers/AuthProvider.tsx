import React, { createContext, useContext } from "react";
import { getAccessMenu, getProfile } from "../api/Account";
import { AuthenticationToken } from "../pages/Login/LoginInterface";
import { useAppDispatch, useAppSelector } from "../stores/Store";
import { getVisitorId } from "../utils/helper";

export interface IFunctionGroup {
  functionName: string;
  permission: string;
}

export interface IAuth {
  token: string;
  refreshToken: string;
  menuNumbers: IFunctionGroup[];
  keepLocation: boolean;
  loading: boolean;
  visitorId: string;
}

const authContext = createContext<IAuth>({
  token: "",
  refreshToken: "",
  menuNumbers: [],
  keepLocation: true,
  loading: true,
  visitorId: "",
});

export function ProvideAuth(props: any) {
  const dispatch = useAppDispatch();
  const [isAccessMenu, setAccessMenu] = React.useState<IFunctionGroup[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [visitorId, setVisitorId] = React.useState<string>("");
  const authToken: AuthenticationToken | undefined = useAppSelector((state) => state.user.authToken);
  const auth = useProvideAuth(authToken, isLoading, isAccessMenu, visitorId);

  React.useEffect(() => {
    async function getMenu() {
      if (authToken?.accessToken) {
        setVisitorId(await getVisitorId());
        const profile: any = await dispatch(getProfile());
        const menu= profile
          ? await getAccessMenu(profile.accountId)
          : [
              {
                functionName: "",
                permission: "",
              },
            ];
        // console.log(menu);
        setAccessMenu(menu.success && menu.data.length > 0 ? menu.data : menu);
      } else {
        setAccessMenu([]);
      }
      setLoading(false);
    }
    getMenu();
  }, [authToken, dispatch]);

  const initialAuth = {
    token: "",
    refreshToken: "",
    menuNumbers: [],
    keepLocation: true,
    loading: isLoading,
    visitorId,
  };

  return (
    <authContext.Provider value={authToken?.accessToken ? auth : initialAuth}>{props.children}</authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth(
  authToken: AuthenticationToken | undefined,
  isLoading: boolean,
  accessMenu: IFunctionGroup[],
  visitorId: string
) {
  const token: string = authToken?.accessToken ?? "";
  const refreshToken: string = authToken?.refreshToken ?? "";
  const menuNumbers = accessMenu;
  const keepLocation = true;
  const loading = isLoading;

  return { token, refreshToken, menuNumbers, keepLocation, loading, visitorId } as IAuth;
}
