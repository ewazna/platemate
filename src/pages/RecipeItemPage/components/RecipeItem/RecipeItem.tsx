import { useCallback, useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { GroupsFormFields } from "../SaveToGroups/GroupsFormFields";
import { useChangeRecipeItemMutation } from "../../../../store/apis/recipes/recipesApi";
import { groupsApi, useFetchGroupsQuery } from "../../../../store/apis/groups/groupsApi";
import { useMediaQuery } from "../../../../hooks/useMediaQuery/useMediaQuery";
import RecipeItemProps from "./RecipeItemProps";
import SaveToGroups from "../SaveToGroups/SaveToGroups";
import RecipePreparingList from "../RecipePreparingList/RecipePreparingList";
import ShareRecipe from "../ShareRecipe/ShareRecipe";
import IconButton from "../../../../components/IconButton/IconButton";
import ToastContext from "../../../../components/Toast/ToastProvider";
import Carousel from "../../../../components/Carousel/Carousel";
import AuthContext from "../../../../components/AuthProvider/AuthProvider";
import RecipeSideNav from "../RecipeSideNav/RecipeSideNav";
import RecipeTopBar from "../RecipeTopBar/RecipeTopBar";
import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";
import RecipeDetails from "../RecipeDetails/RecipeDetails";

function RecipeItem({ recipe }: RecipeItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { showToast } = useContext(ToastContext);
  const { currentUser } = useContext(AuthContext);
  const [areGroupsShown, setAreGroupsShown] = useState(false);
  const [isShareRecipeShown, setIsShareRecipeShown] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [scrollTop, setScrollTop] = useState<number | undefined>(0);
  const [changeRecipeItem, changeRecipeItemResults] = useChangeRecipeItemMutation();
  const groupsFetchingResult = useFetchGroupsQuery();
  const groups = groupsFetchingResult.data;
  const groupsAvailable = groupsFetchingResult.error || !groups || groups.length === 0;

  useEffect(() => {
    setReadOnly(currentUser?.uid !== recipe.userId);
  }, [setReadOnly, currentUser, recipe.userId]);

  useEffect(() => {
    if (changeRecipeItemResults.isSuccess) {
      showToast("success", "Recipe updated successfully");
    } else if (changeRecipeItemResults.isError) {
      showToast("error", "Updating recipe failed");
    }
  }, [changeRecipeItemResults, showToast]);

  useEffect(() => {
    if (groupsFetchingResult.error) {
      if (!readOnly) {
        showToast("error", "Fetching groups failed");
      }
    }
  }, [groupsFetchingResult, showToast, readOnly]);

  const detailsRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const preparingRef = useRef<HTMLDivElement>(null);
  const elementScroll = useRef<HTMLDivElement>(null);
  const div = elementScroll.current;

  const handleScroll = useCallback(() => {
    setScrollTop(div?.scrollTop);
  }, [div?.scrollTop]);

  const heartIcon = recipe.favourite ? (
    <PiHeartStraightFill className="h-14 w-14" />
  ) : (
    <PiHeartStraightBold className="h-14 w-14" />
  );

  const heartButtonClasses =
    "absolute top-2 right-4 h-14 w-14 text-white " + (readOnly ? "hidden" : "");
  const navigationButtonClasses =
    "absolute top-2 left-2 h-14 w-14 text-white md:hidden " + (readOnly ? "hidden" : "");

  const handleCloseSharePortal = () => {
    setIsShareRecipeShown(false);
  };

  const handleOpenSharePortal = () => {
    setIsShareRecipeShown(true);
  };

  const handleCloseSaveToGroups = () => {
    setAreGroupsShown(false);
  };

  const handleGroupsVisibility = useCallback(
    () => setAreGroupsShown(!areGroupsShown),
    [areGroupsShown],
  );

  const handleFavourites = () => {
    const changedRecipe = { ...recipe, favourite: !recipe.favourite };
    changeRecipeItem(changedRecipe);
  };

  const handleSaveToGroup = useCallback(
    (data: GroupsFormFields) => {
      handleGroupsVisibility();
      changeRecipeItem({ ...recipe, groups: data.groups })
        .unwrap()
        .then(() => {
          dispatch(groupsApi.util.invalidateTags([{ type: "Group", id: "All" }]));
        });
    },
    [handleGroupsVisibility, changeRecipeItem, recipe, dispatch],
  );

  return (
    <div
      ref={elementScroll}
      onScroll={handleScroll}
      className="relative h-screen overflow-auto scroll-pt-[150px]"
    >
      <div className="w-full bg-pm-white pb-20 md:translate-y-36 md:max-w-[1024px] md:place-self-center md:drop-shadow-2xl md:pb-4">
        <Carousel
          photos={recipe.photos}
          indicators={false}
          className="min-[450px]:h-[375px] md:h-[480px] md:mb-14"
        />
        <IconButton className={navigationButtonClasses} onClick={() => navigate(-1)}>
          <IoIosArrowBack className="h-14 w-14" />
        </IconButton>
        <IconButton className={heartButtonClasses} onClick={handleFavourites}>
          {heartIcon}
        </IconButton>
        <div className="mx-6 min-[450px]:mx-10 min-[550px]:mx-14 md:mx-20 lg:mx-24">
          <RecipeDetails
            ref={detailsRef}
            recipe={recipe}
            readOnly={readOnly}
            handleShareClick={handleOpenSharePortal}
            handleGroupsVisibility={handleGroupsVisibility}
            groupsAvailable={!!groupsAvailable}
          />
          <RecipeIngredients
            ref={ingredientsRef}
            recipe={recipe}
            className="flex flex-wrap -scroll-mt-2 pt-2"
          />
          <RecipePreparingList
            ref={preparingRef}
            recipe={recipe}
            className="flex flex-wrap -scroll-mt-2 pt-2"
          />
        </div>
      </div>
      {isDesktop ? (
        <RecipeSideNav
          scrollTop={scrollTop}
          detailsRef={detailsRef}
          ingredientsRef={ingredientsRef}
          preparingRef={preparingRef}
        />
      ) : (
        <></>
      )}
      {isDesktop ? (
        <RecipeTopBar
          recipe={recipe}
          readOnly={readOnly}
          handleShareClick={handleOpenSharePortal}
          handleGroupsVisibility={handleGroupsVisibility}
          groupsAvailable={!!groupsAvailable}
        />
      ) : (
        <></>
      )}
      <SaveToGroups
        areGroupsShown={areGroupsShown}
        closeGroups={handleCloseSaveToGroups}
        handleSaveToGroup={(data) => handleSaveToGroup(data)}
        recipe={recipe}
        groups={groups || []}
      />
      <ShareRecipe
        isShareRecipeShown={isShareRecipeShown}
        closeShareRecipe={handleCloseSharePortal}
      />
    </div>
  );
}

export default RecipeItem;
