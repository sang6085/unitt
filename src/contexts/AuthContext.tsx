import React, { createContext, useContext } from "react";
import { getAccessMenu, getProfile } from "services/AccountService";
import { Observable } from "rxjs";
import { IAuthenticationToken } from "pages/Login/LoginInterface";
import { useAppDispatch, useAppSelector } from "stores/Store";
import { getVisitorId } from "utils/helper";
import { setProfile } from "pages/AccountSettings/AccountSlice";

export interface IFunctionGroup {
  functionName: string;
  permission: string;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContextProps {
  token: string;
  refreshToken: string;
  accessMenu: IFunctionGroup[];
  keepLocation: boolean;
  loading: boolean;
  visitorId: string;
}

const authContext = createContext<IAuthContextProps>({
  token: "",
  refreshToken: "",
  accessMenu: [],
  keepLocation: true,
  loading: true,
  visitorId: "",
});

export function AuthProvider({ children }: IAuthProviderProps) {
  const dispatch = useAppDispatch();
  const [isAccessMenu, setAccessMenu] = React.useState<IFunctionGroup[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [visitorId, setVisitorId] = React.useState<string>("");
  const authToken: IAuthenticationToken | undefined = useAppSelector(
    (state) => state.login.authToken
  );
  const auth = useAuthProvider(authToken, isLoading, isAccessMenu, visitorId);

  React.useEffect(() => {
    async function getMenu() {
      if (authToken?.accessToken) {
        setVisitorId(await getVisitorId());
        const resGetProfile = () => (dispatch: any) => {
          const res = new Observable((subscriber) => {
            getProfile().subscribe((response: any) => {
              if (response?.data.success) {
                dispatch(setProfile(response.data.data));
              }
              subscriber.next(response);
            });
          });
          return res;
        };

        dispatch(resGetProfile()).subscribe({
          next(response: any) {
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
    accessMenu: [],
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
  authToken: IAuthenticationToken | undefined,
  isLoading: boolean,
  accessMenuProps: IFunctionGroup[],
  visitorId: string
) {
  const token: string = authToken?.accessToken ?? "";
  const refreshToken: string = authToken?.refreshToken ?? "";
  const accessMenu = accessMenuProps;
  const keepLocation = true;
  const loading = isLoading;

  return {
    token,
    refreshToken,
    accessMenu,
    keepLocation,
    loading,
    visitorId,
  } as IAuthContextProps;
}
