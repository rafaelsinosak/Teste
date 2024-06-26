import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Make } from "./make.entity";

@Entity()
@ObjectType()
export class VehicleType {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  typeId: number;

  @Column()
  @Field()
  typeName: string;

  @ManyToOne(() => Make, (make) => make.vehicleTypes)
  @Field(() => Make, { nullable: true })
  make?: Make;

  constructor() {
    this.id = 0;
    this.typeId = 0;
    this.typeName = "";
  }
}
