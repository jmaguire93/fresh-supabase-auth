import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { supabase } from "lib/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const { email } = await req.json();
    const headers = new Headers();

    const { error } = await supabase.auth
      .signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: url.origin + "/",
        },
      });

    if (error) {
      return new Response(error.message, { status: error.status });
    }

    setCookie(headers, {
      name: "auth",
      value: email,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    headers.set("location", "/sign-in-confirm");

    return new Response(null, { status: 303, headers });
  },
};
