import React, { createContext, useContext } from "react";
import { getAccessMenu, getProfile } from "../services/AccountService";
import { AuthenticationToken } from "../pages/Login/LoginInterface";
import { useAppDispatch, useAppSelector } from "../stores/Store";
import { getVisitorId } from "../utils/helper";

export interface IFunctionGroup {
  functionName: string;
  permission: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextProps {
  token: string;
  refreshToken: string;
  menuNumbers: IFunctionGroup[];
  keepLocation: boolean;
  loading: boolean;
  visitorId: string;
}

const authContext = createContext<AuthContextProps>({
  token: "",
  refreshToken: "",
  menuNumbers: [],
  keepLocation: true,
  loading: true,
  visitorId: "",
});

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const [isAccessMenu, setAccessMenu] = React.useState<IFunctionGroup[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [visitorId, setVisitorId] = React.useState<string>("");
  const authToken: AuthenticationToken | undefined = useAppSelector(
    (state) => state.login.authToken
  );
  const auth = useAuthProvider(authToken, isLoading, isAccessMenu, visitorId);

  React.useEffect(() => {
    async function getMenu() {
      if (authToken?.accessToken) {
        setVisitorId(await getVisitorId());
        dispatch(getProfile()).subscribe({
          next(response: any) {
            // console.log(response);
            getAccessMenu(response.data.data.accountId).subscribe({
              next(response: any) {
                setAccessMenu(response.data.success ? response.data.data : []);
              },
              complete() {
                setLoading(false);
              },
            });
          },
        });
      } else {
        setAccessMenu([]);
        setLoading(false);
      }
      // setLoading(false);
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
    <authContext.Provider value={authToken?.accessToken ? auth : initialAuth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function useAuthProvider(
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

  return {
    token,
    refreshToken,
    menuNumbers,
    keepLocation,
    loading,
    visitorId,
  } as AuthContextProps;
}
