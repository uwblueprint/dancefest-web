FROM python:3.7
LABEL maintainer "UW Blueprint"

WORKDIR /app
RUN pip install pipenv
COPY Pipfile* /
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt
COPY . /app

EXPOSE 5000
ENTRYPOINT python server.py