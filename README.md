# fresh project

## Usage

You need to have Redis installed and a Supabase project set up.

Create a `.env` file with the following variables:

```
SUPABASE_URL=https://<projectName>.supabase.co
SUPABASE_KEY=<api_key>
REDIS_USER=
REDIS_PASSWORD=
REDIS_HOSTNAME=
REDIS_PORT=
```

Run the app:

```
deno task start
```

This will watch the project directory and restart as necessary.
