# CareerSphere

## Run frontend

1. Open a terminal in `frontend`
2. Run `npm install`
3. Run `npm run dev`

## Run backend auth server

1. Open a second terminal in `backend`
2. Run `npm install`
3. Copy `.env.example` to `.env` and update values if needed
4. SQLite is file-based, so no database server is needed
5. Run `npm run dev`

The frontend proxies `/api/*` requests to `http://localhost:4000`.

## Authentication notes

- Auth now stores users in SQLite
- Registration creates a persisted user with a hashed password
- Login validates credentials from SQLite and returns JWT
- A seeded demo account is available:
  - Username: `demo`
  - Password: `demo1234`
