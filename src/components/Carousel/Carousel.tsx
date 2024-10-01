import { useState } from "react";
import { CarouselProps } from "./CarouselProps";
import { RecipePhoto } from "../../pages/RecipeFromFields";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import IconButton from "../IconButton/IconButton";

function Carousel({ photos, indicators }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBackClick = () => {
    setActiveIndex(activeIndex - 1);
  };

  const handleForwardClick = () => {
    setActiveIndex(activeIndex + 1);
  };

  const transformPhotoUrl = (photo: RecipePhoto) => {
    return (
      photo.url.substring(0, photo.url.indexOf("upload") + 7) +
      "c_auto,w_375" +
      photo.url.slice(photo.url.indexOf("upload") + 6)
    );
  };

  return (
    <>
      {photos.map((photo, i) => {
        return (
          <div
            key={photo.filename}
            className={activeIndex === i ? "" : "hidden"}
          >
            <img
              src={
                photo.state === "added" ? photo.url : transformPhotoUrl(photo)
              }
              className="w-full h-64 object-cover drop-shadow-xl"
            />
            <IconButton
              type="button"
              className={
                "absolute left-0 top-[108px] h-10 w-9 text-white p-1 bg-pm-black bg-opacity-20 rounded-l-none rounded-r-full " +
                (i === 0 ? "hidden" : "")
              }
              onClick={handleBackClick}
            >
              <IoIosArrowBack className="h-10 w-10 -translate-x-1" />
            </IconButton>
            <IconButton
              type="button"
              className={
                " absolute right-0 top-[108px] h-10 w-9 text-white p-1 bg-pm-black bg-opacity-20 rounded-r-none rounded-l-full " +
                (i === photos.length - 1 ? "hidden" : "")
              }
              onClick={handleForwardClick}
            >
              <IoIosArrowForward className="h-10 w-10 translate-x-1" />
            </IconButton>
          </div>
        );
      })}
      <div
        className={
          "w-full flex absolute top-60 justify-center items-center " +
          (indicators ? "" : "hidden")
        }
      >
        {photos.map((photo, i) => {
          return (
            <div
              key={photo.filename}
              className={
                "bg-pm-white mx-1 w-6 rounded-full " +
                (activeIndex === i ? "h-1" : "h-0.5 opacity-80")
              }
            />
          );
        })}
      </div>
    </>
  );
}
export default Carousel;
