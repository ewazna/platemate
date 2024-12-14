import { useContext, useState } from "react";
import IconButton from "../../../../components/IconButton/IconButton";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { CgClose } from "react-icons/cg";
import { useForm, SubmitHandler } from "react-hook-form";
import { ResetPasswordModalProps } from "./ResetPasswordModalProps";
import ToastContext from "../../../../components/Toast/ToastProvider";
import AuthContext from "../../../../components/AuthProvider/AuthProvider";
import Modal from "../../../../components/Modal/Modal";

interface PasswordResetForm {
  email: string;
}

function ResetPasswordModal({ userEmail, isModalShown, closeModal }: ResetPasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useContext(ToastContext);
  const { resetPassword } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PasswordResetForm>({ defaultValues: { email: userEmail } });

  const onSubmit: SubmitHandler<PasswordResetForm> = async (data) => {
    try {
      setIsLoading(true);
      await resetPassword(data.email);
      closeModal();
      showToast("success", "Reset password email sent");
    } catch {
      showToast("error", "Reset password failed");
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    closeModal();
    reset();
  };

  return (
    <Modal
      isModalShown={isModalShown}
      closeModal={closeModal}
      className="bottom-0 min-[550px]:w-[500px] min-[550px]:h-[290px] min-[550px]:bottom-unset min-[550px]:rounded-b-2xl min-[550px]:left-unset"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start justify-between sticky top-0">
          <h2 className="mb-3">Reset password</h2>
          <IconButton onClick={handleClose} basic className="scale-150">
            <CgClose />
          </IconButton>
        </div>
        <p className="mt-2 mb-6">Please specify email address to send reset password email</p>
        <div className="flex flex-wrap relative items-center justify-start">
          <label htmlFor="email">Email:</label>
          <Input
            id="email"
            placeholder="Email assigned to your account"
            className="w-full mx-0 my-1 px-4"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
              maxLength: {
                value: 50,
                message: "Maximum length of email is 50",
              },
            })}
            invalid={!!errors.email}
          />
          {errors.email && (
            <p className="absolute top-[70px] right-4 text-pm-error-base text-sm font-medium w-full text-right">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex justify-end sticky bottom-4 mt-6 mb-3">
          <Button secondary raised type="submit" loading={isLoading} className="w-44 h-10">
            Reset
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ResetPasswordModal;
