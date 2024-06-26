
import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTypesParser } from '../parsers/vehicle-types.parser';

describe('VehicleTypesParser', () => {
  let parser: VehicleTypesParser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleTypesParser],
    }).compile();

    parser = module.get<VehicleTypesParser>(VehicleTypesParser);
  });

  it('should parse vehicle types XML', async () => {
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
    const result = await parser.parse(mockXmlResponse);
    expect(result).toEqual([{ typeId: '1', typeName: 'Type A' }]);
  });
});
