import React, { ForwardedRef } from "react";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import IconButton from "../IconButton/IconButton";
import { CgClose } from "react-icons/cg";
import { FaInfo } from "react-icons/fa";
import { DialogProps } from "./DialogProps";

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { isDialogShown, closeDialog, message, title, buttons } = props;

    const icon = <FaInfo className="text-pm-white h-5 w-5" />;

    let backdropClasses = "absolute inset-0 bg-gray-600";
    let cardClasses = "absolute bottom-0 rounded-b-none px-6";

    if (isDialogShown) {
      backdropClasses += " animate-fadeIn opacity-80 display-[inherit]";
      cardClasses += " animate-slideIn translate-y-0 display-[inherit]";
    } else {
      backdropClasses += " animate-fadeOut opacity-0 hidden";
      cardClasses += " animate-slideOut translate-y-full hidden";
    }

    return (
      <Modal isModalShown={isDialogShown} closeModal={closeDialog}>
        <div className={backdropClasses}></div>
        <Card ref={ref} className={cardClasses}>
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="flex items-center justify-center min-h-8 min-w-8 my-2 mr-3 rounded-full bg-pm-orange-base">
                {icon}
              </div>
              <div className="flex flex-wrap items-center my-1.5 ">
                <h3 className="text-m font-bold text-start mb-2 text-pm-orange-base">{title}</h3>
                <span className="w-full text-left mb-1 ">{message}</span>
              </div>
            </div>
            <IconButton>
              <CgClose className="h-6 w-6" onClick={closeDialog} />
            </IconButton>
          </div>
          <div className="flex flex-nowrap justify-center my-4">{buttons}</div>
        </Card>
      </Modal>
    );
  },
);

export default Dialog;
