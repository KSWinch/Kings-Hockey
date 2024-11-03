import WebScraperService from "../services/scraperService.js";
import * as gamesService from "../services/gamesService.js";
import * as statsService from "../services/statsService.js";
import * as standingService from "../services/standingsService.js";

export async function scrapeSchedule(req, res, next) {
  const scraper = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723"
  );

  try {
    await scraper.initializeWebScraper();
    const gamesData = await scraper.getSchedule();
    gamesData.forEach(async (game) => {
      const gameData = {
        away_team: game.awayTeam,
        date: game.date,
        home_team: game.homeTeam,
        location: game.location,
        rink: game.rink,
        time: game.time,
      };
      await gamesService.createGame(gameData);
    });

    res.status(200).json(gamesData);
  } catch (error) {
    next(error);
    console.error(error);
  }
}

export async function scrapePlayerStats(req, res, next) {
  const scraper = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/team/465723"
  );

  try {
    await scraper.initializeWebScraper();
    const playerStats = await scraper.getPlayerStats();
    playerStats.forEach(async (stats) => {
      const playerStat = {
        jersey_number: stats.jerseyNumber,
        name: stats.name,
        position: stats.position,
        games_played: stats.gamesPlayed,
        goals: stats.goals,
        assists: stats.assists,
        points: stats.points,
        points_per_game: stats.pointsPerGame,
        penalty_minutes: stats.penaltyMinutes,
        power_play_goals: stats.powerPlayGoals,
        short_handed_goals: stats.shortHandedGoals,
        game_winning_goals: stats.gameWinningGoals,
      };
      await statsService.createStat(playerStat);
    });
    res.status(200).json(playerStats);
  } catch (error) {
    next(error);
    console.error(error);
  }
}

// Fotus standings scraper spot
// Standings Scraper Endpoint
export async function scrapeStandings(req, res, next) {
  const scraper = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/standings?team_id=465723&render=division"
  );

  try {
    await scraper.initializeWebScraper();
    const standingsData = await scraper.getStandings();

    standingsData.forEach(async (standings) => {
      const teamStandings = {
        games_played: standings.games_played,
        goal_differential: standings.goal_differential,
        goals_against: standings.goals_against,
        goals_for: standings.goals_for,
        last_10_games: standings.last_10_games,
        losses: standings.losses,
        overtime_losses: standings.overtime_losses,
        penalty_minutes: standings.penalty_minutes,
        points: standings.points,
        rank: standings.rank,
        regulation_overtime_wins: standings.regulation_overtime_wins,
        regulation_wins: standings.regulation_wins,
        streak: standings.streak,
        team: standings.team,
        ties: standings.ties,
        wins: standings.wins,
      };
      await standingService.createStanding(teamStandings);
    });

    res.status(200).json(standingsData);
  } catch (error) {
    next(error);
    console.error(error);
  }
}
