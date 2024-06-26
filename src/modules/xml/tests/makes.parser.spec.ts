
import { Test, TestingModule } from '@nestjs/testing';
import { MakesParser } from '../parsers/makes.parser';

describe('MakesParser', () => {
  let parser: MakesParser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakesParser],
    }).compile();

    parser = module.get<MakesParser>(MakesParser);
  });

  it('should parse makes XML', async () => {
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
    const result = await parser.parse(mockXmlResponse);
    expect(result).toEqual([{ makeId: '123', makeName: 'Test Make' }]);
  });
});
