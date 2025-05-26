export class AisArmor {
    static armorPayload(bits: string): string {
        const paddedBits = bits.padEnd(bits.length + AisArmor.getPaddedLength(bits), '0');

        const payloadChars: string[] = [];
        for (let i = 0; i < paddedBits.length; i += 6) {
            const segment = paddedBits.substring(i, i + 6);
            const value = parseInt(segment, 2);

            let asciiCode = value + 48;
            if (asciiCode > 87) asciiCode += 8; // pular os caracteres de controle (ASCII 88–95)

            payloadChars.push(String.fromCharCode(asciiCode));
        }

        return payloadChars.join('');
    }

    static getPaddedLength(bits: string): number {
        if (!/^[01]+$/.test(bits)) {
            throw new Error("A string de bits deve conter apenas 0 e 1.");
        }

        return (6 - (bits.length % 6)) % 6;
    }

    static unarmorPayload(payload: string): string {
        if (!/^[!-z]+$/.test(payload)) {
            throw new Error("Payload contém caracteres inválidos para AIS.");
        }

        let bits = '';
        for (const char of payload) {
            const code = char.charCodeAt(0);

            if (code < 48 || code > 119) {
                throw new Error(`Caractere '${char}' fora do intervalo permitido (48–119).`);
            }

            let value = code - 48;
            if (code > 87) value -= 8; // corrigir para valores armados

            if (value < 0 || value > 63) {
                throw new Error(`Valor de caractere AIS inválido após ajuste: ${value}`);
            }

            bits += value.toString(2).padStart(6, '0');
        }

        return bits;
    }
}