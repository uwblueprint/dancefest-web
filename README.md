# Dancefest

## Setup

Requirements:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- `.env` files pinned in Slack channel

## Development Workflow

The project is dockerized.  We use ReactJS, Flask, PostgreSQL, and Firebase. 

- Backend supports hot-reload so no need to re run it after every change
- Frontend supports hot-reload so no need to re run it after every change
- You may be missing one or more env variables in your `.env` file: check the Slack channel

To run the application:

```
$ docker-compose up
```

### Seeding

If you're running the app locally for the first time, uncomment `db.create_all()` in `db/init_db.py`. You may also want to seed the database, if so, uncomment `seed()` in the same file.
