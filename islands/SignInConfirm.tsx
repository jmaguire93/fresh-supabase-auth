import { FormButton, Input } from "components/index.ts";
import { useState } from "preact/hooks";

interface Props {
  onSignInComplete: () => void;
  email: string;
}

export default function SignInConfirm(props: Props) {
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const { onSignInComplete, email } = props;

  const signInConfirm = {
    title: "Sign In",
    href: "/sign-in-confirm",
  };

  const handleAuthASubmit = async (e: Event) => {
    e.preventDefault();
    setErrorMessage("");
    setSaving(true);

    try {
      const response = await fetch("/api" + signInConfirm.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
        credentials: "same-origin",
      });

      if (response.ok) {
        setSaving(false);
        // onSignInComplete();
        window.location.href = "/";
      } else {
        const responseMessage = await response.text();
        setErrorMessage(responseMessage);
        setSaving(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "An error has occurred");
      setSaving(false);
    }
  };

  return (
    <div class="items-stretch min-w-0">
      <div class="flex justify-center">
        <h2 class="my-4 font-medium">
          copy<span class="font-extrabold">fuse</span>
        </h2>
      </div>
      <div class="text-center mb-4">
        We sent a confirmation code to <strong>{email}</strong>.
        <br />
        Please enter it below to continue.
      </div>
      <form method="post" class=" space-y-4" onSubmit={handleAuthASubmit}>
        <Input
          autofocus
          disabled={saving}
          type="text"
          name="code"
          value={code}
          onChange={(e: Event) => {
            const target = e?.target as HTMLInputElement;
            setCode(target.value);
          }}
        />
        <FormButton disabled={saving} type="submit" class="!mt-4">
          {signInConfirm.title}
        </FormButton>
      </form>
      {errorMessage && (
        <div class="text-error my-4 text-center">{errorMessage}!</div>
      )}
    </div>
  );
}
