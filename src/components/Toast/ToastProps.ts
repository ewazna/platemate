export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  type: ToastType;
  message: string;
  closeToast: () => void;
  title?: string;
  className?: string;
}
