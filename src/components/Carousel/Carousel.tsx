import { useState } from "react";
import { CarouselProps } from "./CarouselProps";
import { RecipePhoto } from "../../models";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useMediaQuery } from "../../hooks/useMediaQuery/useMediaQuery";
import IconButton from "../IconButton/IconButton";

function Carousel({ photos, indicators, className }: CarouselProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const widerPhotos = useMediaQuery("(min-width:376px) and (max-width: 767px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const photoWidth = isDesktop ? "1024" : widerPhotos ? "768" : "375";

  const handleBackClick = () => {
    setActiveIndex(activeIndex - 1);
  };

  const handleForwardClick = () => {
    setActiveIndex(activeIndex + 1);
  };

  const transformPhotoUrl = (photo: RecipePhoto) => {
    return (
      photo.url.substring(0, photo.url.indexOf("upload") + 7) +
      "c_auto,w_" +
      photoWidth +
      photo.url.slice(photo.url.indexOf("upload") + 6)
    );
  };

  return (
    <div className="relative">
      {photos.map((photo, i) => {
        return (
          <div key={photo.filename} className={activeIndex === i ? "" : "hidden"}>
            <div className={"relative w-full h-64 " + className}>
              <img
                src={photo.state === "added" ? photo.url : transformPhotoUrl(photo)}
                className="w-full h-full object-cover object-center md:rounded-b-2xl md:drop-shadow-md"
              />
              <IconButton
                type="button"
                className={
                  "absolute top-[calc(50%_-_20px)] left-0 h-10 w-9 text-white p-1 bg-pm-black bg-opacity-20 rounded-l-none rounded-r-full " +
                  (i === 0 ? "hidden" : "")
                }
                onClick={handleBackClick}
              >
                <IoIosArrowBack className="h-10 w-10 -translate-x-1" />
              </IconButton>
              <IconButton
                type="button"
                className={
                  "absolute top-[calc(50%_-_20px)] right-0 h-10 w-9 text-white p-1 bg-pm-black bg-opacity-20 rounded-r-none rounded-l-full " +
                  (i === photos.length - 1 ? "hidden" : "")
                }
                onClick={handleForwardClick}
              >
                <IoIosArrowForward className="h-10 w-10 translate-x-1" />
              </IconButton>
            </div>
          </div>
        );
      })}
      <div
        className={
          "w-full flex absolute bottom-4 justify-center items-center " +
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
    </div>
  );
}
export default Carousel;
