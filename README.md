# fresh project

## Usage

You need to have Redis installed and a Supabase project set up.

Create a `.env` file with the following variables:

```
SUPABASE_URL=https://<projectName>.supabase.co
SUPABASE_KEY=<api_key>

// redis.com db
REDIS_USER=
REDIS_PASSWORD=
REDIS_HOSTNAME=
REDIS_PORT=

// upstash.com db
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Run the app:

```
deno task start
```

This will watch the project directory and restart as necessary.
