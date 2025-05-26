import { describe, expect, it } from 'vitest';
import { AisMessageType1 } from "./index";
import { aisMessageCreator } from "../messageCreator";

describe(`AisMessageType1`, () => {
  it("should create a valid ais message type 1 from binary string", () => {
    const armoredString = "13ku<7hw18LrQDSjpBPnr5Tl0D2j";

    const aisMessage = aisMessageCreator(AisMessageType1, armoredString);

    expect(aisMessage).toBeInstanceOf(AisMessageType1);
    expect(aisMessage.repeatIndicator).toBe(0);
    expect(aisMessage.mmsi).toBe("255806495");
    expect(aisMessage.navigationStatus).toBe(0);
    expect(aisMessage.rateOfTurn).toBeCloseTo(-0.71424, 4);
    expect(aisMessage.speedOverGround).toBe(7.2);
    expect(aisMessage.positionAccuracy).toBe(0);
    expect(aisMessage.longitude).toBeCloseTo(-43.140025, 6);
    expect(aisMessage.latitude).toBeCloseTo(-22.9297, 4);
    expect(aisMessage.courseOverGround).toBe(176.8);
    expect(aisMessage.trueHeading).toBe(178);
    expect(aisMessage.timestamp).toBe(26);
    expect(aisMessage.maneuverIndicator).toBe(0);
    expect(aisMessage.spare).toBe(0);
    expect(aisMessage.radioStatus).toBe(82098);
  })

  it('should create a valid armores string', () => {
    const armoredString = "13ku<7hw18LrQDSjpBPnr5Tl0D2j";

    const aisMessageType1 = new AisMessageType1();

      aisMessageType1.repeatIndicator = 0;
      aisMessageType1.mmsi = "255806495";
      aisMessageType1.navigationStatus = 0;
      aisMessageType1.rateOfTurn = -0.7142446133345274;
      aisMessageType1.speedOverGround = 7.2;
      aisMessageType1.positionAccuracy = 0;
      aisMessageType1.longitude = -43.140025;
      aisMessageType1.latitude = -22.9297016;
      aisMessageType1.courseOverGround = 176.8;
      aisMessageType1.trueHeading = 178;
      aisMessageType1.timestamp = 26;
      aisMessageType1.maneuverIndicator = 0;
      aisMessageType1.spare = 0;
      aisMessageType1.radioStatus = 82098;

    const armoredStringResult = aisMessageType1.toArmoredString();

    expect(armoredStringResult).toBe(armoredString);
  })
})
