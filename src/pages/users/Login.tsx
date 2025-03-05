import { useActionState, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../actions/login";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { Input } from "../../components/Input";
import { Loader } from "../../components/Loader";

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
    <div className="bg-white m-4 p-4 flex flex-col justify-center items-center">
      {state.success ? (
        <div className="text-secondary">You are connected !</div>
      ) : (
        <form className="flex flex-col gap-4 items-center">
          <div className="text-2xl">Login</div>
          <span className="text-center">
            Don't have an account yet ?{" "}
            <Link
              className="hover:text-secondary hover:cursor-pointer"
              to="/users/signup"
            >
              Sign Up
            </Link>{" "}
            !
          </span>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-center items-center gap-4">
              <Input
                className="w-40 sm:w-fit"
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
                onTouchStart={() => {
                  setPasswordIsVisible(true);
                }}
                onTouchEnd={() => {
                  setPasswordIsVisible(false);
                }}
              >
                {passwordIsVisible ? (
                  <FaEye color="#e67e22" />
                ) : (
                  <FaEyeSlash color="#2ecc71" />
                )}
              </button>
            </div>
            <Input
              className="w-40 sm:w-fit"
              placeholder="Email"
              type="email"
              name="email"
            />
          </div>
          <button
            className="border-1 py-3 px-4 hover:cursor-pointer hover:bg-secondary hover:opacity-80"
            formAction={formAction}
          >
            Login
          </button>
          {state?.result?.message === "Unauthorized" && (
            <span className="text-red-600">Invalid password or email !</span>
          )}
          {state?.result?.message === "inputs empty" && (
            <span className="text-red-600">Inputs cannot be empty...</span>
          )}
        </form>
      )}
    </div>
  );
};

export { Login };
