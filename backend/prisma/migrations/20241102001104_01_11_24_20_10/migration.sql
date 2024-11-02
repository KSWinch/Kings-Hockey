/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Games_date_key` ON `Games`(`date`);

-- CreateIndex
CREATE UNIQUE INDEX `Stats_name_key` ON `Stats`(`name`);
