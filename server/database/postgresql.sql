DROP DATABASE IF EXISTS bookings;
CREATE DATABASE bookings;
\c bookings;

CREATE TABLE listings(
  ID INT UNIQUE,
  PRICE INT,
  CLEANING_FEE INT,
  SERVICE_FEE_PERECENT DOUBLE PRECISION,
  MIN_STAY INT,
  MAX_GUESTS INT
);
\COPY listings FROM 'server/database/listings.csv' WITH (FORMAT csv);
ALTER TABLE listings ADD PRIMARY KEY (id);

CREATE TABLE bookings(
  ID INT UNIQUE,
  LISTING_ID INT,
  STARTING_DATE VARCHAR(30),
  DAYS_BOOKED INT
);
\COPY bookings FROM 'server/database/bookings.csv' WITH (FORMAT csv);
ALTER TABLE bookings ADD PRIMARY KEY (ID);
ALTER TABLE bookings ADD FOREIGN KEY (LISTING_ID) REFERENCES listings (ID);

-- createdb db
-- psql db < ./server/database/postgresql.sql
