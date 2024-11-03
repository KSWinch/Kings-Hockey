/*
  Warnings:

  - A unique constraint covering the columns `[team]` on the table `Standings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Standings_team_key` ON `Standings`(`team`);
