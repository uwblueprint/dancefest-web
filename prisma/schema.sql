DROP TABLE IF EXISTS verification_requests;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;

CREATE TABLE users (
  id             SERIAL,
  name           VARCHAR(255),
  email          VARCHAR(255),
  email_verified TIMESTAMPTZ,
  image          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE verification_requests (
  id         SERIAL,
  identifier VARCHAR(255) NOT NULL,
  token      VARCHAR(255) NOT NULL,
  expires    TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  event_date TIMESTAMP,
  num_performances INTEGER NOT NULL DEFAULT 0,
  judges JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX email
  ON users(email);

CREATE UNIQUE INDEX token
  ON verification_requests(token);
