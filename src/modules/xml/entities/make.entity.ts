import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { VehicleType } from "./vehicle-type.entity";

@Entity()
@ObjectType()
export class Make {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  makeId: number;

  @Column()
  @Field()
  makeName: string;

  @OneToMany(() => VehicleType, (vehicleType) => vehicleType.make)
  @Field(() => [VehicleType], { nullable: true })
  vehicleTypes?: VehicleType[];

  constructor() {
    this.id = 0;
    this.makeId = 0;
    this.makeName = "";
  }
}
