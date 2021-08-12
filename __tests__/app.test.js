require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('player routes', () => {
    // let token;
  
    beforeAll(async () => {
      execSync('npm run setup-db');
  
      await client.connect();
      // const signInData = await fakeRequest(app)
      //   .post('/auth/signup')
      //   .send({
      //     league: 'WNBA',
      //     email: 'WNBA@WNBA.com',
      //     password: '1234'
      //   });
      
      // token = signInData.body.token; // eslint-disable-line
    }, 10000);
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns all players', async() => {
      const expectation = [
        { 
          id: 1, 
          name: 'Sue Bird', 
          team: 'Seattle Storm',
          is_active: true,
          number: 10,
          league_id: 1
        },
        { 
          id: 2, 
          name: 'Diana Taurasi', 
          team: 'Phoenix Mercury',
          is_active: true,
          number: 3,
          league_id: 1
        },
        { 
          id: 3, 
          name: 'Jewell Loyd', 
          team: 'Seattle Storm',
          is_active: true,
          number: 24,
          league_id: 1
        },
        { 
          id: 4, 
          name: 'Breanna Stewart', 
          team: 'Seattle Storm',
          is_active: true,
          number: 30,
          league_id: 1
        },
        { 
          id: 5, 
          name: 'Candace Parker', 
          team: 'Chicago Sky',
          is_active: true,
          number: 3,
          league_id: 1
        },
      ];
      
      const data = await fakeRequest(app)
        .get('/players')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(data.body).toEqual(expectation);
    });

    test('returns sue bird for player/1', async() => {
      const expectation = { 
        id: 1, 
        name: 'Sue Bird', 
        team: 'Seattle Storm',
        is_active: true,
        number: 10,
        league_id: 1
      };
      const data = await fakeRequest(app)
        .get('/players/1')
        .expect('Content-Type', /json/);
        // .expect(200);
      expect(data.body).toEqual(expectation);
    });
  });

  
});
