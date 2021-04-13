<img src="https://raw.githubusercontent.com/uwblueprint/dancefest-web/master/public/vectors/logo.svg" width="200" />

# Dancefest Web ([live](https://ossdancefest.com))

Dancefest Web is [Ontario Secondary School Dancefest's (OSSDF)](https://www.dancefestcanada.ca/)
Judging and Adjudication Platform. This webapp is utilized by OSSDF' judges to coordinate their
performance scoring.

## General Architecture

1. [NodeJS](https://nodejs.org/en/) application powered by the [Next.JS](https://nextjs.org/)
   framework.
2. [Prisma](https://www.prisma.io/) ORM for [PostgreSQL](https://www.postgresql.org/).
3. Service: [Amazon SES](https://aws.amazon.com/ses/) for outbound email service.
4. Service: [Heroku](https://heroku.com) for application and database deploys.

## Project structure

```bash
.
├── .github/workflows # Github deployment workflows
├── components # Individual application components
│   ├── Buttons.js
│   ├── Cards.js
│   ├── Inputs.js
│   ├── Layout.js
│   └── Modal.js
├── pages
│   ├── _app.js
│   ├── api # Serverless API routes
│   ├── event # /event/[id].js
│   ├── index.js # / -> Events
│   ├── login.js # /login
│   └── settings.js # /settings
├── prisma
│   ├── index.js # Prisma default export
│   ├── migrations
│   ├── schema.prisma # Prisma schema
│   └── schema.sql # SQL schema conforming to Prisma
│   └── seed.js # Prisma seeding scripts
├── public # Public outputs
│   ├── favicon.ico
│   └── vectors
├── styles
│   ├── components # Component styles
│   ├── globals.scss
│   └── pages # Page styles
# Misc individual files
├── .env.sample # Sample env file
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── jsconfig.json
├── LICENSE
├── package.json
├── README.md
└── yarn.lock
```

## Run locally

Duplicate `.env.sample` to `.env` and replace with your appropriate environment variables.

To deploy your database schema run (one-time):

```bash
# Deploy schema.sql to Heroku postgres
heroku pg:psql -a YOUR_APP_NAME -f prisma/schema.sql

# Regenerate Prisma schema and client
npx prisma introspect && npx prisma generate

# Seeding the database with sample data
npx prisma db seed --preview-feature
```

To run the application:

```bash
# Install dependencies
yarn

# Run locally
yarn dev
```

## Development

Linters are run automatically as a pre-commit hook on files you edit and commit.

To run the linters manually on the whole codebase:

```bash
# Runs linting
yarn lint

# Corrects linting issues
yarn fix
```

Future work: Per branch deploys for testing where you can open a PR against staging and comment
/deploy in the PR!

## Deploy

Deployment occurs automatically on-push to the
[Master](https://github.com/uwblueprint/dancefest-web/tree/master) and
[Staging](https://github.com/uwblueprint/dancefest-web/tree/staging) branches. These deploys are
handled by their respective
[Github Actions Workflows](https://github.com/uwblueprint/dancefest-web/tree/master/.github/workflows).

1. Master Deploy: [ossdancefest.com](https://www.ossdancefest.com)
2. Staging Deploy: [dancefest.dev](https://dancefest.dev)

## License

[MIT](https://github.com/uwblueprint/dancefest-web/blob/master/LICENSE)
