import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const { email, password } = await req.json();

    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: String(email),
      password: String(password),
    });
    const headers = new Headers();

    if (error) {
      return new Response(error.message, { status: error.status });
    }

    if (user && !session) {
      // flag to remind user to verify email address
      return new Response(
        "Please check your email to confirm your email address",
        { status: 403 }
      );
    }

    const exists = await supabase.auth.getUser(String(user));

    if (exists?.data.user) {
      return new Response("This user already exists on the system", {
        status: 409,
      });
    }

    headers.set("location", "/");

    return new Response(null, { status: 303, headers });
  },
};
