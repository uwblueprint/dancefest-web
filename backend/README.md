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

To create and enter the virtual enviroment type the following commands:
```
$ pipenv --python 3.5
$ pipenv install --dev
$ pipenv shell
```

Run the following commands to initalize env vars:
```
export FLASK_APP=server.py
export PROJECT_NAME="dancefest-backend"
```

Run the app as follows:
```
$ flask run
```

To deactivate pipenv run:
```
$ exit
```