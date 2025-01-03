import EditImagePopup from "../EditImagePopup/EditImagePopup";
import Carousel from "../../../../components/Carousel/Carousel";
import IconButton from "../../../../components/IconButton/IconButton";
import { RiImageEditFill, RiImageAddFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { RecipePhoto } from "../../../../models";
import { RecipePhotosProps } from "./RecipePhotosProps";

function RecipePhotos({ photos, onChange, disabled }: RecipePhotosProps) {
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [tempPhotos, setTempPhotos] = useState<RecipePhoto[]>([...photos]);
  const [isMessageShown, setIsMessageShown] = useState(false);
  const maxPhotos = 5;

  useEffect(() => {
    setTempPhotos(photos);
  }, [photos]);

  const handleAddPhotos = async (newPhotos: FileList | null) => {
    if (!newPhotos) {
      return;
    }
    const photosArray = Array.from<File>(newPhotos);
    if (photosArray.length > maxPhotos) {
      photosArray.splice(maxPhotos);
      setIsMessageShown(true);
    }
    const readedFiles = await Promise.all(
      photosArray.map(
        (file: File) =>
          new Promise<RecipePhoto>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                filename: file.name,
                url: reader.result as string,
                state: "added",
                file: file,
              });
            };
            reader.readAsDataURL(file);
          }),
      ),
    );

    setTempPhotos(readedFiles);
    onChange(readedFiles);
  };

  const handleEditPhotos = (newPhotos: RecipePhoto[]) => {
    setTempPhotos([...newPhotos]);
    onChange([...newPhotos]);
  };

  const handleClosePopup = () => {
    setIsPopupShown(false);
  };

  const handleEditClick = () => {
    setIsPopupShown(!isPopupShown);
    setIsMessageShown(false);
  };

  const visiblePhotos = tempPhotos.filter((photo) => photo.state !== "deleted");

  let content;
  if (visiblePhotos.length === 0) {
    content = (
      <>
        <img
          src="/images/new_photo.jpg"
          alt="new photo"
          className="w-full h-64 object-cover drop-shadow-xl blur-sm min-[450px]:max-[768px]:h-[375px] md:h-[480px] md:rounded-b-2xl"
        />
        <div className="absolute top-0 left-0 w-full h-64 bg-pm-grey-darker bg-opacity-60 min-[450px]:max-[768px]:h-[375px] md:h-[480px] md:rounded-b-2xl"></div>
        <IconButton
          disabled={disabled}
          className="absolute top-[calc(128px_/_2)] left-[calc(50%-56px)] h-32 w-32 text-white justify-center min-[450px]:max-[768px]:top-[calc(375px_/_2_-_64px)] md:top-[calc(480px_/_2_-_64px)]"
          onClick={() => document.getElementById("photos-input")!.click()}
        >
          <RiImageAddFill className="h-24 w-24" />
        </IconButton>
        <input
          type="file"
          id="photos-input"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => handleAddPhotos(e.currentTarget.files)}
        />
      </>
    );
  } else {
    content = (
      <>
        <Carousel
          photos={visiblePhotos}
          indicators
          className="min-[450px]:max-[768px]:h-[375px] md:h-[480px]"
        />
        <IconButton
          disabled={disabled}
          type="button"
          className="absolute top-2 right-2 h-14 w-14 text-white md:h-24 md:w-24"
          onClick={handleEditClick}
        >
          <RiImageEditFill className="h-14 w-14 md:h-24 md:w-24" />
        </IconButton>

        <EditImagePopup
          isModalShown={isPopupShown}
          closeModal={handleClosePopup}
          photos={tempPhotos}
          maxPhotos={maxPhotos}
          onChange={(newPhotos) => handleEditPhotos(newPhotos)}
        />
        {isMessageShown && (
          <p className="text-pm-black text-sm font-medium w-full text-right pr-12 pt-2">
            {`You can upload max ${maxPhotos} photos`}
          </p>
        )}
      </>
    );
  }

  return content;
}

export default RecipePhotos;
