import WebScraperService from "../services/scraperService.js";
import * as gamesService from "../services/gamesService.js";
import * as statsService from "../services/statsService.js";
import * as standingService from "../services/standingsService.js";
import * as goalService from "../services/goalService.js";
import * as penaltyService from "../services/penaltyService.js";

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
        away_score: game.away_score,
        away_team: game.awayTeam,
        date: game.date,
        home_score: game.home_score,
        home_team: game.homeTeam,
        id: game.id,
        location: game.location,
        rink: game.rink,
        time: game.time,
      };
      await gamesService.updateGame(game.date, gameData);
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
      await statsService.updateStat(stats.name, playerStat);
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

export async function scrapeGameDetails(req, res, next) {
  let goalsByGameID = await goalService.getAllGoals();
  let allGames = await gamesService.getAllGames();

  // Extract unique game IDs from goals
  const uniqueGameIDs = [...new Set(goalsByGameID.map((goal) => goal.game_id))];

  // Filter games to scrape
  let GamesToScrape = allGames.filter((game) => {
    const hasScore =
      game.home_score !== null &&
      game.home_score !== undefined &&
      game.home_score !== "";

    return hasScore && !uniqueGameIDs.includes(game.id);
  });

  try {
    for (const game of GamesToScrape) {
      const scraper = new WebScraperService(
        `https://crhl.hockeyshift.com/stats#/489/game/${game.id}`
      );

      await scraper.initializeWebScraper();
      const gameDetailsData = await scraper.getGameDetails();
      gameDetailsData.goals.forEach(async (goal, index) => {
        const goalId = `goal-${index}_${game.id}`;
        const goal_instance = {
          assister_1: goal.assister_1,
          assister_2: goal.assister_2,
          game_id: parseInt(game.id),
          id: goalId,
          period: goal.period,
          scorer: goal.scorer,
          team: goal.team,
          time: goal.time,
          total: goal.total,
        };
        await goalService.update_goal(goalId, goal_instance);
      });

      gameDetailsData.penalties.forEach(async (penalty, index) => {
        const penaltyId = `penalty-${index}_${game.id}`;
        const penalty_instance = {
          game_id: parseInt(game.id),
          id: penaltyId,
          infraction: penalty.infraction,
          length: penalty.length,
          period: penalty.period,
          player: penalty.player,
          team: penalty.team,
          time: penalty.time,
        };
        await penaltyService.update_penalty(penaltyId, penalty_instance);
      });
    }

    res.status(200).json({ message: "Scraping completed for all games." });
  } catch (error) {
    next(error);
    console.error(error);
  }
}
