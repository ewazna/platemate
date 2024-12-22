import { RecipePhoto } from "../../models";

export interface CarouselProps {
  photos: RecipePhoto[];
  indicators: boolean;
  className?: string;
}
