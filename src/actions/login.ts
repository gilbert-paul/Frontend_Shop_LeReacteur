import { IAuth } from "../interfaces/IAuth";
import { fetchLogin } from "../utils/users/fetchLogin";

const login = async (
  previousState: { success: boolean; error: boolean; result: IAuth | null },
  formData: FormData
) => {
  const password = formData.get("password");
  const email = formData.get("email");
  if (typeof password === "string" && typeof email === "string") {
    const result = await fetchLogin({ password, email });
    if (!password || !email) {
      return {
        ...previousState,
        success: false,
        error: false,
        result: { id: "", token: "", admin: false, message: "inputs empty" },
      };
    }
    else if (result?.id) {
      return { ...previousState, success: true, error: false, result };
    } else {
      return { ...previousState, success: false, result };
    }
  } else {
    return { ...previousState, success: false, error: true };
  }
};

export { login };
