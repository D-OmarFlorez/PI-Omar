const request = require('supertest');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  beforeAll(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', async () => {
      const response = await request(app).get('/videogames');
      expect(response.statusCode).toBe(200);
    });
  });
});
