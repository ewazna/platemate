import { HiOutlineLightBulb } from "react-icons/hi";
import { MdPersonOutline, MdOutlineArticle } from "react-icons/md";
import { PiShoppingCartBold, PiCookingPotBold } from "react-icons/pi";
import { Outlet } from "react-router-dom";
import { NavigationItem } from "./components/NavBar/NavBarProps";
import NavBar from "./components/NavBar/NavBar";

const navigationItems: NavigationItem[] = [
  { icon: <MdPersonOutline />, path: "/profile", disabled: true },
  { icon: <PiShoppingCartBold />, path: "/shoppinglists", disabled: true },
  { icon: <MdOutlineArticle />, path: "/mealplans", disabled: true },
  { icon: <PiCookingPotBold />, path: "/recipes", disabled: false },
  { icon: <HiOutlineLightBulb />, path: "/discovery", disabled: true },
];

function Root() {
  return (
    <div className="relative w-full h-full">
      <Outlet />
      <NavBar navigationItems={navigationItems} className="fixed bottom-0 left-0 w-full" />
    </div>
  );
}

export default Root;
