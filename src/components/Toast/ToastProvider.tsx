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
  }, [toastState]);

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

  const context: ToastContext = {
    showToast: (type, message) => setToastState({ isToastShown: true, type, message }),
  };

  return (
    <ToastContext.Provider value={context}>
      {children}
      <Toast
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
