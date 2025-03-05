import { IAuth } from "../interfaces/IAuth";
import { fetchSignup } from "../utils/users/fetchSignup";

const signup = async (
  previousState: { success: boolean; error: boolean; result: IAuth | null },
  formData: FormData
) => {
  const password = formData.get("password");
  const username = formData.get("username");
  const email = formData.get("email");
  if (
    typeof password === "string" &&
    typeof username === "string" &&
    typeof email === "string"
  ) {
    const result = await fetchSignup({ password, email, username });
    if (result?.id) {
      return { ...previousState, success: true, error: false, result };
    } else {
      return { ...previousState, success: false, result };
    }
  } else {
    return { ...previousState, success: false, error: true };
  }
};

export { signup };
