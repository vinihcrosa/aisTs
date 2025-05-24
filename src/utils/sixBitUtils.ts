export class SixBitsUtils {
    private static charToSixbitMap: Map<string, number> = new Map([
        ['@', 0], ['A', 1], ['B', 2], ['C', 3], ['D', 4], ['E', 5], ['F', 6], ['G', 7], ['H', 8], ['I', 9], ['J', 10],
        ['K', 11], ['L', 12], ['M', 13], ['N', 14], ['O', 15], ['P', 16], ['Q', 17], ['R', 18], ['S', 19], ['T', 20],
        ['U', 21], ['V', 22], ['W', 23], ['X', 24], ['Y', 25], ['Z', 26], ['[', 27], ['\\', 28], [']', 29], ['^', 30],
        ['_', 31], [' ', 32], ['!', 33], ['"', 34], ['#', 35], ['$', 36], ['%', 37], ['&', 38], ['\'', 39], ['(', 40],
        [')', 41], ['*', 42], ['+', 43], [',', 44], ['-', 45], ['.', 46], ['/', 47], ['0', 48], ['1', 49], ['2', 50],
        ['3', 51], ['4', 52], ['5', 53], ['6', 54], ['7', 55], ['8', 56], ['9', 57], [':', 58], [';', 59], ['<', 60],
        ['=', 61], ['>', 62], ['?', 63]
    ]);

    private static sixbitToCharMap: Map<number, string> = new Map(
        [...SixBitsUtils.charToSixbitMap.entries()].map(([char, value]) => [value, char])
    );

    static charToSixbit(char: string): string {
        if (char.length !== 1) {
            throw new Error("Only one character is allowed.");
        }
        const sixbit = SixBitsUtils.charToSixbitMap.get(char);
        if (sixbit === undefined) {
            throw new Error(`Invalid character for AIS sixbit: '${char}'`);
        }
        return sixbit.toString(2).padStart(6, '0');
    }

    private static sixBitToNumber(sixBitStr: string): number {
        if (!/^[01]{6}$/.test(sixBitStr)) {
            throw new Error("Invalid six-bit string. It must be exactly 6 characters of 0 or 1.");
        }
        return parseInt(sixBitStr, 2);
    }

    static sixbitToChar(value: string): string {
        const char = SixBitsUtils.sixbitToCharMap.get(SixBitsUtils.sixBitToNumber(value));
        if (!char) {
            throw new Error(`Invalid sixbit value: ${value}`);
        }
        return char;
    }

    static sixbitToString(sixbit: string): string {
        if (sixbit.length % 6 !== 0) {
            throw new Error("Invalid sixbit string length. It must be a multiple of 6.");
        }
        let result = '';
        for (let i = 0; i < sixbit.length; i += 6) {
            const sixBitSegment = sixbit.slice(i, i + 6);
            result += SixBitsUtils.sixbitToChar(sixBitSegment);
        }
        return result;
    }

    static stringToSixbit(str: string, bitsLength: number = 0): string {
        let result = '';
        for (const char of str) {
            result += SixBitsUtils.charToSixbit(char);
        }
        if (bitsLength === 0 || result.length == bitsLength) {
            return result;
        }
        const paddingLength = bitsLength - (result.length % bitsLength);
        if (paddingLength > 0) {
            result = result.padEnd(result.length + paddingLength, '0');
        }
        return result;
    }
}