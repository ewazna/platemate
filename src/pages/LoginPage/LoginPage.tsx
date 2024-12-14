import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from "../../hooks/useMediaQuery/useMediaQuery";
import { LoginFormFields } from "./LoginFormFields";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import IconButton from "../../components/IconButton/IconButton";
import Input from "../../components/Input/Input";
import AuthContext from "../../components/AuthProvider/AuthProvider";
import ToastContext from "../../components/Toast/ToastProvider";
import ResetPasswordModal from "./components/ResetPasswordModal/ResetPasswordModal";

function LoginPage() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isResetPasswordShown, setIsResetPasswordShown] = useState(false);
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const { login, loginWithGoogle, loginWithFacebook } = useContext(AuthContext);

  const googleIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="35"
      height="35"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );

  const facebookIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="35"
      height="35"
      viewBox="0 0 48 48"
    >
      <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
      <path
        fill="#fff"
        d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
      ></path>
    </svg>
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormFields>({ disabled: isLoading });

  const onSubmit: SubmitHandler<LoginFormFields> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      await login(email, password);
      navigate(`/recipes`);
    } catch (err) {
      if ((err as { code: string }).code === "auth/invalid-credential") {
        setInvalidCredentialsMessage("Incorrect email or password");
      }
      showToast("error", "Login user failed");
    }
    setIsLoading(false);
  };

  const handleEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleCloseResetPassword = () => {
    setIsResetPasswordShown(false);
  };

  const handleForgotPassword = () => {
    setIsResetPasswordShown(true);
  };

  const handleRedirect = () => {
    navigate(`/register`);
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
      showToast("error", "Login user failed");
    }
  };

  const handleLoginWithFacebook = async () => {
    try {
      await loginWithFacebook();
    } catch (err) {
      console.log(err);
      showToast("error", "Login user failed");
    }
  };

  const eyeIcon = isPasswordShown ? (
    <PiEyeBold onClick={handleEyeClick} />
  ) : (
    <PiEyeClosedBold onClick={handleEyeClick} />
  );

  const bgImage = isDesktop ? "/images/homePageDesktop.png" : "/images/homePageBg.png";

  return (
    <div className="w-full h-full absolute overflow-hidden">
      <img
        src={bgImage}
        alt="background photo"
        className="w-full h-full object-cover blur-sm md:w-[calc(50%_+_16px)] md:blur-none"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-40"></div>
      <div className="hidden w-1/2 h-full md:flex md:flex-wrap md:absolute md:top-0 md:left-0 md:items-center md:justify-center">
        <div>
          <h1 className="text-6xl w-full md:text-7xl xl:text-8xl">
            <span className="w-1/2 text-end text-pm-orange-base">Plate</span>
            <span className="w-1/2 text-start text-pm-black">Mate</span>
          </h1>
          <h3 className="font-roboto text-[36px] text-left md:max-xl:text-l">What's for dinner?</h3>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-start mt-[72px] md:left-1/2 md:h-full md:p-0 md:mt-0">
        <Card className="rounded-none min-h-[calc(100%_-_144px)] h-auto w-full flex md:flex-wrap md:justify-center md:content-start md:w-1/2 md:h-full md:rounded-l-3xl md:drop-shadow-[0_-5px_10px_rgba(0,0,0,0.3)]">
          <div className="hidden md:w-full md:h-14 md:flex md:justify-center md:items-start">
            <Button
              basic
              underlined
              className="font-black text-2xl mr-20 text-pm-grey-dark hover:underline-offset-8 focus-visible:border-pm-grey-dark"
              onClick={handleRedirect}
            >
              Sign up
            </Button>
            <Button
              basic
              underlined
              disabled
              className="font-black text-2xl opacity-100 underline underline-offset-8"
            >
              Login
            </Button>
          </div>
          <div className="w-full flex flex-wrap content-center md:flex md:flex-wrap md:h-[calc(100%_-_56px)] lg:w-3/4">
            <h1 className="w-full mt-2 text-center text-4xl text-pm-black md:text-start md:ml-6">
              Welcome back!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
              <div className="flex flex-wrap relative mx-6 mb-2 items-center justify-start">
                <label htmlFor="email">Email:</label>
                <Input
                  id="email"
                  placeholder="Email assigned to your account"
                  className="w-full mx-0 my-1 px-4"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email address",
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum length of email is 50",
                    },
                  })}
                  invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="absolute top-[70px] right-4 text-pm-error-base text-sm font-medium w-full text-right">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap relative mx-6 mb-2 items-center justify-start">
                <label htmlFor="password">Password:</label>
                <Input
                  id="password"
                  type={isPasswordShown ? "text" : "password"}
                  placeholder="Password of your account"
                  className="w-full mx-0 my-1 px-4"
                  icon={eyeIcon}
                  iconPlacement="right"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/,
                      message:
                        "Password must contain one digit, lowercase and uppercase letter, special character, no space, must be 8-30 characters long",
                    },
                  })}
                  invalid={!!errors.password}
                />
                {errors.password && errors.password.type !== "pattern" && (
                  <p className="absolute top-[70px] right-4 text-pm-error-base text-sm font-medium w-full text-right">
                    {errors.password.message}
                  </p>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <p className="text-pm-error-base text-sm font-medium w-full text-right pr-4">
                    {errors.password.message}
                  </p>
                )}
                {invalidCredentialsMessage && (
                  <p className="absolute top-[70px] right-4 text-pm-error-base text-sm font-medium w-full text-right pr-4">
                    {invalidCredentialsMessage}
                  </p>
                )}
              </div>
              <div className="flex justify-end mt-4 mr-8">
                <Button
                  basic
                  underlined
                  type="button"
                  className="h-7 font-normal py-0"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Button>
              </div>
              <div className="flex w-full md:justify-end">
                <Button type="submit" secondary className="w-full h-10 mt-3 mx-6 px-4 md:w-1/2">
                  <span className="w-full text-center">Sign in</span>
                </Button>
              </div>
            </form>
            <div className="flex flex-wrap w-full justify-center mb-4 mt-4 md:mt-8">
              <p className="w-full">or continue with</p>
              <div className="flex justify-center mt-4">
                <IconButton
                  raised
                  className="mx-2 p-4 active:bg-pm-grey-base"
                  onClick={handleLoginWithGoogle}
                >
                  {googleIcon}
                </IconButton>
                <IconButton
                  raised
                  className="mx-2 p-4 active:bg-pm-grey-base"
                  onClick={handleLoginWithFacebook}
                >
                  {facebookIcon}
                </IconButton>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <IconButton
        className="absolute top-0 left-0 m-2 h-14 w-14 text-white"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="h-14 w-14" />
      </IconButton>
      <ResetPasswordModal
        isModalShown={isResetPasswordShown}
        closeModal={handleCloseResetPassword}
      />
    </div>
  );
}

export default LoginPage;
