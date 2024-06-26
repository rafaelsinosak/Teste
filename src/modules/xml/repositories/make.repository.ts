
import { EntityRepository, Repository } from 'typeorm';
import { Make } from '../entities/make.entity';

@EntityRepository(Make)
export class MakeRepository extends Repository<Make> {}
