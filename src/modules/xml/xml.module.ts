import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";
import { XmlService } from "./xml.service";
import { XmlResolver } from "./xml.resolver";
import { Make } from "./entities/make.entity";
import { VehicleType } from "./entities/vehicle-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Make, VehicleType]), HttpModule],
  providers: [XmlService, XmlResolver],
})
export class XmlModule {}
