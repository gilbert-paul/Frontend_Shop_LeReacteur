interface IAuth {
  id: string;
  token: string;
  admin:boolean;
  message?:string,
}

interface IAuthContext {
  auth: IAuth | null;
  loading: boolean;
  saveAuth: (auth: IAuth) => void;
  removeAuth: () => void;
}

export type {IAuth, IAuthContext}