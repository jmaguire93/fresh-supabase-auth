import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import { Layout } from "components/index.ts";
import { getUserProfile, userHasProfile } from "../utils/user/profile.tsx";

interface Profile {
  id: string;
  full_name: string;
  username: string;
}

interface Props {
  data: {
    state: ServerState;
    profile: {
      data: Profile;
    };
  };
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const state = ctx.state as ServerState;
    let profile = null;
    let hasProfile = false;

    if (state.user) {
      hasProfile = await userHasProfile(state.user?.id);

      if (!hasProfile) {
        return Response.redirect(url.origin + "/create-profile", 303);
      }

      profile = await getUserProfile(state.user?.id);
    }

    return ctx.render({ state: ctx.state, profile });
  },
};

export default function Profile(props: Props) {
  const state = props.data.state;
  const profile = props.data.profile;

  return (
    <Layout state={state}>
      <div class="text-center sm:text-left">
        <p class="text-2xl">Welcome, {profile.data.full_name}</p>
        <p>Your username is: {profile.data.username}</p>
      </div>
    </Layout>
  );
}
