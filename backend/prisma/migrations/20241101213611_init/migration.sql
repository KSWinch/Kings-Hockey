/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Test`;

-- CreateTable
CREATE TABLE `Users` (
    `email` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Games` (
    `away_team` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `home_team` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `rink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stats` (
    `assists` INTEGER NOT NULL,
    `game_winning_goals` INTEGER NOT NULL,
    `games_played` INTEGER NOT NULL,
    `goals` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jersey_number` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `penalty_minutes` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `points_per_game` INTEGER NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `power_play_goals` INTEGER NOT NULL,
    `short_handed_goals` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
