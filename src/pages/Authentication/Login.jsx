import Lottie from "lottie-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import myAnimation from "../../assets/loginAnimation.json";
import { AuthContext } from "../../provider/AuthProvider";
import logo2 from "/public/charity.png";

const Login = () => {
  const navigate = useNavigate();
  // react hook form here
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle sign in with email and password
  const handleSignIn = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Sign in successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in");
    }
  };
  const { signIn, signInWithGoogle, signInWithGithub, setLoading } =
    useContext(AuthContext);
  // handle google signin async await way
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Sign in with google successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in with google");
      setLoading(false);
    }
  };
  // github signin
  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      toast.success("Sign in with Github successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in with Github");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-82px)] flex items-center ">
      <div className="flex items-center w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2" style={{}}>
          <Lottie className="p-5" animationData={myAnimation} />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center">
            <img src={logo2} className="size-16 " />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-ghost  flex items-center gap-2"
            >
              <FaGoogle /> Sign in with Google
            </button>
            <div className="divider lg:divider-horizontal"></div>

            <button
              onClick={handleGithubSignIn}
              className="btn btn-ghost  flex items-center gap-2"
            >
              <FaGithub /> Sign in with Github
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          {/* form here */}
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please Provide a valid email address",
                  },
                })}
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                id="loggingPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or <Link to={"/register"}>sign up</Link>
            </a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
