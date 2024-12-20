import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { GiShare } from "react-icons/gi";
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from "../../../../hooks/useMediaQuery/useMediaQuery";
import { RecipeTopBarProps } from "./RecipeTopBarProps";
import Button from "../../../../components/Button/Button";
import Card from "../../../../components/Card/Card";
import IconButton from "../../../../components/IconButton/IconButton";

function RecipeTopBar({
  recipe,
  readOnly,
  groupsAvailable,
  handleShareClick,
  handleGroupsVisibility,
}: RecipeTopBarProps) {
  const navigate = useNavigate();
  const shortButtons = useMediaQuery("(max-width: 1024px)");

  const saveToGroupsIcon =
    recipe.groups.length === 0 ? (
      <PiBookmarkSimpleBold className="w-7 h-7 lg:ml-2" />
    ) : (
      <PiBookmarkSimpleFill className="w-7 h-7 lg:ml-2" />
    );

  const buttonClasses =
    "flex h-12 w-12 p-0 mx-1 lg:h-10 lg:w-auto lg:px-3 xl:mx-2 xl:px-4 " +
    (readOnly ? "hidden" : "");

  const backButtonClasses = "h-14 w-14 mr-2 text-pm-black " + (readOnly ? "hidden" : "");
  const titleClasses = "my-4 text-left line-clamp-1 " + (readOnly ? "ml-16" : "");

  const handleEditClick = () => {
    navigate(`/recipes/${recipe._id}/edit`, { state: recipe });
  };

  return (
    <Card className="w-full h-20 fixed top-16 bg-pm-white rounded-none grid grid-cols-[1fr_1fr] grid-rows-1 drop-shadow-[0_-2px_6px_rgba(0,0,0,0.3)]">
      <div className="flex items-center max-w-1/2">
        <IconButton type="button" className={backButtonClasses} onClick={() => navigate(-1)}>
          <IoIosArrowBack className="h-14 w-14" />
        </IconButton>
        <h1 className={titleClasses}>{recipe.title}</h1>
      </div>
      <div className="flex justify-end w-full">
        <Button
          raised
          secondary
          className="flex h-12 w-12 p-0 mx-1 lg:h-10 lg:w-auto lg:px-3 xl:mx-2 xl:px-4"
          onClick={handleShareClick}
        >
          {shortButtons ? (
            <GiShare className="w-7 h-7" />
          ) : (
            <>
              Share
              <GiShare className="w-7 h-7 ml-2" />
            </>
          )}
        </Button>
        <Button raised primary className={buttonClasses} onClick={handleEditClick}>
          {shortButtons ? (
            <MdEdit className="h-7 w-7" />
          ) : (
            <>
              Edit recipe
              <MdEdit className="h-7 w-7 ml-2" />
            </>
          )}
        </Button>
        <Button
          basic
          className={buttonClasses}
          onClick={handleGroupsVisibility}
          disabled={groupsAvailable}
        >
          {shortButtons ? (
            <>{saveToGroupsIcon}</>
          ) : (
            <>
              Save to group
              {saveToGroupsIcon}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

export default RecipeTopBar;
