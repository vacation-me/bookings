const request = require('supertest');
const app = require('../server/app');

describe('Test the root path', () => {
  test('should respond with 200 to a valid path', (done) => {
    request(app).get('/api/listing_info').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([ 'year', '_id', 'id', 'price', 'serviceFee', 'minStay', 'maxGuests', '__v']),
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
