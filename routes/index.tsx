import { Layout, Link } from "components/index.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import { userHasProfile } from "../utils/user/profile.tsx";
import { useRef } from "preact/hooks";
import SignInDialog from "../islands/SignInDialog.tsx";
import AuthForm from "../islands/AuthForm.tsx";
import { animation, css, tw } from "twind/css";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const state = ctx.state as ServerState;

    if (state.user) {
      const profile = await userHasProfile(state.user?.id);

      if (!profile) {
        return Response.redirect(url.origin + "/create-profile", 303);
      }
    }

    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<ServerState>) {
  const user = props.data.user;
  const isLoggedIn = !!user;

  return (
    <Layout state={props.data}>
      <p class="my-6 text-xl">
        {isLoggedIn
          ? `Welcome, you are now signed in!`
          : "Please sign in to continue."}
      </p>

      {
        /* {!isLoggedIn
        ? <Link href="/sign-in">Sign In</Link>
        : <Link href="/api/sign-out">Sign Out</Link>} */
      }
    </Layout>
  );
}
