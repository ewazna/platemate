import { HiOutlineLightBulb } from "react-icons/hi";
import { MdPersonOutline, MdOutlineArticle } from "react-icons/md";
import { PiShoppingCartBold, PiCookingPotBold } from "react-icons/pi";
import { Outlet } from "react-router-dom";
import { NavigationItem } from "./components/NavBar/NavBarProps";
import NavBar from "./components/NavBar/NavBar";

const navigationItems: NavigationItem[] = [
  {
    label: "Profile",
    icon: <MdPersonOutline className="scale-125" />,
    path: "/profile",
    disabled: false,
  },
  { label: "Shopping lists", icon: <PiShoppingCartBold />, path: "/shoppinglists", disabled: true },
  { label: "Meal plans", icon: <MdOutlineArticle />, path: "/mealplans", disabled: true },
  { label: "Recipes", icon: <PiCookingPotBold />, path: "/recipes", disabled: false },
  { label: "Discover", icon: <HiOutlineLightBulb />, path: "/discovery", disabled: true },
];

function Root() {
  return (
    <div className="relative w-full h-full">
      <Outlet />
      <NavBar
        navigationItems={navigationItems}
        className="fixed bottom-0 left-0 w-full md:bottom-auto md:top-0"
      />
    </div>
  );
}

export default Root;
