import { useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { LuCopy } from "react-icons/lu";
import { CgClose } from "react-icons/cg";

import { ShareRecipeProps } from "./ShareRecipeProps";
import IconButton from "../../../../components/IconButton/IconButton";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";

function ShareRecipe({ isShareRecipeShown, closeShareRecipe }: ShareRecipeProps) {
  const [isMessageShown, setIsMessageShown] = useState(false);

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsMessageShown(true);
  };

  const handleClose = () => {
    closeShareRecipe();
    setIsMessageShown(false);
  };

  return (
    <Modal
      isModalShown={isShareRecipeShown}
      closeModal={closeShareRecipe}
      className="bottom-0 min-[550px]:bottom-unset min-[550px]:w-[500px] min-[550px]:rounded-b-2xl"
    >
      <div className="flex items-start justify-between">
        <h2 className="mb-3">Share a recipe</h2>
        <IconButton onClick={handleClose} basic className="scale-150">
          <CgClose />
        </IconButton>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center mt-4">
          <Input value={shareUrl} readOnly={true} className="px-4" />
          <IconButton onClick={handleCopy} className="ml-1">
            <LuCopy />
          </IconButton>
        </div>
        {isMessageShown && (
          <p className="absolute right-4 text-pm-success text-sm font-medium text-right w-full my-1 pr-4">
            Copied successfully
          </p>
        )}
      </div>
      <div className="flex flex-nowrap mb-4 justify-evenly">
        <EmailShareButton
          url={shareUrl}
          className="rounded-full focus-visible:outline-offset-4 focus-visible:outline-2"
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
        <FacebookShareButton
          url={shareUrl}
          className="rounded-full focus-visible:outline-offset-4 focus-visible:outline-2"
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          className="rounded-full focus-visible:outline-offset-4 focus-visible:outline-2"
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton
          url={shareUrl}
          className="rounded-full focus-visible:outline-offset-4 focus-visible:outline-2"
        >
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>
        <WhatsappShareButton
          url={shareUrl}
          className="rounded-full focus-visible:outline-offset-4 focus-visible:outline-2"
        >
          <WhatsappIcon size={39} round={true} />
        </WhatsappShareButton>
      </div>
    </Modal>
  );
}

export default ShareRecipe;
