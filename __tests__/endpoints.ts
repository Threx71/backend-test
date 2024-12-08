import app from '../src/server.js';
import request from 'supertest';

describe('Bateria de tests del servidor', () => {
    describe("Servidor en endpoint /", () => {
        test("username", async () => {
            return await request(app)
                .get('/')
                .expect(200)
                .expect("Content-Type", /text/)
                .then(response => {
                    expect(response.text).toBe(`Hola mundo al usuario ${process.env.USERNAME || 'default'}`);
                });
        });

        test("api-key", async () => {
            return await request(app)
                .get('/api-key')
                .expect(200)
                .expect("Content-Type", /text/)
                .then(response => {
                    expect(response.text).toBe(`la apikey de mi aplicacion es: ${process.env.APIKEY || 'default-key'}`);
                });
        });
    });

    describe("Servidor en endpoint /validar-rut", () => {
        test("RUT válido", async () => {
            return await request(app)
                .get('/validar-rut?rut=18.859.296-1')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('El rut suministrado (18.859.296-1) es : valido');
                });
        });

        test("RUT válido", async () => {
            return await request(app)
                .get('/validar-rut?rut=18859296-1')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('El rut suministrado (18859296-1) es : valido');
                });
        });

        test("RUT válido", async () => {
            return await request(app)
                .get('/validar-rut?rut=188592961')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('El rut suministrado (188592961) es : valido');
                });
        });

        test("RUT válido", async () => {
            return await request(app)
                .get('/validar-rut?rut=000000000')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('El rut suministrado (000000000) es : valido');
                });
        });

        test("RUT inválido", async () => {
            return await request(app)
                .get('/validar-rut?rut=11.111.112-1')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('El rut suministrado (11.111.112-1) es : invalido');
                });
        });

        test("Casos extraños", async () => {
            return await request(app)
                .get('/validar-rut?rut=')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('El rut suministrado () es : invalido');
                });
        });


        test("Casos extraños", async () => {
            return await request(app)
                .get('/validar-rut?rut=estoClaramenteNoEsUnRut')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('El rut suministrado (estoClaramenteNoEsUnRut) es : invalido');
                });
        });

    });

    describe("Servidor en endpoint /buscar-subcadena", () => {
        test("Subcadena encontrada", async () => {
            return await request(app)
                .get('/buscar-subcadena?cadena=abcabc&subcadena=abc')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('La cadeja "abcabc" tiene 2 repeticiones de la subcadena "abc"');
                });
        });

        test("Subcadena no encontrada", async () => {
            return await request(app)
                .get('/buscar-subcadena?cadena=abcdef&subcadena=xyz')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('La cadeja "abcdef" tiene 0 repeticiones de la subcadena "xyz"');
                });
        });

        test("Casos extraños", async () => {
            return await request(app)
                .get('/buscar-subcadena?cadena=&subcadena=abc')
                .expect(200)
                .then(response => {
                    expect(response.text).toBe('La cadeja "" tiene 0 repeticiones de la subcadena "abc"');
                });
        });
    });
});
