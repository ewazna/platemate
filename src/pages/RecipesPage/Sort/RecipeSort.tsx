import { createPortal } from "react-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { TbStar } from "react-icons/tb";
import { MdUpdate } from "react-icons/md";
import { RecipeSortProps } from "./RecipeSortProps";
import Card from "../../../components/Card/Card";
import Listbox from "../../../components/Listbox/Listbox";
import OutsideAlerter from "../../../components/OutsideAlerter/OutsideAlerter";

function RecipeSort({
  isSortFormShown,
  trigger,
  closeSortForm,
  handleSortApply,
  sortConfig,
}: RecipeSortProps) {
  const sortOptions = [
    { label: "A to Z", value: "AZ", icon: <TiArrowSortedUp /> },
    { label: "Z to A", value: "ZA", icon: <TiArrowSortedDown /> },
    { label: "Best rate", value: "BestRate", icon: <TbStar /> },
    { label: "Latest", value: "Latest", icon: <MdUpdate /> },
  ];

  const cardClasses =
    "absolute top-[156px] right-[16px] w-40 p-2 " +
    (isSortFormShown ? "display-[inherit]" : "hidden");

  if (!sortConfig) {
    sortConfig = "Latest";
  }

  const handleChange = (newValue: string[]) => {
    closeSortForm();
    handleSortApply(newValue[0]);
  };

  return (
    <>
      {isSortFormShown &&
        createPortal(
          <OutsideAlerter handleOutsideClick={closeSortForm} triggerRef={trigger}>
            <Card className={cardClasses}>
              <Listbox
                options={sortOptions}
                value={[sortConfig]}
                selectionType="single"
                onChange={handleChange}
                className="flex flex-nowrap flex-col"
                selectionColor="bg-pm-grey-base"
                bgOptionColor=""
                selectionIcons={true}
              />
            </Card>
          </OutsideAlerter>,
          document.querySelector(".container") as Element,
        )}
    </>
  );
}

export default RecipeSort;
