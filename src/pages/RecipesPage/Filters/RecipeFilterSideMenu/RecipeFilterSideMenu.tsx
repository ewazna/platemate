import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiFunnelBold } from "react-icons/pi";

import IconButton from "../../../../components/IconButton/IconButton";
import Card from "../../../../components/Card/Card";

import FilterForm from "../FilterForm/FilterForm";
import { RecipeFilterSideMenuProps } from "./RecipeFilterSideMenuProps";

function RecipeFilterSideMenu({
  filterConfig,
  areFiltersShown,
  closeFiltersForm,
  showFiltersForm,
  handleFiltersApply,
  className,
}: RecipeFilterSideMenuProps) {
  const [isFilterFormShown, setIsFilterFormShown] = useState(false);
  const animationTime = 300;

  useEffect(() => {
    if (areFiltersShown) {
      setIsFilterFormShown(areFiltersShown);
    } else {
      setTimeout(() => {
        setIsFilterFormShown(areFiltersShown);
      }, animationTime);
    }
  }, [areFiltersShown]);

  const cardClasses =
    " bg-pm-white rounded-2xl rounded-l-none grid-cols-1 " +
    "transition-[grid-template-rows] duration-[300ms] overflow-hidden h-fit " +
    (areFiltersShown ? "grid-rows-[40px_1fr] " : "grid-rows-[40px_0fr] ") +
    className;

  const filterFormClasses =
    "block w-[328px] transition-all duration-[300ms] overflow-hidden " +
    (areFiltersShown ? "opacity-100 mt-3" : "opacity-0 mt-0");

  return (
    <Card className={cardClasses}>
      {areFiltersShown ? (
        <div className="flex items-start justify-between sticky top-0">
          <h1 className="text-l">Filters</h1>
          <IconButton onClick={closeFiltersForm} basic className="scale-150">
            <IoIosArrowBack />
          </IconButton>
        </div>
      ) : (
        <div className="flex items-center justify-between sticky top-0">
          <PiFunnelBold className="h-10 scale-150 mx-2" />
          <IconButton onClick={showFiltersForm} basic className="scale-150">
            <IoIosArrowForward />
          </IconButton>
        </div>
      )}

      {isFilterFormShown ? (
        <FilterForm
          filtersApply={handleFiltersApply}
          filterConfig={filterConfig}
          closeFiltersForm={closeFiltersForm}
          className={filterFormClasses}
        />
      ) : (
        <></>
      )}
    </Card>
  );
}

export default RecipeFilterSideMenu;
