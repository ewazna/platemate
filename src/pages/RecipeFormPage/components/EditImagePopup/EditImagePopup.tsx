import { useState, useEffect } from "react";
import { PiPlusBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import IconButton from "../../../../components/IconButton/IconButton";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { EditImagePopupProps } from "./EditImagePopupProps";
import { RecipePhoto } from "../../../../models";

function EditImagePopup({
  isModalShown,
  closeModal,
  photos,
  maxPhotos,
  onChange,
}: EditImagePopupProps) {
  const [tempEditPhotos, setTempEditPhotos] = useState<RecipePhoto[]>(photos);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");

  function transformUrl(url: string): string {
    return (
      url.substring(0, url.indexOf("upload") + 7) +
      "c_auto,w_280" +
      url.slice(url.indexOf("upload") + 6)
    );
  }

  useEffect(() => {
    setTempEditPhotos(photos);
  }, [photos]);

  useEffect(() => {
    const currentTempPhotos = tempEditPhotos.filter(({ state }) => state !== "deleted");
    if (currentTempPhotos.length === maxPhotos) {
      setIsAddButtonDisabled(true);
      setMessage(`You can upload max ${maxPhotos} photos`);
    } else {
      setIsAddButtonDisabled(false);
      setMessage("");
    }
  }, [tempEditPhotos, maxPhotos, isModalShown]);

  const handleClose = () => {
    closeModal();
    setTempEditPhotos(photos);
  };

  const handleDeleteImage = (filename: string) => {
    const updatedPhotos: RecipePhoto[] = [];

    tempEditPhotos.forEach((photo) => {
      if (photo.filename === filename) {
        if (photo.state === "existing") {
          updatedPhotos.push({ ...photo, state: "deleted" });
          return;
        } else {
          return;
        }
      }
      updatedPhotos.push({ ...photo });
    });

    if (isAddButtonDisabled) {
      setIsAddButtonDisabled(false);
      setMessage("");
    }
    setTempEditPhotos(updatedPhotos);
  };

  const handleAddImages = async (input: HTMLInputElement) => {
    const newPhotos: FileList | null = input.files;
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

    const currentTempPhotos = tempEditPhotos.filter(({ state }) => state !== "deleted");
    const totalPhotosCount = currentTempPhotos.length + filteredPhotosArray.length;
    if (totalPhotosCount >= maxPhotos) {
      filteredPhotosArray.splice(maxPhotos - currentTempPhotos.length);
      setIsAddButtonDisabled(true);
      if (totalPhotosCount >= maxPhotos) {
        setMessage(`You can upload max ${maxPhotos} photos`);
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
    input.value = "";
  };

  const handleDiscard = () => {
    setTempEditPhotos(photos);
  };

  const handleApply = () => {
    onChange(tempEditPhotos);
    closeModal();
  };

  return (
    <Modal
      isModalShown={isModalShown}
      closeModal={closeModal}
      className="bottom-0 min-[550px]:bottom-unset min-[550px]:w-[500px] min-[550px]:rounded-b-2xl md:w-3/4 md:max-w-[900px] "
    >
      <div className="flex items-start justify-between sticky top-0 mb-2">
        <h2>Edit Images</h2>
        <IconButton onClick={handleClose} basic className="scale-150">
          <CgClose />
        </IconButton>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {tempEditPhotos
          .filter((photo) => photo.state !== "deleted")
          .map((photo) => {
            return (
              <div key={photo.filename} className="w-full aspect-square drop-shadow-xl">
                <img
                  src={photo.state !== "added" ? transformUrl(photo.url) : photo.url}
                  className="w-full aspect-square object-cover"
                />
                <IconButton
                  basic
                  raised
                  className="flex justify-center items-center absolute top-1 right-1 h-6 w-6 p-1 bg-opacity-80 min-[450px]:top-3 min-[450px]:right-3 min-[450px]:h-8 min-[450px]:w-8"
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
          className="flex rounded-none justify-center items-center w-full aspect-square bg-pm-grey-base drop-shadow-xl hover:drop-shadow-none "
        >
          <PiPlusBold className="h-10 w-10 text-pm-grey-dark md:h-20 md:w-20" />
        </IconButton>
        <input
          type="file"
          id="photos"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => handleAddImages(e.currentTarget)}
        />
      </div>
      {message ? <p className="w-full text-end pt-2">{message}</p> : null}
      <div className="flex justify-between mt-5 mb-2 sticky bottom-0">
        <Button basic underlined type="button" onClick={handleDiscard}>
          Discard
        </Button>
        <Button secondary raised type="button" className="w-44" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </Modal>
  );
}

export default EditImagePopup;
