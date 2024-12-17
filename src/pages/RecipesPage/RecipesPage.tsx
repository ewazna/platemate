import { useState, useCallback, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { PiPlusBold, PiFunnelBold, PiCookingPotBold } from "react-icons/pi";
import { FaSort } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";
import { useMediaQuery } from "../../hooks/useMediaQuery/useMediaQuery";
import { useFetchGroupsQuery, useFetchRecipesQuery, useChangeGroupsMutation } from "../../store";
import { RecipesFetchOptions } from "../../store/apis/recipes/RecipesFetchOptions";
import { recipesApi } from "../../store/apis/recipes/recipesApi";

import Button from "../../components/Button/Button";
import IconButton from "../../components/IconButton/IconButton";
import Input from "../../components/Input/Input";
import Card from "../../components/Card/Card";
import Skeleton from "../../components/Skeleton/Skeleton";
import RecipeList from "./Recipes/RecipeList";
import RecipeFilterSideMenu from "./Filters/RecipeFilterSideMenu/RecipeFilterSideMenu";
import GroupsManager from "./Groups/GroupsManager/GroupsManager";
import RecipeSort from "./Sort/RecipeSort";
import RecipesBrowsingContext from "./BrowsingStateProvider";
import ToastContext from "../../components/Toast/ToastProvider";

import { FilterFormFields } from "./Filters/FilterForm/FilterFormFields";
import { Group } from "../../models";
import RecipeFilterModal from "./Filters/RecipeFilterModal/RecipeFilterModal";

function RecipesPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const displayShortButton = useMediaQuery("(max-width: 900px)");
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

  const groupsFetchingResult = useFetchGroupsQuery();
  const groups = groupsFetchingResult.data;

  useEffect(() => {
    if (groupsFetchingResult.error) {
      showToast("error", "Fetching groups failed");
    }
  }, [groupsFetchingResult, showToast]);

  const recipesFetchingResult = useFetchRecipesQuery(fetchOptions);
  const recipes = recipesFetchingResult.data;

  useEffect(() => {
    if (recipesFetchingResult.error) {
      showToast("error", "Fetching recipes failed");
    }
  }, [recipesFetchingResult, showToast]);

  const sortMenuTriggerMobile = useRef<HTMLButtonElement>(null);
  const sortMenuTriggerDesktop = useRef<HTMLButtonElement>(null);
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

  const handleShowFilters = () => {
    setAreFiltersShown(true);
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
    content = (
      <div className="w-full h-[calc(100%_-_40px)]">
        <div className="flex flex-wrap w-full h-full justify-center content-center">
          <img src="/images/error-fetching.svg" className="w-20 h-20" />
          <p className="font-roboto font-medium text-pm-grey-dark py-2 w-full">
            Failed to fetch recipes
          </p>
        </div>
      </div>
    );
  } else {
    if (recipes && recipes.length > 0) {
      const recipeListClasses =
        "grid grid-cols-2 gap-6 content-start h-full overflow-auto pb-6 md:h-[calc(100%_-_42px)] " +
        (areFiltersShown
          ? "md:grid-cols-1 min-[900px]:grid-cols-2 min-[1100px]:grid-cols-3 2xl:grid-cols-4 min-[1700px]:grid-cols-5 "
          : "min-[900px]:grid-cols-3 min-[1100px]:grid-cols-4 2xl:grid-cols-5 ") +
        mask;

      content = (
        <RecipeList
          ref={elementScroll}
          onScroll={handleScroll}
          className={recipeListClasses}
          recipes={recipes}
        ></RecipeList>
      );
    } else {
      content = (
        <div className="w-full h-[calc(100%_-_40px)]">
          <div className="flex flex-wrap w-full h-full justify-center content-center">
            <img src="/images/empty-box-darkgrey.png" className="w-28 h-28" />
            <p className="font-roboto font-medium text-pm-grey-dark py-2 w-full">
              No recipes found
            </p>
          </div>
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
  } else if (groupsFetchingResult.isSuccess) {
    if (groups) {
      const extendedGroups = [...groups];
      extendedGroups.unshift({ _id: "All", name: "All" }, { _id: "Favourite", name: "Favourite" });

      groupsButtons = extendedGroups.map((group) => {
        const groupClasses =
          "p-0 mx-2 text-s text-nowrap normal-case active:text-pm-black " +
          (fetchOptions.selectedGroup === group._id ? "font-extrabold" : "");

        return (
          <Button
            basic
            underlined
            className={groupClasses}
            key={group._id}
            onClick={() => handleClickGroup(group._id as string)}
          >
            {group.name}
          </Button>
        );
      });
    }
  }

  const addRecipeButton = displayShortButton ? (
    <div className="md:w-10 md:flex md:justify-end">
      <IconButton
        primary
        raised
        onClick={handleAddRecipe}
        className="md:h-10 md:w-10 md:flex md:justify-center"
      >
        <PiPlusBold />
      </IconButton>
    </div>
  ) : (
    <div className="md:w-1/3 md:flex md:justify-end">
      <IconButton primary raised onClick={handleAddRecipe} className="md:px-4">
        <span className="font-medium mr-2">NEW RECIPE</span>
        <PiPlusBold />
      </IconButton>
    </div>
  );

  const recipeIcon = isDesktop ? (
    <PiCookingPotBold className="h-8 w-8 text-pm-orange-base mr-2 md:mx-4" />
  ) : (
    <></>
  );

  const mainClasses =
    "h-full w-full md:absolute md:top-20 md:right-0 md:grid md:grid-rows-1 md:gap-4 transition-all duration-[300ms] " +
    (areFiltersShown ? "md:grid-cols-[360px_1fr]" : "md:grid-cols-[110px_1fr]");

  return (
    <div className="h-full md:h-[calc(100%_-_64px)] md:translate-y-16">
      <div className="relative h-full m-0 overflow-hidden ">
        <header className="mx-6 mt-3 md:mx-4 md:my-3">
          <div className="flex items-center justify-between h-14 md:w-full">
            <div className="flex items-center md:w-1/3">
              {recipeIcon}
              <h1>Recipes</h1>
            </div>
            <div className="hidden md:flex md:my-1 md:justify-stretch md:w-full md:mx-4">
              <Input
                placeholder="Search for Recipes"
                className="flex md:w-full"
                icon={<IoSearch />}
                iconPlacement="left"
                value={fetchOptions.searchConfig}
                onChange={handleSearch}
              />
            </div>
            {addRecipeButton}
          </div>
          <div className="flex my-1 justify-stretch md:hidden">
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
        <img
          src="/images/bgDesktop.png"
          alt="background photo"
          className="hidden md:flex w-full h-full object-cover opacity-50 blur-sm md:translate-y-1"
        />
        <main className={mainClasses}>
          <div className="flex justify-end mr-3 my-1 md:my-3 md:hidden">
            <Button
              basic
              underlined
              onClick={handleFilterClick}
              className="p-0 mx-2 text-s drop-shadow-none opacity-80"
            >
              <span className="px-1">Filter by </span>
              {iconFilter}
            </Button>
            <Button
              ref={sortMenuTriggerMobile}
              basic
              underlined
              onClick={handleSortClick}
              className="p-0 mx-2 text-s drop-shadow-none opacity-80"
            >
              <span className="px-1">Sort by </span>
              {iconSort}
            </Button>
          </div>
          <RecipeFilterSideMenu
            areFiltersShown={areFiltersShown}
            closeFiltersForm={handleCloseFilters}
            showFiltersForm={handleShowFilters}
            handleFiltersApply={handleFiltersApply}
            filterConfig={fetchOptions.filterConfig}
            className="hidden md:grid "
          />
          <Card className="rounded-b-none h-[calc(100%_-_156px)] pb-24 md:h-[calc(100%_-_100px)] md:pb-4 md:overflow-hidden md:rounded-2xl md:rounded-r-none min-[650px]:px-6">
            <div className="flex mb-2 md:justify-between md:w-full">
              <div className="contents md:flex md:justify-start md:w-[calc(100%_-_100px)]">
                <div className="flex overflow-auto no-scrollbar">{groupsButtons}</div>
                <IconButton primary onClick={handleGroupsManagerClick}>
                  <TbSettings />
                </IconButton>
              </div>
              <Button
                ref={sortMenuTriggerDesktop}
                basic
                underlined
                onClick={handleSortClick}
                className="hidden md:flex md:p-0 md:mx-2 md:text-s md:drop-shadow-none "
              >
                <span className="px-1">Sort by </span>
                {iconSort}
              </Button>
            </div>
            {content}
          </Card>
        </main>
      </div>
      {isDesktop ? (
        <></>
      ) : (
        <RecipeFilterModal
          areFiltersShown={areFiltersShown}
          closeFiltersForm={handleCloseFilters}
          showFiltersForm={handleShowFilters}
          handleFiltersApply={handleFiltersApply}
          filterConfig={fetchOptions.filterConfig}
        />
      )}
      <RecipeSort
        trigger={isDesktop ? sortMenuTriggerDesktop : sortMenuTriggerMobile}
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
