# aisTs

[![npm version](https://img.shields.io/npm/v/aists.svg)](https://www.npmjs.com/package/aists)
[![license](https://img.shields.io/npm/l/aists.svg)](#license)

TypeScript library to **encode and decode AIS (Automatic Identification System) messages** and convert them to and from NMEA 0183 `!AIVDM` sentences.

AIS is the VHF broadcast system ships use to report identity, position and voyage data. Each report is a bit-packed binary payload wrapped in an NMEA sentence. `aisTs` handles both directions: parse an armored payload into a typed object, or build an object and emit the sentences.

Currently supported message types:

| Type | Name | Class |
| --- | --- | --- |
| 1 | Position Report Class A | `AisMessageType1` |
| 5 | Static and Voyage Related Data | `AisMessageType5` |

## Install

```sh
npm install aists
```

Ships CommonJS, ESM and type declarations. No runtime dependencies.

## Usage

### Decode an AIS payload

```ts
import { aisMessageCreator, AisMessageType1 } from "aists";

const message = aisMessageCreator(AisMessageType1, "13ku<7hw18LrQDSjpBPnr5Tl0D2j");

message.mmsi;             // "255806495"
message.latitude;         // -22.929701666666666
message.longitude;        // -43.140025
message.speedOverGround;  // 7.2  (knots)
message.courseOverGround; // 176.8 (degrees)
message.trueHeading;      // 178
```

`new AisMessageType1(armoredString)` is equivalent — `aisMessageCreator` only adds argument validation.

### Encode a message and emit NMEA sentences

```ts
import { AisMessage, AisMessageType1 } from "aists";

const position = new AisMessageType1();
position.mmsi = "255806495";
position.latitude = -22.9297016;
position.longitude = -43.140025;
position.speedOverGround = 7.2;
position.courseOverGround = 176.8;
position.trueHeading = 178;
position.timestamp = 26;

position.toArmoredString();
// "13ku<7h018LrQDSjpBPnr5Tl0000"

new AisMessage("!AIVDM", "1", "A", position).toNmea();
// [ "!AIVDM,1,1,,A,13ku<7h018LrQDSjpBPnr5Tl0000,0" ]
```

### Multipart sentences

Payloads longer than 62 armored characters (type 5, for example) are split automatically across fragments, with the sequential message ID filled in only when there is more than one fragment:

```ts
import { AisMessage, AisMessageType5 } from "aists";

const voyage = new AisMessageType5();
voyage.mmsi = "255806495";
voyage.callSign = "CQMV";
voyage.shipName = "MONTE DA GUIA";
voyage.destination = "RIO DE JANEIRO";
voyage.draught = 6.4;

new AisMessage("!AIVDM", "1", "A", voyage).toNmea();
// [
//   "!AIVDM,2,1,1,A,53ku<7h00000=4mH000ltq@F0@60MDT400000000000000000@4RCp11H2PCQB,0",
//   "!AIVDM,2,2,1,A,DSh000000,2"
// ]
```

## API

### `AisMessage`

`new AisMessage(header, id, channel, aisMessage)` — wraps any `IAisMessage` in an NMEA envelope.

- `header` — sentence header, usually `"!AIVDM"`
- `id` — sequential message ID, only emitted for multipart messages
- `channel` — AIS radio channel, `"A"` or `"B"`
- `toNmea(): string[]` — armored payload split into fragments of at most 62 characters

### `AisMessageType1` — Position Report Class A

`repeatIndicator`, `mmsi`, `navigationStatus`, `rateOfTurn` (deg/min), `speedOverGround` (knots), `positionAccuracy`, `longitude`, `latitude` (decimal degrees), `courseOverGround` (degrees), `trueHeading`, `timestamp`, `maneuverIndicator`, `spare`, `radioStatus`.

### `AisMessageType5` — Static and Voyage Related Data

`repeatIndicator`, `mmsi`, `aisVersion`, `imoNumber`, `callSign` (max 7 chars), `shipName` (max 20), `shipType`, `toBow`, `toStern`, `toPort`, `toStarboard`, `epfd`, `etaMonth`, `etaDay`, `etaHour`, `etaMinute`, `draught` (metres), `destination` (max 20), `dte`, `spare`.

String fields are trimmed on read and `@`-padded on encode; `callSignRaw`, `shipNameRaw` and `destinationRaw` expose the padded form. Exceeding the maximum length throws.

Both message classes implement `IAisMessage`:

- `toArmoredString(): string` — 6-bit ASCII-armored payload
- `getPaddedLength(): number` — fill bits appended to reach a 6-bit boundary

### Utilities

- `AisArmor.armorPayload(bits)` / `AisArmor.unarmorPayload(payload)` — binary string ⇄ AIS 6-bit ASCII armor
- `AisArmor.getPaddedLength(bits)` — fill bits needed for a 6-bit boundary
- `SixBitsUtils.stringToSixbit(str, bitsLength?)` / `SixBitsUtils.sixbitToString(bits)` — AIS 6-bit character encoding
- `Mmsi` — 9-digit MMSI with `mmsi`, `mmsiInt` and `toBinary` accessors
- `ShipType` — enum of AIS ship type codes

## Limitations

- Only message types 1 and 5 are implemented.
- `toNmea()` does not append the NMEA `*XX` checksum. Add it yourself if the consumer validates checksums.
- Decoding takes an armored payload, not a full NMEA sentence — extract the payload field first, and reassemble multipart messages before decoding.

## Development

```sh
npm install
npm run build        # bundle with tsup (cjs + esm + d.ts)
npm test             # run the vitest suite
npm run test:watch
npm run test:coverage
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint); releases are cut with `release-it`.

## License

MIT
