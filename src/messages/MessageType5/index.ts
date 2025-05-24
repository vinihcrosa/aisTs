import { SixBitsUtils } from '../../utils';
import {AisArmor} from "../../utils";
import { Mmsi } from "../../types/mmsi";

export class AisMessageType5{
    public repeatIndicator: number = 0;
    private _mmsi: Mmsi = new Mmsi();
    public get mmsi(): string {
        return this._mmsi.mmsi;
    }
    public aisVersion: number = 0;
    public imoNumber: number = 0;
    private _callSign: string = "".padEnd(7, ' ');

    public get callSign(): string {
        return this._callSign.trim();
    }

    public get callSignRaw(): string {
        if (this.callSign === '') {
            return "@".padEnd(7, ' ');
        }
        return this.callSign.padEnd(7, ' ');
    }

    public set callSign(value: string) {
        if (value.length > 7) {
            throw new Error("Call sign cannot exceed 7 characters.");
        }
        this._callSign = value.replace(/@+$/, '').padEnd(7, ' ');
    }

    private _shipName: string = "".padEnd(20, ' ');

    public set shipName(value: string) {
        if (value.length > 20) {
            throw new Error("Ship name cannot exceed 20 characters.");
        }
        this._shipName = value.replace(/@+$/, '').padEnd(20, ' ');
    }

    public get shipName(): string {
        return this._shipName.trim();
    }

    public get shipNameRaw(): string {
        if (this.shipName === '') {
            return "@".padEnd(20, ' ');
        }
        return this.shipName.padEnd(20, ' ');
    }

    public shipType: number = 0;
    public toBow: number = 0;
    public toStern: number = 0;
    public toPort: number = 0;
    public toStarboard: number = 0;
    public epfd: number = 0;
    public etaMonth: number = 0;
    public etaDay: number = 0;
    public etaHour: number = 0;
    public etaMinute: number = 0;
    public draught: number = 0;
    private _destination: string = "".padEnd(20, ' ');

    public set destination(value: string) {
        if (value.length > 20) {
            throw new Error("Destination cannot exceed 20 characters.");
        }
        this._destination = value.replace(/^@+|@+$/g, '').padEnd(20, ' ');
    }

    public get destination(): string {
        return this._destination.trim();
    }

    public get destinationRaw(): string {
        if (this.destination === '') {
            return "@".padEnd(20, ' ');
        }
        return this.destination.padEnd(20, ' ');
    }

    public dte: number = 0;
    public spare: number = 0;



    static fromBinary(binary: string): AisMessageType5 {
        const regex = /^[01]+$/;
        const isValid = regex.test(binary) && binary.length >= 424;
        if (!isValid) throw new Error("Invalid binary string");

        if (!binary.startsWith("000101")) throw new Error("Invalid message type");

        const aisMessage = new AisMessageType5();

        aisMessage.repeatIndicator = parseInt(binary.substring(6, 8), 2);
        aisMessage._mmsi.mmsi = parseInt(binary.substring(8, 38), 2);
        aisMessage.aisVersion = parseInt(binary.substring(38, 40), 2);
        aisMessage.imoNumber = parseInt(binary.substring(40, 70), 2);
        aisMessage.callSign = SixBitsUtils.sixbitToString(binary.substring(70, 112));
        aisMessage.shipName = SixBitsUtils.sixbitToString(binary.substring(112, 232));
        aisMessage.shipType = parseInt(binary.substring(232, 240), 2);
        aisMessage.toBow = parseInt(binary.substring(240, 249), 2);
        aisMessage.toStern = parseInt(binary.substring(249, 258), 2);
        aisMessage.toPort = parseInt(binary.substring(258, 264), 2);
        aisMessage.toStarboard = parseInt(binary.substring(264, 270), 2);
        aisMessage.epfd = parseInt(binary.substring(270, 274), 2);
        aisMessage.etaMonth = parseInt(binary.substring(274, 278), 2);
        aisMessage.etaDay = parseInt(binary.substring(278, 283), 2);
        aisMessage.etaHour = parseInt(binary.substring(283, 288), 2);
        aisMessage.etaMinute = parseInt(binary.substring(288, 294), 2);
        aisMessage.draught = parseInt(binary.substring(294, 302), 2) / 10;
        aisMessage.destination = SixBitsUtils.sixbitToString(binary.substring(302, 422));
        aisMessage.dte = parseInt(binary.substring(422, 423), 2);
        aisMessage.spare = parseInt(binary.substring(423, 424), 2);

        return aisMessage;
    }

    static fromArmoredString(str: string): AisMessageType5 {
        const bits = AisArmor.unarmorPayload(str);
        return AisMessageType5.fromBinary(bits);
    }

    public toBinary(): string {
        const binary = [
            "000101",
            this.repeatIndicator.toString(2).padStart(2, '0'),
            this._mmsi.toBinary,
            this.aisVersion.toString(2).padStart(2, '0'),
            this.imoNumber.toString(2).padStart(30, '0'),
            SixBitsUtils.stringToSixbit(this.callSignRaw, 42),
            SixBitsUtils.stringToSixbit(this.shipNameRaw, 120),
            this.shipType.toString(2).padStart(8, '0'),
            this.toBow.toString(2).padStart(9, '0'),
            this.toStern.toString(2).padStart(9, '0'),
            this.toPort.toString(2).padStart(6, '0'),
            this.toStarboard.toString(2).padStart(6, '0'),
            this.epfd.toString(2).padStart(4, '0'),
            this.etaMonth.toString(2).padStart(4, '0'),
            this.etaDay.toString(2).padStart(5, '0'),
            this.etaHour.toString(2).padStart(5, '0'),
            this.etaMinute.toString(2).padStart(6, '0'),
            (this.draught * 10).toString(2).padStart(8, '0'),
            SixBitsUtils.stringToSixbit(this.destinationRaw, 120),
            this.dte.toString(2),
            this.spare.toString(2)
        ];

        return binary.join('');
    }

    public toArmoredString(): string {
        const binary = this.toBinary();
        return AisArmor.armorPayload(binary);
    }
}