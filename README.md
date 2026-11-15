# Next.js Ecommerce Store

This project is a full stack web app, that provides a fictional ecommerce store. It should showcase my ability to build a full front to end web application.

## Features

You can select quantities of your desired products and put them to your cart. The cart data is stored by using cookies as temporary memory. The information of the products are stored in a PostgresSQL database. After the checkout and filling out your personal information, the cart is being automatically emptied.

## Run Commands

To start the server on localhost run command:

```bash
pnpm dev
```

## Screenshots

![Home page of the Ecommerce store](./public/images/home-page.avif)
![Cart page of the Ecommerce store](./public/images/cart-page.avif)

## Database Setup

If you don't have PostgreSQL installed yet, follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Then, connect to the built-in `postgres` database as administrator in order to create the database:

### Windows

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

### macOS

```bash
psql postgres
```

### Linux

```bash
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
\connect <database name>
CREATE SCHEMA <schema name> AUTHORIZATION <user name>;
```

Quit `psql` using the following command:

```bash
\q
```

On Linux, it is [best practice to create an operating system user for each database](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_using_database_servers/using-postgresql_configuring-and-using-database-servers#con_postgresql-users_using-postgresql), to ensure that the operating system user can only access the single database and no other system resources. A different password is needed on Linux because [passwords of operating system users cannot contain the user name](https://github.com/upleveled/system-setup/issues/74). First, generate a random password and copy it:

```bash
openssl rand -hex 16
```

Then create the user, using the database user name from the previous section above. When you are prompted to create a password for the user, paste in the generated password.

```bash
sudo adduser <user name>
```

Once you're ready to use the new user, reconnect using the following command.

**Windows and macOS:**

```bash
psql -U <user name> <database name>
```

**Linux:**

```bash
sudo -u <user name> psql -U <user name> <database name>
```

## Migrations

To run the ley migrations, run command:

```bash
pnpm migrate up
```

For cleaning up, run this command for each down migration:

```bash
pnpm migrate down
```

or this command to run all down migrations at once:

```bash
pnpm migrate down --all
```

## Deployment

For deploying on [Fly.io](https://fly.io) walk through following steps:

- Create an account on Fly.io
- On the command line, open the Fly.io login page in your browser using the following command:

```bash
fly auth login
```

- Create an app, specifying the name using only lowercase letters and dashes:

```bash
fly apps create --name <app name>
```

- Generate a new Fly.io deploy token for this app named GitHub Actions Deploy Token and copy it, including the FlyV1 and space at the beginning.

```bash
fly tokens create deploy --app <app name> --name "GitHub Actions Deploy Token"
```

- In your GitHub repo under Settings → Secrets and variables → Actions, click the green New repository secret button in the middle of the page and create a new token with the name FLY_API_TOKEN and the token you copied as the secret
- Create and review the following Fly.io config files:
  - Dockerfile
  - .dockerignore
  - fly.toml
  - scripts/alpine-postgresql-setup-and-start.sh
  - scripts/fly-io-start.sh
  - next.config.ts
  - util/config.ts
- Change util/config.ts : add ssl config for Vercel
- Change util/config.ts and related files: alias Vercel database environment variables
- Add database credentials using Fly.io secrets, randomly generating the database name, username and password:

```bash
fly secrets set PGHOST=localhost PGDATABASE=upleveled$(openssl rand -hex 16) PGUSERNAME=upleveled$(openssl rand -hex 16) PGPASSWORD=$(openssl rand -base64 32)
```

- If your app needs any additional environment variables such as API keys, also add them to the secrets using the following pattern:

```bash
fly secrets set <secret name>=<secret value>
```

- Create a 1GB volume for the PostgreSQL database in the Amsterdam region

```bash
fly volumes create postgres --size 1 --region ams
```

- Deploy the app manually

```bash
fly deploy
```

If it is successful, a message with a URL will be displayed:

```bash
Visit your newly deployed app at <https://your-deployed-url.fly.dev>
```

Navigate to this URL in the browser - you will see that your server never loads the page (the hanging behavior we reviewed in the start script). Keep this page open in a browser tab so you can wake the server again if it suspends.
On the Logs & Errors page on Fly.io, the error message ❗️ No PostgreSQL database found, run the setup script from the start script appears in the logs. So the next step will be to run the setup script.

- SSH into the Fly.io machine (this connects to the terminal on the Fly.io machine so you can run commands) and set up PostgreSQL:

```bash
# Connect to the Fly.io machine to run commands
fly ssh console --app <app name>
# Create PostgreSQL directories, incl. data directory
mkdir -p /postgres-volume/run/postgresql/data
# Change ownership of directories to postgres user
chown -R postgres:postgres /postgres-volume/run/postgresql
# Allow database setup script to be executed
chmod +x /app/scripts/alpine-postgresql-setup-and-start.sh
# Create database cluster, start PostgreSQL, create a database and user
su postgres -c "/app/scripts/alpine-postgresql-setup-and-start.sh"
# Exit out of the Fly.io machine SSH console
exit
```

- Deploy the app manually one last time (future deploys will be automatic via GitHub Actions):

```bash
fly deploy
```

## Tests

### Jest

```bash
pnpm jest
```

### Playwright

```bash
pnpm playwright test --ui
# Or, for headless mode:
pnpm playwright test
```

## Technologies

- [Next.js](https://nextjs.org/)
- [Postgres.js](https://www.npmjs.com/package/postgres)
- [Ley](https://www.npmjs.com/package/@upleveled/ley)
- [Jest](https://jestjs.io/)
- [Playwright](https://playwright.dev/)
- [Fly.io](https://fly.io/)
- [Docker](https://www.docker.com/)
