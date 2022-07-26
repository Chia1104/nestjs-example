# NestJS Tutorial

This is a simple NestJS application build with Postgres and Passport to do authentication.

## Language and Tools

<div align="center">
  <img src="https://skillicons.dev/icons?i=ts,nest,postgres" />
</div>

## Features

- [x] Authentication
- [ ] Dockerized

## Get Started

Generate the .env file and add your database credentials.

```bash
$ cp .env.example .env
```

Install dependencies and enable Husky

```bash
$ pnpm install
$ pnpm husky install
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```
