import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import { MdPersonOutline } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import IconButton from "../../components/IconButton/IconButton";
import Card from "../../components/Card/Card";
import ToastContext from "../../components/Toast/ToastProvider";
import Accordion from "../../components/Accordion/Accordion";
import Button from "../../components/Button/Button";
import AuthContext from "../../components/AuthProvider/AuthProvider";
import ProfileData from "./ProfileData/ProfileData";

function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const logoutIcon = <IoIosLogOut className="ml-2" />;

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate(`/`);
    } catch {
      showToast("error", "Logout user failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataProcessing = (state: boolean) => {
    setIsLoading(state);
  };

  const options = [
    {
      heading: "Profile data",
      icon: <MdPersonOutline className="h-full w-full scale-125" />,
      body: <ProfileData isLoading={isLoading} onDataProcessing={handleDataProcessing} />,
      disabled: false,
    },
    {
      heading: "Your recipes",
      icon: <PiCookingPotBold className="h-full w-full" />,
      body: <div></div>,
      disabled: true,
    },
    {
      heading: "Your comments",
      icon: <FaRegComment className="h-full w-full" />,
      body: <div></div>,
      disabled: true,
    },
    {
      heading: "Settings",
      icon: <FiSettings className="h-full w-full" />,
      body: <div></div>,
      disabled: true,
    },
  ];

  return (
    <div className="md:flex md:flex-wrap md:justify-center md:overflow-hidden md:h-full md:w-full">
      <img
        src="/images/bgDesktop.png"
        alt="background photo"
        className="hidden md:flex w-full h-full object-cover opacity-50 blur-sm"
      />
      <div className="relative w-full h-44">
        <img
          src="/images/profilePageBg.png"
          alt="background photo"
          className="w-full h-full object-cover opacity-20 blur-sm md:hidden"
        />
      </div>
      <div className="absolute top-4 right-6 w-full md:hidden">
        <h1 className="text-end w-[calc(100%_-_50px)] justify-self-end">
          {currentUser?.displayName}
        </h1>
        <h3 className="text-end font-black">{currentUser?.email}</h3>
      </div>
      <Card className="fixed bottom-0 rounded-b-none h-[calc(100%_-_160px)] bg-pm-white md:bottom-unset md:top-36 md:h-[calc(100%_-_144px)] md:rounded-none md:max-w-[1024px] md:place-self-center md:overflow-hidden md:pt-0 md:px-0">
        <div className="h-full w-full overflow-y-auto overflow-x-visible md:mt-4 md:h-[calc(100%_-_256px)] md:translate-y-64">
          <Accordion
            className="drop-shadow-[0_1px_2px_rgba(0,0,5,0.15)] m-1 md:mx-8 md:my-6 md:drop-shadow-[0_0px_6px_rgba(0,0,0,0.15)]"
            options={options}
          />
          <div className="w-full flex justify-end md:hidden">
            <Button
              raised
              basic
              className="mt-4 mx-2 mb-16"
              loading={isLoading}
              onClick={handleLogout}
            >
              Log out {logoutIcon}
            </Button>
          </div>
        </div>
        <Card className="hidden md:absolute md:top-0 md:flex md:justify-end md:w-full md:rounded-t-none md:p-8 md:drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
          <div className=" mx-6">
            <h1 className="text-end">{currentUser?.displayName}</h1>
            <h3 className="text-end font-black">{currentUser?.email}</h3>
          </div>
          <img
            src="/images/profile.png"
            alt="background photo"
            className="w-60 h-52 object-cover rounded-2xl"
          />
        </Card>
      </Card>
      <Card className="hidden w-full h-16 fixed top-16 bg-pm-white rounded-none md:flex md:h-20 md:items-center drop-shadow-[0_-2px_6px_rgba(0,0,0,0.3)]">
        <MdPersonOutline className="h-10 w-10 text-pm-orange-base mx-3" />
        <h1 className="my-4 text-left">Profile</h1>
      </Card>
      <IconButton
        className="absolute top-2 left-2 h-14 w-14 text-white md:hidden"
        onClick={() => navigate(-1)}
        disabled={isLoading}
      >
        <IoIosArrowBack className="h-14 w-14" />
      </IconButton>
    </div>
  );
}

export default ProfilePage;
