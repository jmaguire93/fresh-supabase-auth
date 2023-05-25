import { FormButton, Input } from "components/index.ts";
import { useState } from "preact/hooks";

type Props = {
  mode: "In" | "Up";
};

export default function AuthForm({ mode }: Props) {
  const signIn = {
    title: "Sign In",
    href: "/sign-in",
    tesxt: "Have an account?",
  };

  const signUp = {
    title: "Sign Up",
    href: "/sign-up",
    tesxt: "No account?",
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const buttonProps = mode === "In" ? signIn : signUp;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleAuthASubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSaving(true);

    try {
      const response = await fetch("/api" + buttonProps.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
      });

      if (response.ok) {
        setSaving(false);
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
        <h2 class="my-4">{buttonProps.title}</h2>
      </div>
      <form method="post" class=" space-y-4" onSubmit={handleAuthASubmit}>
        <Input
          autofocus
          disabled={saving}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          disabled={saving}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton disabled={saving} type="submit" class="!mt-8">
          {buttonProps.title}
        </FormButton>
      </form>
      {errorMessage && (
        <div class="text-error my-4 text-center">{errorMessage}!</div>
      )}
    </div>
  );
}
