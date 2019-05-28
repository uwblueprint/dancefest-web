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

Access at: http://0.0.0.0:5000/api/

## Setup (Pipenv)

To create a virtual enviroment type the following commands:
```
$ python -m venv env
```

To activate and set up the virtual enviroment run:
```
$ source env/bin/activate
$ pip install -r requirements.txt 
```

Export the following env vars:
```
$ export PROJECT_NAME="blah"
```

Run the app as follows:
```
$ python server.py
```

Access at: http://0.0.0.0:5000/api/