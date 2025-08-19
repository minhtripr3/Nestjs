import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1755616726552 implements MigrationInterface {
    name = 'CreateUserTable1755616726552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`teacher\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bio\` varchar(255) NOT NULL, \`rating\` float NOT NULL DEFAULT '5', \`price\` int NOT NULL, \`subjects\` text NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_4f596730e16ee49d9b081b5d8e\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`booking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`datetime\` datetime NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`studentId\` int NULL, \`teacherId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`teacher\` ADD CONSTRAINT \`FK_4f596730e16ee49d9b081b5d8e5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_16524af86c0e3b3dd66517eec6a\` FOREIGN KEY (\`studentId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_9f46fa28cd1be174e2ad12bc2a3\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_9f46fa28cd1be174e2ad12bc2a3\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_16524af86c0e3b3dd66517eec6a\``);
        await queryRunner.query(`ALTER TABLE \`teacher\` DROP FOREIGN KEY \`FK_4f596730e16ee49d9b081b5d8e5\``);
        await queryRunner.query(`DROP TABLE \`booking\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_4f596730e16ee49d9b081b5d8e\` ON \`teacher\``);
        await queryRunner.query(`DROP TABLE \`teacher\``);
    }

}
