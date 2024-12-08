import { validarRUT } from '../src/app/rut';

describe('validarRUT', () => {
    it('RUT válido', () => {
        expect(validarRUT('18.859.296-1')).toBe(true);
        expect(validarRUT('18859296-1')).toBe(true);
        expect(validarRUT('188592961')).toBe(true);
        expect(validarRUT('13754959k')).toBe(true);
        expect(validarRUT('000000000')).toBe(true);
    });

    it('RUT inválido', () => {
        expect(validarRUT('11.111.112-1')).toBe(false);
        expect(validarRUT('11111112-1')).toBe(false);
        expect(validarRUT('11.111.111')).toBe(false);
    });

    it('Cosas extrañas', () => {
        expect(validarRUT('')).toBe(false);
        expect(validarRUT('estoClaramenteNoEsUnRut')).toBe(false);
        expect(validarRUT('111111-9')).toBe(false);
    });
});
