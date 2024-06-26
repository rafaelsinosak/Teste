
import { EntityRepository, Repository } from 'typeorm';
import { VehicleType } from '../entities/vehicle-type.entity';

@EntityRepository(VehicleType)
export class VehicleTypeRepository extends Repository<VehicleType> {}
