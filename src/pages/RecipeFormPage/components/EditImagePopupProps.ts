import { RecipePhoto } from "../../../models";

export interface EditImagePopupProps {
  isModalShown: boolean;
  closeModal: () => void;
  photos: RecipePhoto[];
  maxPhotos: number;
  value?: RecipePhoto[];
  onChange: (newPhotos: RecipePhoto[]) => void;
}
