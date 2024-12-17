import Button from "../../../../components/Button/Button";
import Dialog from "../../../../components/Dialog/Dialog";
import { DeleteAccountDialogProps } from "./DeleteAccountDialogProps";

function DeleteAccountDialog({
  isDialogShown,
  closeDialog,
  handleDeleteAccount,
}: DeleteAccountDialogProps) {
  const message = "Are you sure you want to delete your account?";

  const handleDelete = () => {
    handleDeleteAccount();
    closeDialog();
  };

  const buttons = (
    <>
      <Button basic raised className="w-36 mx-2" onClick={closeDialog}>
        Cancel
      </Button>
      <Button secondary raised className="w-36 mx-2" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );

  return (
    <Dialog
      isDialogShown={isDialogShown}
      closeDialog={closeDialog}
      message={message}
      buttons={buttons}
      title="Deleting account"
    />
  );
}

export default DeleteAccountDialog;
