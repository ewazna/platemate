import { FilterFormFields } from "./Filters/FilterFormFields";
import { RecipesFetchOptions } from "../../store/apis/recipes/RecipesFetchOptions";

export function transformRecipeFetchOptions(options: RecipesFetchOptions): RecipesFetchOptions {
  if (options.filterConfig) {
    const filterConfig = JSON.stringify(transformTime(JSON.parse(options.filterConfig)));
    return {
      ...options,
      filterConfig,
    };
  } else {
    return options;
  }
}

function transformTime(data: FilterFormFields) {
  let time = null;
  switch (data.time) {
    case 0:
      time = 10;
      break;
    case 1:
      time = 30;
      break;
    case 2:
      time = 45;
      break;
    case 3:
      time = 60;
      break;
    case 4:
      break;
  }
  return {
    ...data,
    time,
  };
}
