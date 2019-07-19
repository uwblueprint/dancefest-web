# Dancefest Backend

## Setup (Docker)

Add a `.env.dev` file with the key names below:
```
PROJECT_NAME
```

To start the backend add the following commands:

```
$ sudo docker-compose build
$ sudo docker-compose up -d
```

### Running After Code Changes

If you have new pip dependencies or you have changed the Dockerfile you need to run:
```
$ sudo docker-compose build
$ sudo docker-compose up -d --force-recreate
```

If you only made code changes run:
```
$ sudo docker-compose up -d --force-recreate
```

## Setup (pipenv)

BUILD Project from root directory (dancefest-web) before starting backend server using the following command:
```
$ npm run build
```

CD into Backend
```
$ cd backend/
```

First time setup run the following commands:
```
$ pipenv --python 3.6
$ pipenv install --dev
```

You need to install `psycopg2-binary`, but it couldn't install for me but you can directly install the binary with:

```
pip install psycopg2-binary
```

Fill in the `.env` file with any needed variables

To create and enter the virtual enviroment type the following commands:
```
$ pipenv shell
```

Run the app as follows:
```
$ flask run
```

To deactivate pipenv run:
```
$ exit
```

## Setup (db)

Start the postgres server, and enter the postgres terminal

```
pg_ctl -D /usr/local/var/postgres start
psql postgres
```

Create the database (first time setup)

```
postgres=# CREATE DATABASE dancefest;
```
