import axios, { AxiosError } from "axios";
import { IUser } from "../../interfaces/IUser";
import { IAuth } from "../../interfaces/IAuth";

const fetchLogin = async (userInformations: IUser) => {
  const { password, email } = userInformations;
  if (!password && !email) {
    return {
      id: "",
      token: "",
      admin: false,
      message: "Inputs cannot be empty",
    };
  }
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_APP_BACK_URL}/user/login`,
      {
        password,
        email,
      }
    );
    return {
      id: result.data._id,
      token: result.data.token,
      admin: result.data?.admin ?? false,
    } as IAuth;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        id: "",
        token: "",
        admin: false,
        message: error.response?.data,
      };
    } else {
      return {
        id: "",
        token: "",
        admin: false,
        message: "Error... retry later...",
      };
    }
  }
};

export { fetchLogin };
