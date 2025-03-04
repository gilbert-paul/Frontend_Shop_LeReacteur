import { useActionState, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signup } from "../../actions/signup";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { Input } from "../../components/Input";
import { Loader } from "../../components/Loader";

const Signup = () => {
  const [state, formAction, isPending] = useActionState(signup, {
    success: false,
    error: false,
    result: { id: "", token: "", admin: false, message: "" },
  });

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const navigate = useNavigate();
  const { saveAuth } = useAuthContext();
  if (isPending || state.error) {
    return <Loader />;
  }

  if (state.success) {
    setTimeout(() => {
      saveAuth({
        id: state.result!.id,
        token: state.result!.token,
        admin: state.result!.admin,
      });
      navigate("/");
    }, import.meta.env.VITE_APP_DELAY_REDIRECTION);
  }

  return (
    <div>
      {state?.result?.message && <div>{state.result.message}</div>}
      {state.success ? (
        <div>Your account is created and you are connected !</div>
      ) : (
        <form>
          <div>
            <Input
              placeholder="Password"
              type={passwordIsVisible ? "text" : "password"}
              name="password"
            />
            <button
              type="button"
              onMouseDown={() => {
                setPasswordIsVisible(true);
              }}
              onMouseUp={() => {
                setPasswordIsVisible(false);
              }}
            >
              {passwordIsVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <Input placeholder="Username" type="text" name="username" />
          <Input placeholder="Email" type="email" name="email" />
          <button formAction={formAction}>Signup</button>
        </form>
      )}
    </div>
  );
};

export { Signup };
