/*
  Warnings:

  - Added the required column `away_score` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_score` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Games` ADD COLUMN `away_score` VARCHAR(191) NOT NULL,
    ADD COLUMN `home_score` VARCHAR(191) NOT NULL;
