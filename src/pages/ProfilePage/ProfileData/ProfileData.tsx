import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { RiMailSendLine } from "react-icons/ri";
import { AiOutlineUserDelete } from "react-icons/ai";
import { ProfileDataProps } from "./ProfileDataProps";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import AuthContext from "../../../components/AuthProvider/AuthProvider";
import ToastContext from "../../../components/Toast/ToastProvider";
import ResetPasswordModal from "../../common/ResetPasswordModal/ResetPasswordModal";
import DeleteAccountDialog from "./DeleteAccountDialog/DeleteAccountDialog";

function ProfileData({ isLoading, onDataProcessing }: ProfileDataProps) {
  const { currentUser, removeUser, updateUserData } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [formName, setFormName] = useState(currentUser!.displayName!);
  const [isResetPasswordShown, setIsResetPasswordShown] = useState(false);
  const [isDeleteAccountShown, setIsDeleteAccountShown] = useState(false);
  const [usernameValidationError, setUsernameValidationError] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const maxUsernameLength = 15;

  const isEmailProvider = currentUser?.providerData[0].providerId === "password";

  const resetPasswordButtonClasses =
    "w-full h-10 my-2 px-3 min-[500px]:max-w-60 min-[500px]:mx-0 min-[500px]:justify-self-start " +
    (isEmailProvider ? "flex" : "hidden");

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
    if (e.target.value.length <= maxUsernameLength) {
      setUsernameValidationError(false);
    } else {
      setUsernameValidationError(true);
    }
  };

  const handleBlurNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFormName(currentUser!.displayName!);
    }
  };

  const handleUpdateUsername = async (username: string) => {
    if (!usernameValidationError && username !== currentUser?.displayName) {
      try {
        onDataProcessing(true);
        await updateUserData(currentUser!, username);
        showToast("success", "Name changed successfully");
      } catch {
        showToast("error", "Change name failed");
      } finally {
        onDataProcessing(false);
      }
    }
  };

  const handleRemoveUser = async (user: User) => {
    try {
      onDataProcessing(true);
      await removeUser(user);
      showToast("success", "Account deleted successfully");
      navigate(`/`);
    } catch {
      showToast("error", "Delete account failed");
    } finally {
      onDataProcessing(false);
    }
  };

  const handleClosePasswordModal = () => setIsResetPasswordShown(false);

  const handleCloseAccountDelete = () => setIsDeleteAccountShown(false);

  const handleOpenDeleteAccount = () => setIsDeleteAccountShown(true);

  const handleOpenPasswordModal = () => setIsResetPasswordShown(true);

  return (
    <>
      <div className="mb-4 w-full flex flex-nowrap items-center justify-between">
        <h3 className="mr-4">Email:</h3>
        <Input className="px-4" value={currentUser!.email!} disabled></Input>
      </div>
      <div className="flex items-center">
        <h3 className="mr-4">Name:</h3>
        <Input
          className="px-4"
          ref={usernameRef}
          value={formName}
          onChange={handleNameInputChange}
          onBlur={handleBlurNameInput}
          invalid={usernameValidationError}
        ></Input>
      </div>
      {usernameValidationError && (
        <p className="text-pm-error-base text-sm font-medium w-full text-right pr-4 my-2">
          Maximum length of username is 15
        </p>
      )}
      <div className="flex flex-nowrap w-full mt-4 items-center justify-end">
        <Button
          raised
          secondary
          disabled={usernameValidationError}
          loading={isLoading}
          className="w-1/2 h-10 ml-4 mr-1 px-3 disabled:opacity-60 md:max-w-80"
          onClick={() => handleUpdateUsername(usernameRef.current!.value)}
        >
          Save change
        </Button>
      </div>
      <div className="flex flex-wrap w-full mt-8 px-3 mb-1 justify-center min-[500px]:mt-1 min-[500px]:grid min-[500px]:grid-cols-1">
        <Button
          raised
          basic
          disabled={isLoading}
          className={resetPasswordButtonClasses}
          onClick={handleOpenPasswordModal}
        >
          <RiMailSendLine className="mr-2 h-6 w-6" />
          Reset Password
        </Button>
        <Button
          raised
          error
          disabled={isLoading}
          className="w-full h-10 mb-2 min-[500px]:my-2 min-[500px]:mx-0 min-[500px]:max-w-60 min-[500px]:justify-self-start"
          onClick={handleOpenDeleteAccount}
        >
          <AiOutlineUserDelete className="mr-2 h-6 w-6" />
          Delete Account
        </Button>
      </div>
      <ResetPasswordModal
        userEmail={currentUser?.email || ""}
        isModalShown={isResetPasswordShown}
        closeModal={handleClosePasswordModal}
      />
      <DeleteAccountDialog
        isDialogShown={isDeleteAccountShown}
        closeDialog={handleCloseAccountDelete}
        handleDeleteAccount={() => handleRemoveUser(currentUser!)}
      />
    </>
  );
}

export default ProfileData;
