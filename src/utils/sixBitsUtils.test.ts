import { describe, expect, it } from 'vitest'
import { SixBitsUtils } from './sixBitUtils'

const charToSixbitMap: Map<string, string> = new Map([
    ['@', "000000"], ['A', "000001"], ['B', "000010"], ['C', "000011"], ['D', "000100"], ['E', "000101"], ['F', "000110"], ['G', "000111"], ['H', "001000"], ['I', "001001"], ['J', "001010"],
    ['K', "001011"], ['L', "001100"], ['M', "001101"], ['N', "001110"], ['O', "001111"], ['P', "010000"], ['Q', "010001"], ['R', "010010"], ['S', "010011"], ['T', "010100"],
    ['U', "010101"], ['V', "010110"], ['W', "010111"], ['X', "011000"], ['Y', "011001"], ['Z', "011010"], ['[', "011011"], ['\\', "011100"], [']', "011101"], ['^', "011110"],
    ['_', "011111"], [' ', "100000"], ['!', "100001"], ['"', "100010"], ['#', "100011"], ['$', "100100"], ['%', "100101"], ['&', "100110"], ['\'', "100111"], ['(', "101000"],
    [')', "101001"], ['*', "101010"], ['+', "101011"], [',', "101100"], ['-', "101101"], ['.', "101110"], ['/', "101111"], ['0', "110000"], ['1', "110001"], ['2', "110010"],
    ['3', "110011"], ['4', "110100"], ['5', "110101"], ['6', "110110"], ['7', "110111"], ['8', "111000"], ['9', "111001"], [':', "111010"], [';', "111011"], ['<', "111100"],
    ['=', "111101"], ['>', "111110"], ['?', "111111"]
]);

describe('charToSixbit', () => {
    it('should convert valid characters to their sixbit representation', () => {
        for (const char of charToSixbitMap.keys()) {
            const expected = charToSixbitMap.get(char);
            expect(SixBitsUtils.charToSixbit(char)).toBe(expected);
        }
    });

    it('should throw an error for invalid characters', () => {
        expect(() => SixBitsUtils.charToSixbit('')).toThrowError('Only one character is allowed.');
        expect(() => SixBitsUtils.charToSixbit('AB')).toThrowError('Only one character is allowed.');
        expect(() => SixBitsUtils.charToSixbit('q')).toThrowError("Invalid character for AIS sixbit: 'q'");
    });

    it('should throw an error for non-string input', () => {
        expect(() => SixBitsUtils.charToSixbit(1 as unknown as string)).toThrowError('Only one character is allowed.');
        expect(() => SixBitsUtils.charToSixbit({} as unknown as string)).toThrowError('Only one character is allowed.');
    });

    it('should throw an error for non-ASCII characters', () => {
        expect(() => SixBitsUtils.charToSixbit('ñ')).toThrowError("Invalid character for AIS sixbit: 'ñ'");
        expect(() => SixBitsUtils.charToSixbit('©')).toThrowError("Invalid character for AIS sixbit: '©'");
    })

    it('should convert valid sixbit values to their character representation', () => {
        for (const [char, value] of charToSixbitMap.entries()) {
            expect(SixBitsUtils.sixbitToChar(value)).toBe(char);
        }
    });

    it('should throw an error for invalid sixbit values', () => {
        expect(() => SixBitsUtils.sixbitToChar("000000s")).toThrowError("Invalid six-bit string. It must be exactly 6 characters of 0 or 1.");
        expect(() => SixBitsUtils.sixbitToChar("11111fd1")).toThrowError("Invalid six-bit string. It must be exactly 6 characters of 0 or 1.");
    });

    it('should converto valid sixbit strings to their string representation', () => {
        const testCases = [
            { input: "000000000001", expected: "@A" },
            { input: "000001000010", expected: "AB" },
            { input: "010110010111", expected: "VW" },
            { input: "111111111111", expected: "??" },
            { input: "101010101010", expected: "**" }
        ];

        for (const { input, expected } of testCases) {
            expect(SixBitsUtils.sixbitToString(input)).toBe(expected);
        }
    })

    it('should throw an error for invalid sixbit string length', () => {
        expect(() => SixBitsUtils.sixbitToString("00000")).toThrowError("Invalid sixbit string length. It must be a multiple of 6.");
        expect(() => SixBitsUtils.sixbitToString("0000010000101")).toThrowError("Invalid sixbit string length. It must be a multiple of 6.");
    });

    it('should convert valid strings to their sixbit representation', () => {
        const testCases = [
            { input: "@A", expected: "000000000001" },
            { input: "AB", expected: "000001000010" },
            { input: "VW", expected: "010110010111" },
            { input: "??", expected: "111111111111" },
            { input: "**", expected: "101010101010" }
        ];

        for (const { input, expected } of testCases) {
            expect(SixBitsUtils.stringToSixbit(input)).toBe(expected);
        }
    });
});

