DROP KEYSPACE IF EXISTS bookings;
CREATE KEYSPACE bookings WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 2 };
USE bookings;

-- CREATE TYPE bookings (
--   bookingid INT,
--   startdate TEXT,
--   daysbooked INT
-- );

CREATE TABLE bookings (
  listingid INT,
  price INT,
  cleaningfee INT,
  servicefeepercent DOUBLE,
  minstay INT,
  maxguests INT,
  id UUID,
  startdate TEXT,
  daysbooked INT,
  PRIMARY KEY (listingid, id)
  -- bookinglist LIST<FROZEN<LIST<TEXT>>>
);

-- COPY listings (listingid, price, cleaningfee, servicefeepercent, minstay, maxguests, bookinglist) FROM './server/database/cassandraDB.csv' WITH DELIMITER='|';
COPY bookings (listingid, price, cleaningfee, servicefeepercent, minstay, maxguests, id, startdate, daysbooked) FROM './server/database/cassandraDB.csv' WITH DELIMITER='|';

-- time cqlsh -u 'cassandra' -p 'cassandra' -f ./server/database/cassandradb.cql
-- rm ./server/database/cassandraDB.csv; time for i in {0..999}; do node --max-old-space-size=8192 ./server/database/generateCassandraDB.js ${i} | cat >> ./server/database/cassandraDB.csv; done; time cqlsh -u 'cassandra' -p 'cassandra' -f ./server/database/cassandradb.cql
