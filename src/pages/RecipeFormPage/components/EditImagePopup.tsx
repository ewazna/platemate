import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import Card from "../../../components/Card/Card";
import IconButton from "../../../components/IconButton/IconButton";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import { EditImagePopupProps } from "./EditImagePopupProps";
import { RecipePhoto } from "../../../models";

function transformUrl(url: string): string {
  return (
    url.substring(0, url.indexOf("upload") + 7) +
    "c_auto,w_100" +
    url.slice(url.indexOf("upload") + 6)
  );
}

function EditImagePopup({ isModalShown, closeModal, photos, onChange }: EditImagePopupProps) {
  const [tempEditPhotos, setTempEditPhotos] = useState<RecipePhoto[]>(photos);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const maxPhotos = 5;

  const handleClose = () => {
    closeModal();
  };

  const handleDeleteImage = (filename: string) => {
    const updatedPhotos: RecipePhoto[] = [];
    tempEditPhotos.map((photo) => {
      if (photo.filename === filename) {
        if (photo.state === "existing") {
          return updatedPhotos.push({ ...photo, state: "deleted" });
        } else {
          return;
        }
      }
      return updatedPhotos.push({ ...photo });
    });

    if (isAddButtonDisabled) {
      setIsAddButtonDisabled(false);
      setMessage("");
    }
    setTempEditPhotos(updatedPhotos);
  };

  const handleAddImages = async (newPhotos: FileList | null) => {
    if (!newPhotos) {
      return;
    }

    const photosArray = Array.from<File>(newPhotos);

    const filteredPhotosArray = photosArray.filter(
      (file: File) => !tempEditPhotos.find((photo) => photo.filename === file.name),
    );

    if (filteredPhotosArray.length < photosArray.length) {
      setMessage("Photos names must be unique");
    }

    const totalPhotosCount = tempEditPhotos.length + filteredPhotosArray.length;
    if (totalPhotosCount >= maxPhotos) {
      filteredPhotosArray.splice(maxPhotos - tempEditPhotos.length);
      setIsAddButtonDisabled(true);
      if (totalPhotosCount > maxPhotos) {
        setMessage(`You can upload max ${maxPhotos} photos.`);
      }
    }

    const readedFiles = await Promise.all(
      filteredPhotosArray.map(
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

    setTempEditPhotos([...tempEditPhotos, ...readedFiles]);
  };

  const handleDiscard = () => {
    setTempEditPhotos(photos);
  };

  const handleApply = () => {
    onChange(tempEditPhotos);
    closeModal();
  };

  const backdropClasses =
    "absolute inset-0 bg-gray-600 " +
    (isModalShown
      ? "animate-fadeIn opacity-80 display-[inherit]"
      : "animate-fadeOut opacity-0 hidden");

  const cardClasses =
    "absolute top-4 w-[calc(100%_-_32px)] mx-4 px-6 " +
    (isModalShown
      ? "animate-slideIn translate-y-0 display-[inherit]"
      : "animate-slideOut translate-y-full hidden");

  return (
    <Modal isModalShown={isModalShown} closeModal={closeModal}>
      <div className={backdropClasses}></div>
      <Card className={cardClasses}>
        <div className="flex items-start justify-between sticky top-0">
          <h2>Edit Images</h2>
          <IconButton onClick={handleClose} basic className="scale-150">
            <CgClose />
          </IconButton>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {tempEditPhotos
            .filter((photo) => photo.state !== "deleted")
            .map((photo) => {
              return (
                <div key={photo.filename} className="w-24 h-24 drop-shadow-xl">
                  <img
                    src={photo.state !== "added" ? transformUrl(photo.url) : photo.url}
                    className="w-24 h-24 object-cover"
                  />
                  <IconButton
                    basic
                    raised
                    className="absolute top-1 right-1 h-6 w-6 p-1 bg-opacity-80"
                    onClick={() => handleDeleteImage(photo.filename)}
                  >
                    <CgClose className="h-6 w-6" />
                  </IconButton>
                </div>
              );
            })}
          <IconButton
            disabled={isAddButtonDisabled}
            onClick={() => document.getElementById("photos")!.click()}
            className="flex rounded-none justify-center items-center w-24 h-24 bg-pm-grey-base drop-shadow-xl"
          >
            <PiPlusBold className="h-10 w-10 text-pm-grey-dark" />
          </IconButton>
          <input
            type="file"
            id="photos"
            className="hidden"
            multiple
            onChange={(e) => handleAddImages(e.currentTarget.files)}
          />
        </div>
        {message ? <p className="w-full text-end pt-2">{message}</p> : null}
        <div className="flex justify-between mt-8 mb-2 sticky bottom-0">
          <Button basic underlined type="button" onClick={handleDiscard}>
            Discard
          </Button>
          <Button secondary raised type="button" className="w-44" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </Card>
    </Modal>
  );
}

export default EditImagePopup;