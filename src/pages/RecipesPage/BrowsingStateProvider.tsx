import { createContext, useState, PropsWithChildren } from "react";
import { RecipesFetchOptions } from "../../store/apis/recipes/RecipesFetchOptions";

interface RecipeBrowsingState {
  fetchOptions: RecipesFetchOptions;
  saveBrowsingState?: (fetchOptions: RecipesFetchOptions) => void;
}

const initialFetchOptions: RecipesFetchOptions = {
  filterConfig: undefined,
  sortConfig: "Latest",
  searchConfig: "",
  selectedGroup: "All",
};

const RecipesBrowsingContext = createContext<RecipeBrowsingState>({
  fetchOptions: initialFetchOptions,
});

function BrowsingStateProvider({ children }: PropsWithChildren) {
  const [fetchOptions, setFetchOptions] = useState(initialFetchOptions);

  const context = {
    fetchOptions,
    saveBrowsingState: (fetchOptions: RecipesFetchOptions) => setFetchOptions({ ...fetchOptions }),
  };

  return (
    <RecipesBrowsingContext.Provider value={context}>{children}</RecipesBrowsingContext.Provider>
  );
}

export default RecipesBrowsingContext;
export { BrowsingStateProvider };
