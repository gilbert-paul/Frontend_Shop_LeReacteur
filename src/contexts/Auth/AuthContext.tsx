import { IAuth, IAuthContext } from "../../interfaces/IAuth";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import Cookies from 'js-cookie'

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<IAuth | null>(null);
  const [loading, setLoading] = useState(true);

  const isIAuth = (obj: object): obj is IAuth => {
    return "id" in obj && "token" in obj;
  };

  const loadAuth = useCallback(async () => {
    try {
      const storedStringAuth = Cookies.get("auth");
      if (!storedStringAuth) {
        setLoading(false);
        return;
      }

      const parsedAuth = JSON.parse(storedStringAuth);
      if (!(parsedAuth instanceof Object) || !isIAuth(parsedAuth)) {
        setLoading(false);
        return;
      }
      setAuth(parsedAuth);
      setLoading(false);
    } catch (error) {
      console.log("Can't access async storage: ", error);
    }
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  const saveAuth = async (auth: IAuth) => {
    try {
      setAuth(auth);
      const stringAuth = JSON.stringify(auth);
      Cookies.set("auth", stringAuth);
    } catch (error) {
      console.log("Can't save in async storage: ", error);
    }
  };

  const removeAuth = async () => {
    try {
      setAuth(null);
      Cookies.remove("auth");
    } catch (error) {
      console.log("Can't remove from async storage: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, removeAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthProvider, AuthContext };
