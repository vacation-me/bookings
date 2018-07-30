const request = require('supertest');
const app = require('../server/app');

const POST_BODY = {
  id: 27,
  checkIn: {
    date: 4,
    index: 2,
  },
  checkOut: {
    date: 7,
    index: 2,
  },
};

describe('Test the GET path', () => {
  test('should respond with 200 to a valid path', (done) => {
    request(app).get('/api/listing_info').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['availableDates', '_id', 'id', 'price', 'cleaningFee', 'serviceFee', 'minStay', 'maxGuests', '__v']),
      );
      done();
    });
  });
  test('should respond with 404 to invalid path', (done) => {
    request(app).get('/api/listing').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});

describe('Test the POST path', () => {
  test('should respond with 201 and updated data from a valid post request', (done) => {
    request(app)
      .post('/api/submit')
      .send(POST_BODY)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.availableDates[27]).toEqual(
          expect.not.arrayContaining([4, 7]),
        );
      });
    done();
  });

  test('should not respond to invalid data with valid data', (done) => {
    POST_BODY.id = 108;
    request(app)
      .post('/api/submit')
      .send(POST_BODY)
      .expect(415)
      .then((response) => {
        expect(response.body).toEqual({});
        done();
      })
      .catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    done();
  });
});
