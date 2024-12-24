/*
  Warnings:

  - The primary key for the `Stats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Stats_jersey_number_key` ON `Stats`;

-- AlterTable
ALTER TABLE `Stats` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Stats_name_key` ON `Stats`(`name`);
