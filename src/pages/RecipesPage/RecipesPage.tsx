import { useState, useCallback, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { PiPlusBold, PiFunnelBold } from "react-icons/pi";
import { FaSort } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";

import { useFetchGroupsQuery, useFetchRecipesQuery, useChangeGroupsMutation } from "../../store";
import { RecipesFetchOptions } from "../../store/apis/recipes/RecipesFetchOptions";
import { recipesApi } from "../../store/apis/recipes/recipesApi";

import Button from "../../components/Button/Button";
import IconButton from "../../components/IconButton/IconButton";
import Input from "../../components/Input/Input";
import Card from "../../components/Card/Card";
import Skeleton from "../../components/Skeleton/Skeleton";
import RecipeList from "./Recipes/RecipeList";
import RecipeFilter from "./Filters/RecipeFilter";
import GroupsManager from "./Groups/GroupsManager/GroupsManager";
import RecipeSort from "./Sort/RecipeSort";
import RecipesBrowsingContext from "./BrowsingStateProvider";
import ToastContext from "../../components/Toast/ToastProvider";

import { FilterFormFields } from "./Filters/FilterFormFields";
import { Group } from "../../models";

function RecipesPage() {
  const { showToast } = useContext(ToastContext);
  const browsingState = useContext(RecipesBrowsingContext);
  const [fetchOptions, setFetchOptions] = useState<RecipesFetchOptions>(browsingState.fetchOptions);
  const [mask, setMask] = useState("");
  const [scrollTop, setScrollTop] = useState<number | undefined>(0);
  const [areFiltersShown, setAreFiltersShown] = useState(false);
  const [isSortFormShown, setIsSortFormShown] = useState(false);
  const [isGroupsManagerShown, setIsGroupsManagerShown] = useState(false);

  let groupsButtons;
  let content;
  const iconFilter = <PiFunnelBold />;
  const iconSort = <FaSort />;

  const onlyBottomMask =
    "[mask-image:linear-gradient(to_bottom,white_calc(100%_-_32px),transparent_100%)]";
  const topToBottomMask =
    "[mask-image:linear-gradient(to_bottom,transparent_0%,white_32px,white_calc(100%_-_32px),transparent_100%)]";

  useEffect(() => {
    if (scrollTop === undefined) {
      return;
    } else if (scrollTop === 0) {
      setMask(onlyBottomMask);
    } else {
      setMask(topToBottomMask);
    }
  }, [scrollTop]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [changeGroups, changeGroupsResults] = useChangeGroupsMutation();

  useEffect(() => {
    if (changeGroupsResults.isSuccess) {
      dispatch(recipesApi.util.invalidateTags([{ type: "Recipe", id: "All" }]));
    }
  }, [changeGroupsResults, dispatch]);

  useEffect(() => {
    if (browsingState.saveBrowsingState) {
      browsingState.saveBrowsingState(fetchOptions);
    }
  }, [fetchOptions]);

  const recipesFetchingResult = useFetchRecipesQuery(fetchOptions);
  const recipes = recipesFetchingResult.data;

  const groupsFetchingResult = useFetchGroupsQuery();
  const groups = groupsFetchingResult.data;

  const sortMenuTrigger = useRef<HTMLButtonElement>(null);
  const elementScroll = useRef<HTMLDivElement>(null);
  const div = elementScroll.current;

  const handleScroll = useCallback(() => {
    setScrollTop(div?.scrollTop);
  }, [div?.scrollTop]);

  const handleClickGroup = (id: string) => {
    setFetchOptions({ ...fetchOptions, selectedGroup: id });
  };

  const handleAddRecipe = () => {
    navigate("/recipes/new");
  };

  const handleFilterClick = () => {
    setAreFiltersShown(!areFiltersShown);
  };

  const handleCloseFilters = () => {
    setAreFiltersShown(false);
  };

  const handleFiltersApply = (filterConfig: FilterFormFields) => {
    setFetchOptions({ ...fetchOptions, filterConfig: JSON.stringify(filterConfig) });
  };

  const handleSortClick = () => {
    setIsSortFormShown(!isSortFormShown);
  };

  const handleCloseSort = () => {
    setIsSortFormShown(false);
  };

  const handleSortApply = (sortConfig: string) => {
    setFetchOptions({ ...fetchOptions, sortConfig });
  };

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setFetchOptions({ ...fetchOptions, searchConfig: event.currentTarget.value });
  };

  const handleGroupsManagerClick = () => {
    setIsGroupsManagerShown(!isGroupsManagerShown);
  };

  const handleCloseGroupsManager = () => {
    setIsGroupsManagerShown(false);
  };

  const handleGroupsApply = (data: Group[], deleteRecipes: boolean) => {
    changeGroups({ groups: data, deleteRecipes });
    setFetchOptions({ ...fetchOptions, selectedGroup: "All" });
    setIsGroupsManagerShown(false);
  };

  if (recipesFetchingResult.isFetching) {
    content = <Skeleton times={4} className="w-40 h-48 mb-4" />;
  } else if (recipesFetchingResult.error) {
    content = <Skeleton times={4} className="w-40 h-48 mb-4" />;
    showToast("error", "Fetching recipes failed");
  } else {
    if (recipes && recipes.length > 0) {
      content = (
        <RecipeList
          ref={elementScroll}
          onScroll={handleScroll}
          className={"flex flex-wrap justify-between items-start h-full overflow-auto pb-6 " + mask}
          recipes={recipes}
        ></RecipeList>
      );
    } else {
      content = (
        <div className="translate-y-20">
          <div className="flex w-full justify-center">
            <img src="/images/empty-box-darkgrey.png" className="w-28 h-28" />
          </div>
          <p className="font-roboto font-medium text-pm-grey-dark py-2">No recipes found</p>
        </div>
      );
    }
  }

  if (groupsFetchingResult.isFetching) {
    groupsButtons = (
      <Button loading className="basic p-0 mx-2 text-s normal-case drop-shadow-none">
        Loading
      </Button>
    );
  } else if (groupsFetchingResult.error) {
    showToast("error", "Fetching groups failed");
  } else {
    if (groups) {
      const extendedGroups = [...groups];
      extendedGroups.unshift({ _id: "All", name: "All" }, { _id: "Favourite", name: "Favourite" });

      groupsButtons = extendedGroups.map((group) => {
        return (
          <Button
            basic
            underlined
            className={
              "p-0 mx-2 text-s text-nowrap normal-case active:text-pm-black " +
              (fetchOptions.selectedGroup === group._id ? "font-extrabold" : "")
            }
            key={group._id}
            onClick={() => handleClickGroup(group._id as string)}
          >
            {group.name}
          </Button>
        );
      });
    }
  }

  return (
    <div className="h-full">
      <div className="relative h-full m-0 overflow-hidden ">
        <header className="mx-6 mt-3">
          <div className="flex items-center justify-between h-14">
            <h1>Recipes</h1>
            <IconButton primary raised onClick={handleAddRecipe}>
              <PiPlusBold />
            </IconButton>
          </div>
          <div className="flex my-1 justify-stretch">
            <Input
              placeholder="Search for Recipes"
              className="flex"
              icon={<IoSearch />}
              iconPlacement="left"
              value={fetchOptions.searchConfig}
              onChange={handleSearch}
            />
          </div>
        </header>
        <main className="h-full">
          <div className="flex justify-end mr-3 my-1">
            <Button
              basic
              underlined
              onClick={handleFilterClick}
              className="p-0 mx-2 text-s drop-shadow-none opacity-80"
            >
              <span className="p-1">Filter by </span>
              {iconFilter}
            </Button>
            <Button
              ref={sortMenuTrigger}
              basic
              underlined
              onClick={handleSortClick}
              className="p-0 mx-2 text-s drop-shadow-none opacity-80"
            >
              <span className="p-1">Sort by </span>
              {iconSort}
            </Button>
          </div>
          <Card className="rounded-b-none h-[calc(100%_-_156px)] pb-24">
            <div className="flex mb-2">
              <div className="flex overflow-auto no-scrollbar">{groupsButtons}</div>
              <IconButton primary onClick={handleGroupsManagerClick}>
                <TbSettings />
              </IconButton>
            </div>
            {content}
          </Card>
        </main>
      </div>
      <RecipeFilter
        areFiltersShown={areFiltersShown}
        closeFiltersForm={handleCloseFilters}
        handleFiltersApply={handleFiltersApply}
        filterConfig={fetchOptions.filterConfig}
      />
      <RecipeSort
        trigger={sortMenuTrigger}
        isSortFormShown={isSortFormShown}
        closeSortForm={handleCloseSort}
        handleSortApply={handleSortApply}
        sortConfig={fetchOptions.sortConfig}
      />
      <GroupsManager
        isGroupsManagerShown={isGroupsManagerShown}
        closeGroupsManager={handleCloseGroupsManager}
        groupsApply={handleGroupsApply}
        groups={groups || []}
      />
    </div>
  );
}

export default RecipesPage;
