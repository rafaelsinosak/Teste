import { Injectable } from "@nestjs/common";
import { parseStringPromise } from "xml2js";
import { InjectRepository } from "@nestjs/typeorm";
import { Make } from "./entities/make.entity";
import { Repository } from "typeorm";
import axios from "axios";

@Injectable()
export class XmlService {
  constructor(
    @InjectRepository(Make)
    private makesRepository: Repository<Make>
  ) {}

  async fetchAndParseXml(url: string): Promise<any> {
    const response = await axios.get(url);
    const parsedXml = await parseStringPromise(response.data);
    return parsedXml;
  }

  async getAllMakes(): Promise<any[]> {
    const url =
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML";
    const result = await this.fetchAndParseXml(url);
    return result.Response.Results[0].AllVehicleMakes.map((make: any) => ({
      makeId: make.Make_ID[0],
      makeName: make.Make_Name[0],
    }));
  }

  async getVehicleTypesForMakeId(makeId: number): Promise<any[]> {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=XML`;
    const result = await this.fetchAndParseXml(url);
    return result.Response.Results[0].VehicleTypesForMakeIds.map(
      (vehicleType: any) => ({
        typeId: vehicleType.VehicleTypeId[0],
        typeName: vehicleType.VehicleTypeName[0],
      })
    );
  }

  async getMakesWithVehicleTypes(): Promise<any[]> {
    const makes = await this.getAllMakes();
    const makesWithVehicleTypes = await Promise.all(
      makes.map(async (make) => {
        const vehicleTypes = await this.getVehicleTypesForMakeId(make.makeId);
        return {
          ...make,
          vehicleTypes,
        };
      })
    );
    return makesWithVehicleTypes;
  }

  async findAll(): Promise<Make[]> {
    return this.makesRepository.find({ relations: ["vehicleTypes"] });
  }
}
