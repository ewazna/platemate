import React, { ForwardedRef } from "react";
import Card from "../Card/Card";
import IconButton from "../IconButton/IconButton";
import { ToastProps } from "./ToastProps";
import { CgClose } from "react-icons/cg";
import { FaCheck, FaInfo, FaExclamation } from "react-icons/fa";

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { type, message, closeToast, className } = props;
    let icon;
    let bgColor;
    let borderColor;

    switch (type) {
      case "success":
        icon = <FaCheck className="text-pm-white h-5 w-5" />;
        bgColor = "bg-pm-success";
        borderColor = "border-pm-success";
        break;
      case "info":
        icon = <FaInfo className="text-pm-white h-5 w-5" />;
        bgColor = "bg-pm-orange-base";
        borderColor = "border-pm-orange-base";
        break;
      case "error":
        icon = <FaExclamation className="text-pm-white h-5 w-5" />;
        bgColor = "bg-pm-error-base";
        borderColor = "border-pm-error-base";
        break;
    }

    const cardClasses =
      "fixed inset-unset bottom-24 left-1/2 -translate-x-1/2 min-h-10 w-[calc(100%_-_24px)] px-2 py-3 m-0 font-roboto rounded-3xl font-medium border-t-4 shadow-lg md:min-w-1/3 md:w-auto " +
      borderColor +
      " " +
      className;

    const iconClasses =
      "flex items-center justify-center min-h-8 min-w-8 ml-2 mt-1 mr-3 rounded-full " + bgColor;

    return (
      <Card popover="manual" className={cardClasses} ref={ref}>
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className={iconClasses}>{icon}</div>
            <span className="w-full text-left my-2 mr-4">{message}</span>
          </div>
          <IconButton>
            <CgClose className="h-6 w-6" onClick={closeToast} />
          </IconButton>
        </div>
      </Card>
    );
  },
);

export default Toast;
