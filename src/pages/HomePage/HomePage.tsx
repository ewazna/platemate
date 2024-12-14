import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useMediaQuery } from "../../hooks/useMediaQuery/useMediaQuery";

function HomePage() {
  const navigate = useNavigate();
  const lessThan1024px = useMediaQuery("(max-width: 1024px)");
  const lessThan600px = useMediaQuery("(max-width: 600px)");

  const homePageBg = "/images/homePageBg.png";
  const homePageDesktop = "/images/homePageDesktop.png";
  const homePageDesktopLeft = "/images/homePageDesktopLeft.png";
  const homePageDesktopRight = "/images/homePageDesktopRight.png";

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-full w-full justify-center">
      <img
        src={lessThan600px ? homePageBg : lessThan1024px ? homePageDesktop : homePageDesktopLeft}
        alt="background photo"
        className="w-full h-full object-cover object-center xl:object-none xl:object-left xl:h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-40 "></div>
      <img
        src={homePageDesktopRight}
        alt="background photo"
        className="hidden lg:absolute lg:h-full lg:block lg:right-0 lg:top-0 lg:object-none lg:object-right-top"
      />
      <div className="absolute top-1/3 mx-10 md:top-[350px] md:w-[500px] lg:left-14 xl:w-[600px] xl:left-36">
        <h1 className="text-6xl md:text-start md:text-7xl xl:text-8xl">
          <span className="w-1/2 text-end text-pm-orange-base">Plate</span>
          <span className="w-1/2 text-start text-pm-black">Mate</span>
        </h1>
        <h3 className="font-roboto text-[36px] text-right md:text-start md:max-xl:text-l">
          What's for dinner?
        </h3>
        <h4 className="hidden md:flex md:flex-wrap md:text-start md:mt-8 md:mb-3">
          Save your favorite recipes and share them with your loved ones. Create meal plans and
          organize your life style with generated shopping lists.
        </h4>
        <div className="md:flex">
          <Button
            secondary
            className="w-full h-16 my-4 text-[24px] px-4 md:w-1/2 md:h-12 md:text-[16px] md:mr-4"
            onClick={handleCreateAccount}
          >
            <span className="w-full text-center">Create account</span>
          </Button>
          <Button
            basic
            className="w-full h-16 my-4 text-[24px] md:w-1/2  md:h-12 md:text-[16px] md:ml-4"
            onClick={handleSignIn}
          >
            <span className="w-full text-center">Sign in</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
