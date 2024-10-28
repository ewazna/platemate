import Button from "../../../../components/Button/Button";
import Dialog from "../../../../components/Dialog/Dialog";
import { GroupDialogProps } from "./GroupDialogProps";

function GroupDialog({
  isDialogShown,
  closeDialog,
  handleKeepRecipes,
  handleDeleteRecipes,
}: GroupDialogProps) {
  const message = `
    Do you want the recipes assigned to the groups to also be deleted?  
    Press DELETE, to remove recipes.
    Press KEEP, to keep recipes. Recipes without assign group can be found in 'All' tab.
  `;

  const handleKeep = () => {
    handleKeepRecipes();
    closeDialog();
  };

  const handleDelete = () => {
    handleDeleteRecipes();
    closeDialog();
  };

  const buttons = (
    <>
      <Button basic raised className="w-36 mx-2" onClick={handleKeep}>
        Keep
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
      title="Deleting recipes assigned to groups"
    />
  );
}

export default GroupDialog;
