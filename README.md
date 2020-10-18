# Dancefest Backend

## Setup

On the backend we use Python3, Flask, PostgreSQL, and Firebase. The server is dockerized so all you need to do is run the instructions below. Make sure you have Docker desktop installed.

Message a member of DanceFest Fall 2020 for `.env` credentials.

## Commands

To first setup the backend run the following commands:

```
$ docker-compose up --build
```

On subsequent runs you can omit the --build tag.

```
$ docker-compose up
```

### Running After Code Changes

If you have new pip dependencies or you have changed the Dockerfile you need to run:
```
$ docker-compose build
$ docker-compose up -d --force-recreate
```

If you only made code changes run:
```
$ docker-compose up -d --force-recreate
```

### Seeding

If you're running the app locally for the first time, uncomment `db.create_all()` in `db/init_db.py`. You may also want to seed the database, if so, uncomment `seed()` in the same file.
