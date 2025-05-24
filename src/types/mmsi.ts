export class Mmsi {
    private _mmsi: string = ''.padStart(9, '0');

    public set mmsi(value: number | string) {
        const mmsiString = value.toString();

        if (mmsiString.length > 9) {
            throw new Error("MMSI must be a 9-digit number.");
        }

        this._mmsi = mmsiString.padStart(9, '0');
    }

    public get mmsi(): string {
        return this._mmsi;
    }

    public get mmsiInt(): number {
        return parseInt(this._mmsi, 10);
    }

    public get toBinary(): string {
        return this.mmsiInt.toString(2).padStart(30, '0');
    }
}