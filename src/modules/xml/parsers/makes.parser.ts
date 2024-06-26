
import { Injectable } from '@nestjs/common';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class MakesParser {
  async parse(xml: string): Promise<any> {
    const result = await parseStringPromise(xml);
    return result.Response.Results[0].AllVehicleMakes.map((make: any) => ({
      makeId: make.Make_ID[0],
      makeName: make.Make_Name[0],
    }));
  }
}
