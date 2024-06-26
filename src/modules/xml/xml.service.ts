import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { parseStringPromise } from "xml2js";
import { Make } from "./entities/make.entity";
import { VehicleType } from "./entities/vehicle-type.entity";

@Injectable()
export class XmlService implements OnModuleInit {
  constructor(
    @InjectRepository(Make)
    private makesRepository: Repository<Make>,
    @InjectRepository(VehicleType)
    private vehicleTypesRepository: Repository<VehicleType>,
    private httpService: HttpService
  ) {}

  async onModuleInit() {
    await this.populateDatabase();
  }

  async findAll(): Promise<Make[]> {
    return this.makesRepository.find({ relations: ["vehicleTypes"] });
  }

  private async populateDatabase(): Promise<void> {
    try {
      const makesData = await this.fetchXmlData(
        "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML"
      );
      console.log("Fetched makes data");
      const makesJson = await parseStringPromise(makesData);
      const makes =
        makesJson.Response?.Results?.[0]?.AllVehicleMakes?.map((make: any) => ({
          makeId: make.Make_ID[0],
          makeName: make.Make_Name[0],
        })) || [];

      for (const make of makes) {
        const savedMake = await this.makesRepository.save(make);
        const vehicleTypesData = await this.fetchXmlData(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${make.makeId}?format=XML`
        );
        console.log(`Fetched vehicle types for makeId ${make.makeId}`);
        const vehicleTypesJson = await parseStringPromise(vehicleTypesData);
        const vehicleTypes =
          vehicleTypesJson.Response?.Results?.[0]?.VehicleTypesForMakeIds?.map(
            (vehicleType: any) => ({
              typeId: vehicleType.VehicleTypeId[0],
              typeName: vehicleType.VehicleTypeName[0],
              make: savedMake,
            })
          ) || [];

        await this.vehicleTypesRepository.save(vehicleTypes);
      }
    } catch (error) {
      console.error("Error populating database:", error);
    }
  }

  private async fetchXmlData(url: string): Promise<string> {
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
