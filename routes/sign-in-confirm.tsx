import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import { Layout } from "components/index.ts";
import SignInConfirm from "islands/SignInConfirm.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function SignInPage(props: PageProps<ServerState>) {
  return (
    <Layout state={props.data}>
      <div class="flex justify-center">
        <div class="flex flex-col items-stretch w-[500px] md:w-2/3">
          <SignInConfirm />
        </div>
      </div>
    </Layout>
  );
}
