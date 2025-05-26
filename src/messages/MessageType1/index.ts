import {Mmsi} from "../../types/mmsi";
import {AisArmor} from "../../utils";
import {IAisMessage} from "../aisMessage.interface";

export class AisMessageType1 implements IAisMessage{
    public repeatIndicator: number = 0;
    private _mmsi: Mmsi = new Mmsi();

    public get mmsi(): string {
        return this._mmsi.mmsi;
    }

    public set mmsi(value: string) {
        this._mmsi.mmsi = value.toString().padStart(9, '0');
    }

    public navigationStatus: number = 0;
    private _rateOfTurn: number = 0;

    public set rateOfTurn(value: number) {
        this._rateOfTurn = value;
    }

    public get rateOfTurn(): number {
        return this._rateOfTurn;
    }

    public speedOverGround: number = 0;
    public positionAccuracy: number = 0;
    public longitude: number = 0;
    public latitude: number = 0;
    public courseOverGround: number = 0;
    public trueHeading: number = 0;
    public timestamp: number = 0;
    public maneuverIndicator: number = 0;
    public spare: number = 0;
    public radioStatus: number = 0;

    public constructor(armoredString?: string) {
        if (!armoredString) {
            return;
        }
        const bits = AisArmor.unarmorPayload(armoredString);
        this.fromBinary(bits);
    }

    private fromBinary(binary: string): void {
        const regex = /^[01]+$/;
        const isValid = regex.test(binary) && binary.length == 168;
        if (!isValid) throw new Error("Invalid binary string");
        if (!binary.startsWith( "000001")) throw new Error("Invalid message type");

        this.repeatIndicator = parseInt(binary.substring(6, 8), 2);
        this._mmsi.mmsi = parseInt(binary.substring(8, 38), 2);
        this.navigationStatus = parseInt(binary.substring(38, 42), 2);
        this.rateOfTurn = this.decodeRateOfTurn(binary.substring(42, 50));
        this.speedOverGround = parseInt(binary.substring(50, 60), 2)/10;
        this.positionAccuracy = parseInt(binary.substring(60, 61), 2);
        this.longitude = this.parseSignedInt(binary.substring(61, 89)) / 600000;
        this.latitude = this.parseSignedInt(binary.substring(89, 116)) / 600000;
        this.courseOverGround = parseInt(binary.substring(116, 128), 2)/10;
        this.trueHeading = parseInt(binary.substring(128, 137), 2);
        this.timestamp = parseInt(binary.substring(137, 143), 2);
        this.maneuverIndicator = parseInt(binary.substring(143, 145), 2);
        this.spare = parseInt(binary.substring(145, 148), 2);
        this.radioStatus = parseInt(binary.substring(148, 168), 2);
    }

    private decodeRateOfTurn(rotBits: string): number  {
        let rotValue = parseInt(rotBits, 2);

        // Interpreta como signed int de 8 bits (Two's Complement)
        if (rotBits[0] === '1') {
            rotValue = rotValue - 256;
        }

        // Converte valor AIS em taxa real (graus por minuto)
        return Math.pow(rotValue / 4.733, 2) * Math.sign(rotValue);
    }

    private parseSignedInt(binStr: string): number {
        const isNegative = binStr[0] === '1';
        if (!isNegative) return parseInt(binStr, 2);
        // Convert to signed 2's complement
        const inverted = binStr
            .split('')
            .map(b => (b === '0' ? '1' : '0'))
            .join('');
        const magnitude = parseInt(inverted, 2) + 1;
        return -magnitude;
    }

    private toBinary(): string {
        const binary = [
            "000001", // message type
            this.repeatIndicator.toString(2).padStart(2, '0'),
            this._mmsi.toBinary,
            this.navigationStatus.toString(2).padStart(4, '0'),
            this.encodeROT(this.rateOfTurn),
            parseInt((this.speedOverGround * 10).toFixed(0)).toString(2).padStart(10, '0'),
            this.positionAccuracy.toString(2),
            this.encodeSignedInt(Math.round(this.longitude * 600000), 28),
            this.encodeSignedInt(Math.round(this.latitude * 600000), 27),
            parseInt((this.courseOverGround * 10).toFixed(0)).toString(2).padStart(12, '0'),
            this.trueHeading.toString(2).padStart(9, '0'),
            this.timestamp.toString(2).padStart(6, '0'),
            this.maneuverIndicator.toString(2).padStart(2, '0'),
            this.spare.toString(2).padStart(3, '0'),
            this.radioStatus.toString(2).padStart(20, '0')
        ];
        return binary.join('');
    }

    private encodeROT(rateOfTurn: number): string {
        const scaled = Math.round(Math.sign(rateOfTurn) * Math.sqrt(Math.abs(rateOfTurn)) * 4.733);

        // Faz o complemento de dois corretamente para 8 bits
        const value = scaled < 0 ? (256 + scaled) : scaled;

        return value.toString(2).padStart(8, '0');
    }

    private encodeSignedInt(value: number, length: number): string {
        const isNegative = value < 0;
        if (isNegative) {
            value = Math.abs(value);
            value = (1 << length) - value; // Two's complement
        }
        return value.toString(2).padStart(length, '0');
    }

    public toArmoredString(): string {
        const binary = this.toBinary();
        return AisArmor.armorPayload(binary);
    }

    public getPaddedLength(): number {
        const binary = this.toBinary();
        return AisArmor.getPaddedLength(binary);
    }
}

"000001000011110011111101001100000111110000111111110001001000011100111010100001010100100011110010111000010010100000110110111010000101100100110100000000010100000010110010"