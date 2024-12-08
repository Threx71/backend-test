import app from '../src/server.js';
import request from 'supertest';

const username = process.env.USERNAME || 'default';

{
    describe('Test / endpoint', () => {
        it("username", async () => {

            return await request(app)
                .get('/')
                .expect(200)
                .expect("Content-Type", /text/)
                .then(response => {
                    expect(response.text).toBe(`Hola mundo al usuario ${username}`);
                });
        });

    });
}
