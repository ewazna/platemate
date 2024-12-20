import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDinnerDining } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useMediaQuery } from "../../hooks/useMediaQuery/useMediaQuery";
import AuthContext from "../AuthProvider/AuthProvider";
import ToastContext from "../Toast/ToastProvider";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import { NavBarProps, NavigationItem } from "./NavBarProps";

function NavBar({ navigationItems, ...rest }: NavBarProps) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const { showToast } = useContext(ToastContext);
  const { logout, currentUser } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const shortButtons = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (!currentUser) {
      setReadOnly(true);
    }
  }, []);

  const wave = (
    <svg width="150" height="35" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,17 C55,17 45,0 75,0 C105,0 95,17 150,17 z" fill="#FF8A00" />
    </svg>
  );

  const active = "flex flex-nowrap -translate-y-[19px] md:translate-y-0 duration-100 ease-out";
  const inactive = "flex flex-nowrap duration-100 ease-out";

  const activeButtonClasses =
    "md:text-pm-orange-base md:border-b md:border-pm-orange-base md:hover:border-b-2 md:font-medium md:focus-visible:border-b-2 ";
  const inactiveButtonClasses =
    "md:text-pm-black md:hover:text-pm-orange-base md:focus-visible:border-b md:focus-visible:border-pm-black md:focus-visible:hover:border-pm-orange-base";

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate(`/`);
    } catch {
      showToast("error", "Logout user failed");
    }
    setIsLoading(false);
  };

  const logoutButton = shortButtons ? (
    <div className="hidden md:w-10 md:flex md:justify-end md:items-center">
      <IconButton
        raised
        basic
        className={"h-10 w-10 justify-center text-pm-black " + (readOnly ? "hidden" : "")}
        loading={isLoading}
        onClick={handleLogout}
      >
        <IoIosLogOut />
      </IconButton>
    </div>
  ) : (
    <div className="hidden w-1/3 md:flex md:justify-end md:items-center">
      <Button
        raised
        basic
        className={"h-10 w-36 p-0 " + (readOnly ? "md:hidden" : "")}
        loading={isLoading}
        onClick={handleLogout}
      >
        <span>Log out</span>
        <IoIosLogOut className="ml-2" />
      </Button>
    </div>
  );

  for (const nav of navigationItems) {
    if (window.location.pathname.includes(nav.path)) {
      if (activeTab !== navigationItems.indexOf(nav)) {
        setActiveTab(navigationItems.indexOf(nav));
      }
    }
  }

  const handleClick = (nav: NavigationItem) => {
    navigate(nav.path);
  };

  const navbar = navigationItems.map((nav, i) => {
    const title = (
      <>
        <div className="mr-1">{nav.icon}</div>
        <span>{nav.label}</span>
      </>
    );
    const isActive = activeTab === i;
    const label = isDesktop ? (isActive ? title : nav.label) : nav.icon;
    const iconButtonClasses =
      "bg-transparent text-pm-white scale-[210%] p-1 active:bg-transparent active:shadow-none " +
      "focus-visible:outline-pm-white focus-visible:outline-1 focus-visible:outline-offset-0 " +
      "md:rounded-none md:py-0.5 md:hover:bg-transparent md:focus-visible:outline-none md:focus-visible:font-bold md:focus-visible:hover:font-bold " +
      (isActive ? activeButtonClasses : inactiveButtonClasses);

    return (
      <div key={nav.path}>
        <div className={isActive ? active : inactive}>
          <div className="absolute translate-x-[calc(-50%_+_12px)] -translate-y-[18px] -z-10 md:hidden">
            {wave}
          </div>
          <IconButton
            className={iconButtonClasses}
            disabled={nav.disabled}
            onClick={() => handleClick(nav)}
          >
            {label}
          </IconButton>
        </div>
      </div>
    );
  });

  return (
    <div {...rest}>
      <div className="flex flex-nowrap h-16 w-full drop-shadow-[0_-4px_4px_rgba(0,0,0,0.25)] bg-pm-orange-base md:px-4 md:bg-white md:drop-shadow-[0_-2px_6px_rgba(0,0,0,0.3)]">
        <div className="hidden w-1/3 md:flex md:items-center">
          <MdDinnerDining className="h-8 w-8 mx-4 text-pm-orange-base" />
          <h1 className="text-l">
            <span className="w-1/2 text-end text-pm-orange-base">Plate</span>
            <span className="w-1/2 text-start text-pm-black">Mate</span>
          </h1>
        </div>
        <div className="flex flex-nowrap items-center justify-evenly h-16 w-full md:text-[8px]">
          {navbar}
        </div>
        <>{logoutButton}</>
      </div>
    </div>
  );
}

export default NavBar;
