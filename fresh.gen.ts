// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/api/sign-in-confirm.tsx";
import * as $3 from "./routes/api/sign-in.tsx";
import * as $4 from "./routes/api/sign-out.tsx";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/profile.tsx";
import * as $7 from "./routes/sign-in-confirm.tsx";
import * as $8 from "./routes/sign-in.tsx";
import * as $$0 from "./islands/AuthForm.tsx";
import * as $$1 from "./islands/SignInConfirm.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_middleware.ts": $1,
    "./routes/api/sign-in-confirm.tsx": $2,
    "./routes/api/sign-in.tsx": $3,
    "./routes/api/sign-out.tsx": $4,
    "./routes/index.tsx": $5,
    "./routes/profile.tsx": $6,
    "./routes/sign-in-confirm.tsx": $7,
    "./routes/sign-in.tsx": $8,
  },
  islands: {
    "./islands/AuthForm.tsx": $$0,
    "./islands/SignInConfirm.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
