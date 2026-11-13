# Data-Driven Recipe Manager

A React app that searches TheMealDB, saves selected meals to a local json-server
API, and lets you filter, edit, delete, and favorite saved recipes.

## Run locally

Install dependencies and copy the environment example:

```powershell
npm install
Copy-Item .env.example .env
```

Run each command in its own terminal:

```powershell
npm run api
```

```powershell
npm run dev
```

## Optimistic favorite rollback

The star updates immediately. If its PATCH fails, the previous favorite state
is restored. This screenshot captures the star before the deliberately failed
request completed:

![Favorite rollback proof](screenshots/favorite-rollback.png)

## Query keys

Searches use `["meals", term]` so each search term has its own cache entry and
returning to a previous term can reuse its results. Categories use the stable
`["categories"]` key, while the saved collection uses `["recipes"]`; mutations
invalidate the recipes key so the server remains the source of truth.
