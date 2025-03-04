import { useActionState, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../actions/login";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { Input } from "../../components/Input";

const Login = () => {
  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    error: false,
    result: { id: "", token: "", admin: false, message: "" },
  });

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const navigate = useNavigate();
  const { saveAuth } = useAuthContext();

  if (isPending || state.error) {
    return <div>Loading</div>;
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
      {state?.result?.message === "Unauthorized" && (
        <div>Invalid password or email !</div>
      )}
      {state.success ? (
        <div>You are connected !</div>
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
          <Input
            placeholder="Email"
            type="email"
            name="email"
          />
          <button formAction={formAction}>Login</button>
        </form>
      )}
    </div>
  );
};

export { Login };
