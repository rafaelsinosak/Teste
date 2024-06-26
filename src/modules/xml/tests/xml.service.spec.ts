import { Test, TestingModule } from "@nestjs/testing";
import { XmlService } from "../xml.service";
import { HttpModule } from "@nestjs/axios";
import { of } from "rxjs";

describe("XmlService", () => {
  let service: XmlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [XmlService],
    }).compile();

    service = module.get<XmlService>(XmlService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should fetch and parse makes XML", async () => {
    const mockXmlResponse = `
      <Response>
        <Results>
          <AllVehicleMakes>
            <Make_ID>123</Make_ID>
            <Make_Name>Test Make</Make_Name>
          </AllVehicleMakes>
        </Results>
      </Response>
    `;
    jest.spyOn(service, "fetchAndParseXml").mockImplementation(() =>
      Promise.resolve({
        Response: {
          Results: [
            {
              AllVehicleMakes: [{ Make_ID: ["123"], Make_Name: ["Test Make"] }],
            },
          ],
        },
      })
    );

    const makes = await service.getAllMakes();
    expect(makes).toEqual([{ makeId: "123", makeName: "Test Make" }]);
  });

  it("should fetch and parse vehicle types XML", async () => {
    const mockXmlResponse = `
      <Response>
        <Results>
          <VehicleTypesForMakeIds>
            <VehicleTypeId>1</VehicleTypeId>
            <VehicleTypeName>Type A</VehicleTypeName>
          </VehicleTypesForMakeIds>
        </Results>
      </Response>
    `;
    jest.spyOn(service, "fetchAndParseXml").mockImplementation(() =>
      Promise.resolve({
        Response: {
          Results: [
            {
              VehicleTypesForMakeIds: [
                { VehicleTypeId: ["1"], VehicleTypeName: ["Type A"] },
              ],
            },
          ],
        },
      })
    );

    const vehicleTypes = await service.getVehicleTypesForMakeId(123);
    expect(vehicleTypes).toEqual([{ typeId: "1", typeName: "Type A" }]);
  });
});
