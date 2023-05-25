import { Head } from "$fresh/runtime.ts";
import { Layout, Link } from "components/index.ts";
import AuthForm from "islands/AuthForm.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { ServerState } from "routes/_middleware.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<ServerState>) {
  const isAllowed = !!props.data.user;

  return (
    <Layout state={props.data}>
      <p class="my-6">You are currently {!isAllowed && "not"} signed in.</p>

      {!isAllowed ? (
        <Link href="/sign-in">Sign In</Link>
      ) : (
        <Link href="/api/sign-out">Sign Out</Link>
      )}
    </Layout>
  );
}
