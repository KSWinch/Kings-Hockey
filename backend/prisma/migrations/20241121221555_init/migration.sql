/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Games_id_key` ON `Games`(`id`);
