import { Layout, Link } from "components/index.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
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
          ? `Welcome ${user.email}, you are now signed in!`
          : "Please sign in to continue."}
      </p>

      {!isLoggedIn
        ? <Link href="/sign-in">Sign In</Link>
        : <Link href="/api/sign-out">Sign Out</Link>}
    </Layout>
  );
}
