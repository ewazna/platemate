import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import { RecipeSideNavProps } from "./RecipeSideNavProps";

function RecipeSideNav({
  scrollTop,
  detailsRef,
  ingredientsRef,
  preparingRef,
}: RecipeSideNavProps) {
  const [currentSection, setCurrentSection] = useState("details");

  useEffect(() => {
    const detailsTop = detailsRef.current!.offsetTop;
    const detailsHeight = detailsRef.current!.offsetHeight;

    const ingredientsTop = ingredientsRef.current!.offsetTop;
    const ingredientsHeight = ingredientsRef.current!.offsetHeight;

    const preparingTop = preparingRef.current!.offsetTop;
    const preparingHeight = preparingRef.current!.offsetHeight;

    if (scrollTop === undefined) {
      return;
    } else if (scrollTop >= detailsTop && scrollTop < detailsTop + detailsHeight) {
      setCurrentSection("details");
    } else if (scrollTop >= ingredientsTop && scrollTop < ingredientsTop + ingredientsHeight) {
      setCurrentSection("ingredients");
    } else if (scrollTop >= preparingTop && scrollTop < preparingTop + preparingHeight) {
      setCurrentSection("preparing");
    }
  }, [scrollTop]);

  const handleDetailsSelection = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleIngredientsSelection = () => {
    ingredientsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreparingSelection = () => {
    preparingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const detailsClasses =
    "my-2 justify-start transition-all duration-[300ms] " +
    (currentSection === "details" ? "w-48 pl-12" : "w-40");

  const ingredientsClasses =
    "my-2 justify-start transition-all duration-[300ms] " +
    (currentSection === "ingredients" ? "w-48 pl-12" : "w-40");

  const preparingClasses =
    "my-2 justify-start transition-all duration-[300ms] " +
    (currentSection === "preparing" ? "w-48 pl-12" : "w-40");

  return (
    <div className="block fixed top-44 -left-4">
      <Button
        raised
        secondary={currentSection === "details"}
        className={detailsClasses}
        onClick={handleDetailsSelection}
      >
        Details
      </Button>
      <Button
        raised
        secondary={currentSection === "ingredients"}
        className={ingredientsClasses}
        onClick={handleIngredientsSelection}
      >
        Ingredients
      </Button>
      <Button
        raised
        secondary={currentSection === "preparing"}
        className={preparingClasses}
        onClick={handlePreparingSelection}
      >
        Preparing
      </Button>
    </div>
  );
}

export default RecipeSideNav;
