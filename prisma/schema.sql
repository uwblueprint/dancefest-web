-- Create user roles
CREATE TYPE Role AS ENUM('USER', 'JUDGE', 'ADMIN');

-- Create settings enum
CREATE TYPE SettingType as ENUM('COMPETITION_LEVEL', 'DANCE_SIZE', 'STYLE');

-- Create award status enum
CREATE TYPE AwardPerformanceStatus as ENUM('NOMINEE', 'FINALIST');

-- Create award type enum
CREATE TYPE AwardType as ENUM('DANCE_ARTISTRY', 'SCORE_BASED', 'SPECIAL');

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  role Role NOT NULL DEFAULT 'USER',
  email VARCHAR(255) UNIQUE,
  email_verified TIMESTAMPTZ,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create email verification requests table
CREATE TABLE verification_requests (
  id SERIAL PRIMARY KEY NOT NULL,
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create individual events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  event_date TIMESTAMP,
  num_performances INTEGER NOT NULL DEFAULT 0,
  judges JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create schools table
CREATE TABLE schools (
  id SERIAL PRIMARY KEY NOT NULL,
  school_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create settings table
CREATE TABLE settings (
  id SERIAL PRIMARY KEY NOT NULL,
  type SettingType NOT NULL,
  value VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT settings_unique UNIQUE (type, value)
);

-- Create performances table
CREATE TABLE performances (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  performance_link VARCHAR(255),
  audio_recording_link VARCHAR(255),
  performers VARCHAR(255)[],
  choreographers VARCHAR(255)[],
  competition_level VARCHAR(255),
  dance_size VARCHAR(255),
  dance_style VARCHAR(255),
  dance_title VARCHAR(255),
  dance_size_id INTEGER,
  dance_style_id INTEGER,
  competition_level_id INTEGER,
  event_id INTEGER NOT NULL,
  school_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(dance_size_id) REFERENCES settings(id),
  FOREIGN KEY(dance_style_id) REFERENCES settings(id),
  FOREIGN KEY(competition_level_id) REFERENCES settings(id),
  FOREIGN KEY(event_id) REFERENCES events(id),
  FOREIGN KEY(school_id) REFERENCES schools(id)
);

-- Create adjudications table
CREATE TABLE adjudications (
  id SERIAL PRIMARY KEY NOT NULL,
  artistic_mark INTEGER NOT NULL,
  technical_mark INTEGER NOT NULL,
  cumulative_mark INTEGER NOT NULL,
  audio_url VARCHAR(255),
  notes TEXT,
  performance_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(performance_id) REFERENCES performances(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Create awards table
CREATE TABLE awards (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  type AwardType NOT NULL,
  is_finalized BOOLEAN NOT NULL DEFAULT FALSE,
  event_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(event_id) REFERENCES events(id)
);

-- Create award categories table
CREATE TABLE awards_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  award_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY(award_id) REFERENCES awards(id),
  FOREIGN KEY(category_id) REFERENCES settings(id),
  CONSTRAINT "awards_categories_unique" UNIQUE (award_id, category_id)
);

-- Create awards_performances table
CREATE TABLE awards_performances (
  id SERIAL PRIMARY KEY NOT NULL,
  award_id INTEGER,
  performance_id INTEGER,
  user_id INTEGER NOT NULL,
  status AwardPerformanceStatus NOT NULL DEFAULT 'NOMINEE',
  FOREIGN KEY(award_id) REFERENCES awards(id),
  FOREIGN KEY(performance_id) REFERENCES performances(id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT "unique_nomination" UNIQUE (award_id, performance_id, user_id)
);
