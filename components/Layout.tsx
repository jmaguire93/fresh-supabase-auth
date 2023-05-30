import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

import { ServerState } from "routes/_middleware.ts";
import { NavButton, NavLink } from "components/index.ts";
import SignInDialog from "../islands/SignInDialog.tsx";

type Props = {
  children: ComponentChildren;
  state: ServerState;
};

export function Layout(props: Props) {
  const isLoggedIn = !!props.state.user;

  const buttProps = isLoggedIn
    ? { href: "/api/sign-out", text: "Sign Out" }
    : { href: "/sign-in", text: "Sign In" };

  return (
    <>
      <Head>
        <title>copyfuse</title>
      </Head>

      <div class="bg-primary">
        <nav class="flex items-center justify-between flex-wrap min-h-[70px] max-w-screen-md mx-auto px-4 py-2">
          <a href="/">
            <div class="flex flex-shrink-0 border-white">
              <h1 class="ml-2 text-white font-medium">
                copy<span class="font-extrabold">fuse</span>
              </h1>
            </div>
          </a>

          <div class="flex flex-grow border-gray pt-1">
            <div class="flex flex-grow">
              {isLoggedIn && <NavLink href="/profile">Profile</NavLink>}
            </div>
            <div class="flex sm:flex-shrink-0">
              {/* <NavButton href={buttProps.href}>{buttProps.text}</NavButton> */}
              <div>
                {!isLoggedIn
                  ? (
                    <SignInDialog
                      buttonText={buttProps.text}
                      buttonClass="rounded !border(white 2) text-white hover:bg-primaryLight !hover:border-primaryLight"
                    />
                  )
                  : (
                    <NavButton href={buttProps.href}>
                      {buttProps.text}
                    </NavButton>
                  )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="mx-auto max-w-screen-md p-4">{props.children}</div>
    </>
  );
}
