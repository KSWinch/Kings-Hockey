import WebScraperService from "../services/scraperService.js";
import * as gamesService from "../services/gamesService.js";
import * as statsService from "../services/statsService.js";
import * as standingService from "../services/standingsService.js";

export async function scrapeSchedule(req, res, next) {
  const scraper1 = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723"
  );
  const scraper2 = new WebScraperService(
    "https://crhl.hockeyshift.com/stats#/489/scores?team_id=465723"
  );

  try {
    await scraper1.initializeWebScraper();
    const gamesData1 = await scraper1.getSchedule();

    await scraper2.initializeWebScraper();
    const gamesData2 = await scraper2.getScore();

    const gamesWithScores = gamesData1.map((game) => {
      const scoreData = gamesData2.find((score) => score.date === game.date);
      if (scoreData) {
        const [homeScore, awayScore] = scoreData.score.split(" - ").map(String);
        return {
          ...game,
          away_score: awayScore,
          home_score: homeScore,
        };
      }
      return {
        ...game,
        away_score: "",
        home_score: "",
      };
    });

    gamesWithScores.forEach(async (game) => {
      const gameData = {
        away_team: game.awayTeam,
        home_team: game.homeTeam,
        date: game.date,
        time: game.time,
        location: game.location,
        rink: game.rink,
        away_score: game.away_score,
        home_score: game.home_score,
      };
      await gamesService.updateGame(gameData);
      console.log(gameData);
    });

    res.status(200).json(gamesWithScores);
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
      await statsService.updateStat(stats.jerseyNumber, playerStat);
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
      await standingService.updateStanding(standings.team, teamStandings);
    });

    res.status(200).json(standingsData);
  } catch (error) {
    next(error);
    console.error(error);
  }
}
