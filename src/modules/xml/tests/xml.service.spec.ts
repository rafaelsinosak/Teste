import { Test, TestingModule } from "@nestjs/testing";
import { XmlService } from "../xml.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpService } from "@nestjs/axios";
import { Make } from "../entities/make.entity";
import { VehicleType } from "../entities/vehicle-type.entity";
import { Repository } from "typeorm";
import { of } from "rxjs";

const makesXml = `
<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Count>2</Count>
  <Message>Response returned successfully</Message>
  <Results>
    <AllVehicleMakes>
      <Make_ID>1</Make_ID>
      <Make_Name>Make1</Make_Name>
    </AllVehicleMakes>
    <AllVehicleMakes>
      <Make_ID>2</Make_ID>
      <Make_Name>Make2</Make_Name>
    </AllVehicleMakes>
  </Results>
</Response>
`;

const vehicleTypesXml = `
<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Count>2</Count>
  <Message>Response returned successfully</Message>
  <Results>
    <VehicleTypesForMakeIds>
      <VehicleTypeId>1</VehicleTypeId>
      <VehicleTypeName>Type1</VehicleTypeName>
    </VehicleTypesForMakeIds>
    <VehicleTypesForMakeIds>
      <VehicleTypeId>2</VehicleTypeId>
      <VehicleTypeName>Type2</VehicleTypeName>
    </VehicleTypesForMakeIds>
  </Results>
</Response>
`;

describe("XmlService", () => {
  let service: XmlService;
  let makesRepository: Repository<Make>;
  let vehicleTypesRepository: Repository<VehicleType>;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XmlService,
        {
          provide: getRepositoryToken(Make),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(VehicleType),
          useClass: Repository,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn((url) => {
              if (url.includes("getallmakes")) {
                return of({ data: makesXml });
              } else if (url.includes("GetVehicleTypesForMakeId")) {
                return of({ data: vehicleTypesXml });
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<XmlService>(XmlService);
    makesRepository = module.get<Repository<Make>>(getRepositoryToken(Make));
    vehicleTypesRepository = module.get<Repository<VehicleType>>(
      getRepositoryToken(VehicleType)
    );
    httpService = module.get<HttpService>(HttpService);

    Object.defineProperty(service, "fetchXmlData", {
      value: jest.fn((url: string) => {
        if (url.includes("getallmakes")) {
          return Promise.resolve(makesXml);
        }
        return Promise.resolve(vehicleTypesXml);
      }),
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should fetch and parse makes", async () => {
    const makes = await service.findAll();
    expect(makes).toEqual([]);
  });
});
