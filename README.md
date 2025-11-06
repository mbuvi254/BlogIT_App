# BlogIT_App

A basic yet functional blogging platform backend that lets users register, log in, write and manage blog posts, and maintain their profile.

Built with:

- TypeScript
- Node.js
- Express
- Prisma (ORM)
- Microsoft SQL Server (MSSQL)
- JSON Web Tokens (JWT) for auth
- bcryptjs for password hashing
- zxcvbn for password strength
- cookie-parser for cookie handling

> Note: The codebase mounts routes at `/auth`, `/profile`, and `/blogs` (see `src/app.ts`).


## Environment variables

Create a `.env` file at the project root with at least the following values:

```bash
PORT=5000
DATABASE_URL="sqlserver://USER:PASSWORD@HOST:PORT;database=DB_NAME;encrypt=true"
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5000
```

Adjust values for your environment. Keep `JWT_SECRET` private.

## Install & build

Install dependencies:

```bash
npm install -y
```

Compile TypeScript to `dist/`:

```bash
npm run build
```

Run the compiled server (example using nodemon in this repo):

```bash
npm run server
```

Notes:
- The project uses `type: "module"` in package.json and `module: nodenext` in tsconfig.

## Prisma (database)

The Prisma schema is at `prisma/schema.prisma`. The project expects a SQL Server datasource configured via `DATABASE_URL`.

Typical Prisma workflow:

```bash
# generate client
npx prisma generate

# create a migration (if schema changed)
npx prisma migrate dev --name init

# inspect database
npx prisma studio
```

## Key files and structure

- `src/app.ts` - app bootstrap, CORS and cookie parser setup, route wiring
- `src/controllers/authController.ts` - register, login, logout, profile
- `src/controllers/tokenHelpers.ts` - JWT generation and verification middleware
- `src/controllers/passwordHelpers.ts` - bcrypt password hashing and zxcvbn strength check
- `src/routes/authRoutes.ts` - `/auth` routes (register, login, profile)
- `src/routes/usersRoutes.ts` - `/users` CRUD routes

## API (important endpoints)

Public Auth `/ auth`:

- POST /auth/register — register a new user
- POST /auth/login — login; sets an HTTP-only cookie named `accessToken`
- POST /auth/logout — logout and clear cookie
- PATCH /auth/password — update password (protected)

Profile (mounted at `/profile` and protected):

- GET /profile — get current authenticated user profile
- PATCH /profile — update user profile
- GET /profile/blogs — get current user's blogs
- GET /profile/trash — get current user's trashed blogs

Blogs (mounted at `/blogs`, protected for write operations):

- POST /blogs — create a blog (authenticated)
- GET /blogs — list public blogs
- GET /blogs/:id — get a single blog (author-only access enforced)
- PATCH /blogs/:id — update a blog (author-only)
- DELETE /blogs/:id — delete a blog (author-only)
- POST /blogs/:id/trash — move a blog to trash (author-only)
- POST /blogs/:id/restore — restore a trashed blog (author-only)

## Authentication & Cookies (CORS considerations)

This project sets an httpOnly cookie named `accessToken` on login. A common issue when the login succeeds but the profile endpoint returns 401 is that the browser does not send the cookie on subsequent requests. To make cookies work across ports/origins during development follow these steps:

1. Make sure the server CORS `origin` matches your frontend origin. For example, if your frontend runs at `http://localhost:3000`, set `origin: 'http://localhost:3000'` in `src/app.ts` (or set `FRONTEND_URL` and wire it in `app.ts`).
2. The server must enable credentials: `credentials: true` (already set in `src/app.ts`).
3. The frontend must send requests with credentials enabled:

   - fetch: `fetch('/auth/profile', { credentials: 'include' })`
   - axios: `axios.get('/auth/profile', { withCredentials: true })`

4. Cookie `sameSite` and `secure` settings affect whether the browser accepts/sends cookies across origins:

   - For local development across different localhost ports, set `sameSite: 'lax'` on the cookie. In this code `sameSite` is set to `'lax'` for non-production and `'none'` in production (paired with `secure: true`). For cross-site cookies in production use `sameSite: 'none'` and `secure: true`.

5. Use browser devtools -> Network -> request -> Cookies and Response headers to debug `Set-Cookie` and whether the browser is sending the cookie on requests.

## Troubleshooting

- If login returns success but `/auth/profile` returns 401:
  - Confirm the login response included a `Set-Cookie` header for `accessToken`.
  - Confirm subsequent profile requests include the `Cookie` header with `accessToken`.
  - Ensure the frontend uses `credentials: 'include'` or `withCredentials: true`.
  - Consider changing the cookie `sameSite` to `'lax'` in `src/controllers/authController.ts` during dev.

- If you get `JWT_SECRET is not found` on startup, ensure `JWT_SECRET` is defined in `.env`.

## Useful commands

```bash
npm install
npm run build      # compile TypeScript
npm run server     # run compiled server (nodemon expected in repo)
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

## Notes & next steps

Install Prisma ORM package

```bash
npm init -y
nmp i prisma --save-dev
```
Initialise Prisma with SQL SERVER provider
```bash
npx  prisma init --datasource-provider sqlserver
```
Install Typescript 
```bash
npm install -D typescript ts-node @types/node @types/express nodemon
```

Install dotenv to use .env files
```bash
npm i dotenv
```

For Login
```bash
npm install bcryptjs
npm i -D @types/bcryptjs
```
use the zxcvbn package to check for the strength of a password.
```bash
npm install zxcvbn
npm i --save-dev @types/zxcvbn
```
For JWT
```bash
npm install jsonwebtoken
```

Fix Types Cors and JWT Errors ,types
```bash
npm i --save-dev @types/cors @types/jsonwebtoken
```

```bash
npm install --save-dev @types/bcrypt
```