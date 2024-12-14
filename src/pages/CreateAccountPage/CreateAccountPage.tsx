import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from "../../hooks/useMediaQuery/useMediaQuery";
import { CreateAccountFormFields } from "./CreateAccountFormFields";
import AuthContext from "../../components/AuthProvider/AuthProvider";
import ToastContext from "../../components/Toast/ToastProvider";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import IconButton from "../../components/IconButton/IconButton";
import Input from "../../components/Input/Input";

function CreateAccountPage() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPasswordCheckShown, setIsPasswordCheckShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const { signup, sendVerificationEmail, updateUserData } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<CreateAccountFormFields>({ disabled: isLoading });

  const onSubmit: SubmitHandler<CreateAccountFormFields> = async ({
    username,
    email,
    password,
  }) => {
    try {
      setIsLoading(true);
      const userCredential = await signup(email, password);
      await sendVerificationEmail(userCredential.user);
      await updateUserData(userCredential.user, username);
      navigate(`/login`);
    } catch {
      showToast("error", "Register user failed");
    }
    setIsLoading(false);
  };

  const handleEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleCheckEyeClick = () => {
    setIsPasswordCheckShown(!isPasswordCheckShown);
  };

  const handleRedirect = () => {
    navigate(`/login`);
  };

  const eyeIcon = isPasswordShown ? (
    <PiEyeBold onClick={handleEyeClick} className="top-2/3" />
  ) : (
    <PiEyeClosedBold onClick={handleEyeClick} className="top-2/3" />
  );

  const checkEyeIcon = isPasswordCheckShown ? (
    <PiEyeBold onClick={handleCheckEyeClick} className="top-2/3" />
  ) : (
    <PiEyeClosedBold onClick={handleCheckEyeClick} className="top-2/3" />
  );

  const bgImage = isDesktop ? "/images/homePageDesktop.png" : "/images/homePageBg.png";

  return (
    <div className="flex w-full h-full absolute overflow-hidden">
      <img
        src={bgImage}
        alt="background photo"
        className="w-full h-full object-cover blur-sm md:w-[calc(50%_+_16px)] md:blur-none"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-40"></div>
      <div className="hidden md:w-1/2 md:h-full md:flex md:flex-wrap md:absolute md:top-0 md:left-0 md:items-center md:justify-center">
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
              disabled
              className="font-black text-2xl mr-20 opacity-100 underline underline-offset-8"
            >
              Sign up
            </Button>
            <Button
              basic
              underlined
              className="font-black text-2xl text-pm-grey-dark hover:underline-offset-8 focus-visible:border-pm-grey-dark"
              onClick={handleRedirect}
            >
              Login
            </Button>
          </div>
          <div className="w-full h-auto flex flex-wrap content-center md:flex md:flex-wrap md:h-[calc(100%_-_56px)] lg:w-3/4">
            <h1 className="w-full mt-2 text-center text-4xl text-pm-black md:text-start md:ml-6">
              Create account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
              <div className="flex flex-wrap relative mx-6 mb-2 items-center justify-start">
                <label htmlFor="username">Username:</label>
                <Input
                  id="username"
                  placeholder="Name of your account"
                  className="w-full mx-0 my-1 px-4"
                  {...register("username", {
                    required: "Username is required",
                    maxLength: {
                      value: 15,
                      message: "Maximum length of username is 15",
                    },
                  })}
                  invalid={!!errors.username}
                />
                {errors.username && (
                  <p className="absolute top-[70px] right-4 text-pm-error-base text-sm font-medium w-full text-right">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap relative mx-6 mb-2 items-center justify-start">
                <label htmlFor="email">Email:</label>
                <Input
                  id="email"
                  placeholder="Email assigned to the account"
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
                  invalid={errors.password ? true : false}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="absolute top-[70px] right-4 text-pm-error-base text-sm font-medium w-full text-right">
                    {errors.password.message}
                  </p>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <p className="text-pm-error-base text-sm font-medium w-full text-right pr-4">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap relative mx-6 mb-2 items-center justify-start">
                <label htmlFor="passwordCheck">Confirm password:</label>
                <Input
                  id="passwordCheck"
                  type={isPasswordCheckShown ? "text" : "password"}
                  placeholder="Repeat your password"
                  className="w-full mx-0 my-1 px-4"
                  icon={checkEyeIcon}
                  iconPlacement="right"
                  {...register("passwordCheck", {
                    required: "Checking password is required",
                    validate: {
                      passwordMatching: (value) =>
                        value === watch("password") || "Passwords do not match. Try again",
                    },
                  })}
                  invalid={errors.passwordCheck ? true : false}
                />
                {errors.passwordCheck && (
                  <p className="absolute top-[70px] right-4 text-pm-error-base text-sm font-medium w-full text-right">
                    {errors.passwordCheck.message}
                  </p>
                )}
              </div>
              <div className="flex w-full md:justify-end">
                <Button
                  type="submit"
                  loading={isLoading}
                  secondary
                  className="w-full h-10 mt-6 mx-6 px-4 md:w-1/2"
                >
                  <span className="w-full text-center">Sign up</span>
                </Button>
              </div>
              <div className="h-12 flex justify-center md:justify-end md:mx-8">
                <span className="align-middle leading-10 my-1">Already have account?</span>
                <Button
                  primary
                  underlined
                  type="button"
                  disabled={isLoading}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
      <IconButton
        className="absolute top-0 left-0 m-2 h-14 w-14 text-white"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="h-14 w-14" />
      </IconButton>
    </div>
  );
}

export default CreateAccountPage;
