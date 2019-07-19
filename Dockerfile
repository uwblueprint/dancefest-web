FROM python:3.6
LABEL maintainer "UW Blueprint"
RUN apt-get update
RUN mkdir /app
ADD requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt
ADD . /app
ENV FLASK_ENV="docker"
EXPOSE 5000
RUN chmod +x ./entrypoint.sh