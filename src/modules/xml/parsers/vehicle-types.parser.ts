
import { Injectable } from '@nestjs/common';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class VehicleTypesParser {
  async parse(xml: string): Promise<any> {
    const result = await parseStringPromise(xml);
    return result.Response.Results[0].VehicleTypesForMakeIds.map((vehicleType: any) => ({
      typeId: vehicleType.VehicleTypeId[0],
      typeName: vehicleType.VehicleTypeName[0],
    }));
  }
}
