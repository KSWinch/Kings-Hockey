/*
  Warnings:

  - The primary key for the `Stats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Stats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jersey_number]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Stats_name_key` ON `Stats`;

-- AlterTable
ALTER TABLE `Stats` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`jersey_number`);

-- CreateIndex
CREATE UNIQUE INDEX `Stats_jersey_number_key` ON `Stats`(`jersey_number`);
