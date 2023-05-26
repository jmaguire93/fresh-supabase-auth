import { Handlers, PageProps } from "$fresh/server.ts";

import { ServerState } from "routes/_middleware.ts";
import { Layout } from "components/index.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Profile(props: PageProps<ServerState>) {
  return (
    <Layout state={props.data}>
      <div class="flex flex-col items-center">
        <h2>Welcome to your profile, content coming soon...</h2>
      </div>
    </Layout>
  );
}
