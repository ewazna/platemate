import { useState, createContext, PropsWithChildren, useEffect, useRef, useCallback } from "react";
import Toast from "./Toast";
import { ToastType } from "./ToastProps";

interface ToastContext {
  showToast: (type: ToastType, message: string) => void;
}

interface ToastState {
  isToastShown: boolean;
  type: ToastType;
  message: string;
}

type HTMLPopoverElement = HTMLDivElement & { showPopover: () => void; hidePopover: () => void };

const ToastContext = createContext<ToastContext>({} as ToastContext);

function ToastProvider({ children }: PropsWithChildren) {
  const [toastState, setToastState] = useState<ToastState>({
    isToastShown: false,
    type: "info",
    message: "",
  });
  const toastRef = useRef<HTMLPopoverElement>(null);
  const timeout = 5000;

  const closeToast = useCallback(() => {
    setToastState({ ...toastState, isToastShown: false });
  }, [toastState, setToastState]);

  useEffect(() => {
    if (toastState.isToastShown) {
      toastRef.current?.showPopover();
      setTimeout(() => {
        closeToast();
      }, timeout);
    } else {
      toastRef.current?.hidePopover();
    }
  }, [toastState, closeToast]);

  const changeState = useCallback(
    (type: ToastType, message: string) => {
      setToastState({ isToastShown: true, type, message });
    },
    [setToastState],
  );

  const context: ToastContext = {
    showToast: changeState,
  };

  return (
    <ToastContext.Provider value={context}>
      {children}
      <Toast
        className={toastState.isToastShown === true ? "animate-showUp" : "animate-dissapear"}
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
