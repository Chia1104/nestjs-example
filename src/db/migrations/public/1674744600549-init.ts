import { MigrationInterface, QueryRunner } from 'typeorm';
import { DB_USER } from '../../../shared/constants';

export class init1674744600549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(`nestjs-example`, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase(`nestjs-example`, true);
  }
}
