# CareerSphere

## Run frontend

1. Open a terminal in `frontend`
2. Run `npm install`
3. Run `npm run dev`

## Run backend auth server

1. Open a second terminal in `backend`
2. Run `npm install`
3. Run `npm run dev`

The frontend proxies `/api/*` requests to `http://localhost:4000`.

## Authentication notes

- Current auth uses an in-memory user store in `backend/src/server.js`
- This is temporary and can be replaced with a database later
- A seeded demo account is available:
  - Username: `demo`
  - Password: `demo1234`
