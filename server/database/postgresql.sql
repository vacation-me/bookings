DROP DATABASE IF EXISTS bookings;
CREATE DATABASE bookings;
\c bookings;

CREATE TABLE listings(
  ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  PRICE INT,
  CLEANING_FEE INT,
  SERVICE_FEE_PERCENT DOUBLE PRECISION,
  MIN_STAY INT,
  MAX_GUESTS INT
);
\COPY listings FROM 'server/database/listings.csv' WITH (FORMAT csv);

CREATE TABLE bookings(
  ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  LISTING_ID INT,
  STARTING_DATE VARCHAR(30),
  DAYS_BOOKED INT
);
\COPY bookings FROM 'server/database/bookings.csv' WITH (FORMAT csv);
ALTER TABLE bookings ADD FOREIGN KEY (LISTING_ID) REFERENCES listings (ID);
CREATE INDEX listing_id ON bookings (LISTING_ID);

GRANT ALL PRIVILEGES ON listings TO root;
GRANT ALL PRIVILEGES ON bookings TO root;

-- createdb db
-- psql db < ./server/database/postgresql.sql
