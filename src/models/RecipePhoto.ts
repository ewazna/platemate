export interface RecipePhoto {
  filename: string;
  url: string;
  state?: "existing" | "added" | "deleted";
  file?: File;
}
