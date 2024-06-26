import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { XmlService } from "./xml.service";
import { XmlResolver } from "./xml.resolver";
import { Make } from "./entities/make.entity";
import { VehicleType } from "./entities/vehicle-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Make, VehicleType])],
  providers: [XmlService, XmlResolver],
})
export class XmlModule {}
