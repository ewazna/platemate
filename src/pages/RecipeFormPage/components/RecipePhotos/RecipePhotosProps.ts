import { RecipePhoto } from "../../../../models";

export interface RecipePhotosProps {
  photos: RecipePhoto[];
  onChange: (photos: RecipePhoto[]) => void;
  disabled?: boolean;
}
