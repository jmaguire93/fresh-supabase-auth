import { Button, Dialog } from "components/index.ts";
import { useState } from "preact/hooks";
import AuthForm from "./AuthForm.tsx";
import SignInConfirm from "./SignInConfirm.tsx";

type Props = {
  buttonText: string;
  buttonClass: string;
};

export default function SignInDialog(props: Props) {
  const { buttonClass, buttonText } = props;
  const [openSignInDialog, setOpenSignInDialog] = useState<boolean>(false);
  const [openSignInConfirmDialog, setOpenSignInConfirmDialog] = useState<
    boolean
  >(false);
  const [email, setEmail] = useState<string>("");

  const onStepComplete = () => {
    setOpenSignInDialog(false);
    setOpenSignInConfirmDialog(true);
  };

  const onSignInComplete = () => {
    setOpenSignInConfirmDialog(false);
  };

  return (
    <>
      <Button
        class={buttonClass}
        onClick={() => setOpenSignInDialog(true)}
      >
        {buttonText}
      </Button>
      <Dialog open={openSignInDialog} setOpen={setOpenSignInDialog}>
        <div class="mx-auto max-w-screen-md p-4">
          <AuthForm
            onStepComplete={onStepComplete}
            email={email}
            setEmail={setEmail}
          />
        </div>
      </Dialog>
      <Dialog
        open={openSignInConfirmDialog}
        setOpen={setOpenSignInConfirmDialog}
      >
        <div class="mx-auto max-w-screen-md p-4">
          <SignInConfirm
            onSignInComplete={onSignInComplete}
            email={email}
          />
        </div>
      </Dialog>
    </>
  );
}
