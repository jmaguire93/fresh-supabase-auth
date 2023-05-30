import { FormButton, Input } from "components/index.ts";
import { useState } from "preact/hooks";

interface Props {
  onStepComplete: () => void;
  email: string;
  setEmail: (value: string) => void;
}

export default function AuthForm(props: Props) {
  const { onStepComplete, email, setEmail } = props;
  const signIn = {
    title: "copyfuse",
    href: "/sign-in",
  };

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleAuthASubmit = async (e: Event) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api" + signIn.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "same-origin",
      });

      if (response.ok) {
        setSaving(false);
        onStepComplete();
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
        <h2 class="my-4">
          copy<span class="font-extrabold">fuse</span>
        </h2>
      </div>
      <div class="text-center mb-4">
        Enter your email address below and we will send you a code to sign in
        with.
      </div>
      <form method="post" class=" space-y-4" onSubmit={handleAuthASubmit}>
        <Input
          autofocus
          disabled={saving}
          type="email"
          name="email"
          value={email}
          onChange={(e: Event) => {
            const target = e?.target as HTMLInputElement;
            setEmail(target.value);
          }}
        />
        <FormButton disabled={saving} type="submit" class="!mt-4">
          Send
        </FormButton>
      </form>
      {errorMessage && (
        <div class="text-error my-4 text-center">{errorMessage}.</div>
      )}
    </div>
  );
}
