import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/supabase.ts";
import { ServerState } from "../_middleware.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const url = new URL(req.url);
    const { full_name, username } = await req.json();
    const headers = new Headers();

    const state = ctx.state as ServerState;
    const userId = state.user?.id;
    const { data, error } = await supabase
      .from("profile")
      .upsert({
        id: userId,
        username,
        full_name,
        updated_at: new Date(),
      })
      .select()
      .single();

    if (error) {
      return new Response(error.message, { status: 404 });
    }

    headers.set("location", "/profile");

    return new Response(null, { status: 303, headers });
  },
};
