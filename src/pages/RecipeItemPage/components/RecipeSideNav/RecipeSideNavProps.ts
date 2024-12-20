import { RefObject } from "react";

export interface RecipeSideNavProps {
  scrollTop: number | undefined;
  detailsRef: RefObject<HTMLDivElement>;
  ingredientsRef: RefObject<HTMLDivElement>;
  preparingRef: RefObject<HTMLDivElement>;
}
