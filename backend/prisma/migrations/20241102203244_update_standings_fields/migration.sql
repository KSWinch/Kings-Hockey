-- CreateTable
CREATE TABLE `Standings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rank` INTEGER NOT NULL,
    `team` VARCHAR(191) NOT NULL,
    `games_played` INTEGER NOT NULL,
    `wins` INTEGER NOT NULL,
    `losses` INTEGER NOT NULL,
    `ties` INTEGER NOT NULL,
    `overtime_losses` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `regulation_wins` INTEGER NOT NULL,
    `goals_for` INTEGER NOT NULL,
    `goals_against` INTEGER NOT NULL,
    `goal_differential` INTEGER NOT NULL,
    `penalty_minutes` INTEGER NOT NULL,
    `last_10_games` VARCHAR(191) NOT NULL,
    `streak` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
