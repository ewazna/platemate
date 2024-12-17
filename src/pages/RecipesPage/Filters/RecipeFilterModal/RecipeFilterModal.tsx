import { useCallback, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { RecipeFilterModalProps } from "./RecipeFilterModalProps";
import FilterForm from "../FilterForm/FilterForm";
import IconButton from "../../../../components/IconButton/IconButton";
import Modal from "../../../../components/Modal/Modal";

function RecipeFilterModal({
  filterConfig,
  areFiltersShown,
  closeFiltersForm,
  handleFiltersApply,
}: RecipeFilterModalProps) {
  const [mask, setMask] = useState("");
  const [scrollTop, setScrollTop] = useState<number | undefined>(0);

  const onlyBottomMask =
    "[mask-image:linear-gradient(to_bottom,white_calc(100%_-_32px),transparent_100%)]";
  const topToBottomMask =
    "[mask-image:linear-gradient(to_bottom,transparent_0%,white_32px,white_calc(100%_-_32px),transparent_100%)]";

  const modalClasses =
    "top-32 h-[calc(100%_-_128px)] " +
    (areFiltersShown ? "min-[550px]:animate-slideInDown" : "min-[550px]:animate-slideOutDown ");

  const elementScroll = useRef<HTMLDivElement>(null);
  const div = elementScroll?.current;

  useEffect(() => {
    setScrollTop(0);
  }, [areFiltersShown]);

  useEffect(() => {
    if (scrollTop === undefined) {
      return;
    } else if (scrollTop === 0) {
      setMask(onlyBottomMask);
    } else {
      setMask(topToBottomMask);
    }
  }, [scrollTop]);

  const handleScroll = useCallback(() => {
    setScrollTop(div?.scrollTop);
  }, [div]);

  return (
    <Modal isModalShown={areFiltersShown} closeModal={closeFiltersForm} className={modalClasses}>
      <div className="flex items-start justify-between sticky top-0">
        <h1 className="mb-3 md:text-l">Filters</h1>
        <IconButton onClick={() => closeFiltersForm()} basic className="scale-150">
          <CgClose />
        </IconButton>
      </div>
      <FilterForm
        ref={elementScroll}
        onScroll={handleScroll}
        className="h-full"
        fieldsContainerClasses={"h-[calc(100%_-_115px)] overflow-auto mb-2 " + mask}
        filtersApply={handleFiltersApply}
        closeFiltersForm={closeFiltersForm}
        filterConfig={filterConfig}
      />
    </Modal>
  );
}

export default RecipeFilterModal;
