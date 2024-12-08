import { contarCoincidenciasEnCadena } from '../src/app/cadenas';

describe('contarCoincidenciasEnCadena', () => {
    it('coincidencia', () => {
        expect(contarCoincidenciasEnCadena('abcabc', 'abc')).toBe(2);
        expect(contarCoincidenciasEnCadena('aaaa', 'aa')).toBe(3);
        expect(contarCoincidenciasEnCadena('abcdef', 'def')).toBe(1);
        expect(contarCoincidenciasEnCadena('abcABC', 'abc')).toBe(1);

    });

    it('Sin coincidencias', () => {
        expect(contarCoincidenciasEnCadena('abcdef', 'fadsadsas')).toBe(0);
        expect(contarCoincidenciasEnCadena('abc', 'abcd')).toBe(0);
    });

    it('Casos borde', () => {
        expect(contarCoincidenciasEnCadena('', 'abc')).toBe(0);
        expect(contarCoincidenciasEnCadena('abc', '')).toBe(0);
        expect(contarCoincidenciasEnCadena('', '')).toBe(0);
    });
});

