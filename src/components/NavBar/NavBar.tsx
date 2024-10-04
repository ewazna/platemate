import { useState } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "../IconButton/IconButton";
import { NavBarProps, NavigationItem } from "./NavBarProps";

function NavBar({ navigationItems, ...rest }: NavBarProps) {
  const [activeTab, setActiveTab] = useState<number>();
  const navigate = useNavigate();

  const wave = (
    <svg width="150" height="35" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,17 C55,17 45,0 75,0 C105,0 95,17 150,17 z" fill="#FF8A00" />
    </svg>
  );

  const active = "flex flex-nowrap -translate-y-[19px] duration-100 ease-out";
  const inactive = "flex flex-nowrap duration-100 ease-out";

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
    return (
      <div key={nav.path}>
        <div className={activeTab === i ? active : inactive}>
          <div className="absolute translate-x-[calc(-50%_+_12px)] -translate-y-[18px] -z-10">
            {wave}
          </div>
          <IconButton
            className="bg-transparent text-pm-white scale-[210%] p-1 hover:bg-transparent active:bg-transparent active:shadow-none focus-visible:outline-pm-white focus-visible:outline-1 focus-visible:outline-offset-0"
            disabled={nav.disabled}
            onClick={() => handleClick(nav)}
          >
            {nav.icon}
          </IconButton>
        </div>
      </div>
    );
  });

  return (
    <div {...rest}>
      <div className="flex flex-nowrap items-center justify-evenly bg-pm-orange-base h-16 w-full drop-shadow-[0_-4px_4px_rgba(0,0,0,0.25)]">
        {navbar}
      </div>
    </div>
  );
}

export default NavBar;
