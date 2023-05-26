import { FormButton, Input } from "components/index.ts";
import { useState } from "preact/hooks";

export default function AuthForm() {
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleAuthASubmit = async (e: Event) => {
    e.preventDefault();
    setErrorMessage("");

    if (!firstName || !surname || !username) {
      return;
    }
    const fullName = `${firstName} ${surname}`;

    setSaving(true);

    try {
      const response = await fetch("/api/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          username,
        }),
        credentials: "same-origin",
      });

      if (response.ok) {
        setSaving(false);
        window.location.href = "/profile";
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
        <h2 class="my-4">Create Profile</h2>
      </div>
      <div class="text-center mb-4">
        Please enter your profile details
      </div>
      <form method="post" class=" space-y-4" onSubmit={handleAuthASubmit}>
        <Input
          autofocus
          disabled={saving}
          type="text"
          name="firstname"
          value={firstName}
          onChange={(e: Event) => {
            const target = e?.target as HTMLInputElement;
            setFirstName(target.value);
          }}
        />
        <Input
          autofocus
          disabled={saving}
          type="text"
          name="surname"
          value={surname}
          onChange={(e: Event) => {
            const target = e?.target as HTMLInputElement;
            setSurname(target.value);
          }}
        />
        <Input
          autofocus
          disabled={saving}
          type="text"
          name="username"
          value={username}
          onChange={(e: Event) => {
            const target = e?.target as HTMLInputElement;
            setUsername(target.value);
          }}
        />
        <FormButton disabled={saving} type="submit" class="!mt-4">
          Create Profile
        </FormButton>
      </form>
      {errorMessage && (
        <div class="text-error my-4 text-center">{errorMessage}.</div>
      )}
    </div>
  );
}
