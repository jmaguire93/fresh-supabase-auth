import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { Layout } from "components/index.ts";
import AuthForm from "islands/AuthForm.tsx";
import { ServerState } from "routes/_middleware.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function SignUpPage(props: PageProps) {
  return (
    <Layout state={props.data}>
      <div class="flex justify-center">
        <div class="flex flex-col items-stretch w-[500px] md:w-2/3">
          <AuthForm mode="Up" />
        </div>
      </div>
    </Layout>
  );
}
