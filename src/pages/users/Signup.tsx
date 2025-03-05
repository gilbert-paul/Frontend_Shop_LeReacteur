import { useActionState, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signup } from "../../actions/signup";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="bg-white m-4 p-4 flex flex-col justify-center items-center">
      {state.success ? (
        <div>Your account is created and you are connected !</div>
      ) : (
        <form className="flex flex-col gap-4 items-center">
          <div className="text-2xl">Sign Up</div>
          <span className="text-center">
            You have already an account ?{" "}
            <Link
              className="hover:text-secondary hover:cursor-pointer"
              to="/users/login"
            >
              Login
            </Link>{" "}
            !
          </span>
          <div className="p-4 w-fit flex flex-col gap-4">
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
              placeholder="Username"
              type="text"
              name="username"
            />
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
            Signup
          </button>
          {state?.result?.message && (
            <span className="text-red-600">{state.result.message}</span>
          )}
        </form>
      )}
    </div>
  );
};

export { Signup };
