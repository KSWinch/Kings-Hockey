/*
  Warnings:

  - You are about to drop the column `assister1` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `assister2` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Penalty` table. All the data in the column will be lost.
  - Added the required column `game_id` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `Penalty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Goal` DROP FOREIGN KEY `Goal_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `Penalty` DROP FOREIGN KEY `Penalty_gameId_fkey`;

-- AlterTable
ALTER TABLE `Goal` DROP COLUMN `assister1`,
    DROP COLUMN `assister2`,
    DROP COLUMN `gameId`,
    ADD COLUMN `assister_1` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `assister_2` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `game_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Penalty` DROP COLUMN `gameId`,
    ADD COLUMN `game_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Goal` ADD CONSTRAINT `Goal_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Games`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penalty` ADD CONSTRAINT `Penalty_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Games`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
