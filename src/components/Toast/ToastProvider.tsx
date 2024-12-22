import { useState, createContext, PropsWithChildren, useEffect, useRef, useCallback } from "react";
import Toast from "./Toast";
import { ToastType } from "./ToastProps";

interface ToastContext {
  showToast: (type: ToastType, message: string) => void;
}

interface ToastState {
  type: ToastType;
  message: string;
}

type HTMLPopoverElement = HTMLDivElement & { showPopover: () => void; hidePopover: () => void };

const ToastContext = createContext<ToastContext>({} as ToastContext);

function ToastProvider({ children }: PropsWithChildren) {
  const [isToastShown, setIsToastShown] = useState(false);
  const [toastState, setToastState] = useState<ToastState>({
    type: "info",
    message: "",
  });
  const toastRef = useRef<HTMLPopoverElement>(null);
  const timeout = 5000;

  const closeToast = () => {
    setIsToastShown(false);
  };

  useEffect(() => {
    if (isToastShown) {
      toastRef.current?.showPopover();
    } else {
      toastRef.current?.hidePopover();
    }
  }, [isToastShown]);

  const changeState = useCallback(
    (type: ToastType, message: string) => {
      setIsToastShown(true);
      setToastState({ type, message });
      setTimeout(() => {
        setIsToastShown(false);
      }, timeout);
    },
    [setIsToastShown, setToastState],
  );

  const context: ToastContext = {
    showToast: changeState,
  };

  return (
    <ToastContext.Provider value={context}>
      {children}
      <Toast
        className={isToastShown === true ? "animate-showUp" : "animate-dissapear"}
        type={toastState.type}
        message={toastState.message}
        ref={toastRef}
        closeToast={closeToast}
      ></Toast>
    </ToastContext.Provider>
  );
}

export { ToastProvider };
export default ToastContext;
