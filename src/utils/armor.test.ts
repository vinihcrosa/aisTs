import {describe, expect, it} from 'vitest'
import { AisArmor } from './armor';

describe("Armor", () => {
    it("should armor", () => {
        const bits = "011000011001011010";
        const expected = "HIJ";
        const result = AisArmor.armorPayload(bits);
        expect(result).toBe(expected);
    })
})