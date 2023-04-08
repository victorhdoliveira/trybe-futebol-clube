import Matches from '../database/models/MatchesModel';

const getFinishedMatchesByHome = async (id: number) => {
  const allMatches = await Matches.findAll();
  const finishedMatches = allMatches
    .filter((match) => match.inProgress === false).filter((local) => local.homeTeamId === id);
  return finishedMatches;
};

const getFinishedMatchesByAway = async (id: number) => {
  const allMatches = await Matches.findAll();
  const finishedMatches = allMatches
    .filter((match) => match.inProgress === false).filter((local) => local.awayTeamId === id);
  return finishedMatches;
};

const getTotalPointsByHome = async (id: number) => {
  const matches = await getFinishedMatchesByHome(id);
  const win = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  const draw = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  const totalPoints = (win.length * 3) + draw.length;
  return totalPoints;
};

const getTotalPointsByAway = async (id: number) => {
  const matches = await getFinishedMatchesByAway(id);
  const win = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
  const draw = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  const totalPoints = (win.length * 3) + draw.length;
  return totalPoints;
};

const getTotalPointsGameLocation = async (id:number, location:string) => {
  if (location === 'home') {
    return getTotalPointsByHome(id);
  } if (location === 'away') {
    return getTotalPointsByAway(id);
  }
};

const getTotalGames = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await getFinishedMatchesByHome(id);
    return homeMatches.length;
  } if (location === 'away') {
    const awayMatches = await getFinishedMatchesByAway(id);
    return awayMatches.length;
  }
};

const getTotalVictories = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await getFinishedMatchesByHome(id);
    const win = homeMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    return win.length;
  } if (location === 'away') {
    const awayMatches = await getFinishedMatchesByAway(id);
    const win = awayMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals);
    return win.length;
  }
};

const getTotalDraws = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await getFinishedMatchesByHome(id);
    const draw = homeMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    return draw.length;
  } if (location === 'away') {
    const awayMatches = await getFinishedMatchesByAway(id);
    const draw = awayMatches.filter((match) => match.awayTeamGoals === match.homeTeamGoals);
    return draw.length;
  }
};

const getTotalLosses = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await getFinishedMatchesByHome(id);
    const loses = homeMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    return loses.length;
  } if (location === 'away') {
    const awayMatches = await getFinishedMatchesByAway(id);
    const loses = awayMatches.filter((match) => match.awayTeamGoals < match.homeTeamGoals);
    return loses.length;
  }
};

const getTotalGoalsFavor = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await getFinishedMatchesByHome(id);
    const goalsFavor = homeMatches.filter((match) => match.homeTeamGoals);
    return goalsFavor.length;
  } if (location === 'away') {
    const awayMatches = await getFinishedMatchesByAway(id);
    const goalsFavor = awayMatches.filter((match) => match.awayTeamGoals);
    return goalsFavor.length;
  }
};

const getTotalGoalsOwn = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await getFinishedMatchesByHome(id);
    const goalsOwn = homeMatches.filter((match) => match.awayTeamGoals);
    return goalsOwn.length;
  } if (location === 'away') {
    const awayMatches = await getFinishedMatchesByAway(id);
    const goalsOwn = awayMatches.filter((match) => match.homeTeamGoals);
    return goalsOwn.length;
  }
};

const leaderboardFuncs = { getTotalVictories,
  getTotalGames,
  getTotalPointsGameLocation,
  getTotalDraws,
  getTotalLosses,
  getTotalGoalsFavor,
  getTotalGoalsOwn };

export default leaderboardFuncs;
