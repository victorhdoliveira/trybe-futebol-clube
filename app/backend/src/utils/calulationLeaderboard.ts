import Matches from '../database/models/MatchesModel';

const finishedMatchesByHome = async (id: number): Promise<Matches[]> => {
  const allMatches = await Matches.findAll();
  const finishedMatches = allMatches
    .filter((match) => match.inProgress === false).filter((local) => local.homeTeamId === id);
  return finishedMatches;
};

const finishedMatchesByAway = async (id: number): Promise<Matches[]> => {
  const allMatches = await Matches.findAll();
  const finishedMatches = allMatches
    .filter((match) => match.inProgress === false).filter((local) => local.awayTeamId === id);
  return finishedMatches;
};

// Points
const totalPointsByHome = async (id: number): Promise<number> => {
  const matches = await finishedMatchesByHome(id);
  const win = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  const draw = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  const totalPoints = (win * 3) + draw;
  return totalPoints;
};

const totalPointsByAway = async (id: number): Promise<number> => {
  const matches = await finishedMatchesByAway(id);
  const win = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  const draw = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  const totalPoints = (win * 3) + draw;
  return totalPoints;
};

const pointsGameLocation = async (id:number, location:string) => {
  if (location === 'home') {
    return totalPointsByHome(id);
  } if (location === 'away') {
    return totalPointsByAway(id);
  }
};

const totalPoints = async (id:number): Promise<number> => {
  const home = await totalPointsByHome(id);
  const away = await totalPointsByAway(id);
  return home + away;
};

// totalGames
const gamesbyLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    return homeMatches.length;
  } if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    return awayMatches.length;
  }
};

const totalGames = async (id:number): Promise<number> => {
  const homeMatches = await finishedMatchesByHome(id);
  const awayMatches = await finishedMatchesByAway(id);
  return homeMatches.length + awayMatches.length;
};

// totalVictories
const victoriesByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const win = homeMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    return win;
  } if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const win = awayMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
    return win;
  }
};

const victories = async (id:number): Promise<number> => {
  const homeMatches = await finishedMatchesByHome(id);
  const homeWins = homeMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  const awayMatches = await finishedMatchesByAway(id);
  const awayWins = awayMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
  return homeWins + awayWins;
};

// totalDraws
const drawsByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const draw = homeMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    return draw;
  } if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const draw = awayMatches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
    return draw;
  }
};

const draws = async (id:number) => {
  const homeMatches = await finishedMatchesByHome(id);
  const homeDraws = homeMatches
    .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  const awayMatches = await finishedMatchesByAway(id);
  const awayDraws = awayMatches
    .filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
  return homeDraws + awayDraws;
};

// totalLosses
const lossesByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const loses = homeMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    return loses;
  } if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const loses = awayMatches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
    return loses;
  }
};

const losses = async (id:number): Promise<number> => {
  const homeMatches = await finishedMatchesByHome(id);
  const homeLoses = homeMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  const awayMatches = await finishedMatchesByAway(id);
  const awayLoses = awayMatches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
  return homeLoses + awayLoses;
};

// goalsFavor
const goalsFavorByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const goalsFavor = homeMatches.filter((match) => match.homeTeamGoals).length;
    return goalsFavor;
  } if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const goalsFavor = awayMatches.filter((match) => match.awayTeamGoals).length;
    return goalsFavor;
  }
};

const goalsFavor = async (id:number): Promise<number> => {
  const homeMatches = await finishedMatchesByHome(id);
  const homeGoalsFavor = homeMatches.filter((match) => match.homeTeamGoals).length;
  const awayMatches = await finishedMatchesByAway(id);
  const awayGoalsFavor = awayMatches.filter((match) => match.awayTeamGoals).length;
  return homeGoalsFavor + awayGoalsFavor;
};

// goalsOwn
const goalsOwnByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const goalsOwn = homeMatches.filter((match) => match.awayTeamGoals).length;
    return goalsOwn;
  } if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const goalsOwn = awayMatches.filter((match) => match.homeTeamGoals).length;
    return goalsOwn;
  }
};

const goalsOwn = async (id:number): Promise<number> => {
  const homeMatches = await finishedMatchesByHome(id);
  const homeGoalsOwn = homeMatches.filter((match) => match.awayTeamGoals).length;
  const awayMatches = await finishedMatchesByAway(id);
  const awayGoalsOwn = awayMatches.filter((match) => match.homeTeamGoals).length;
  return homeGoalsOwn + awayGoalsOwn;
};

// goalsBalance
const goalsBalanceByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const homeGoalsFavor = homeMatches.filter((match) => match.homeTeamGoals).length;
    const homeGoalsOwn = homeMatches.filter((match) => match.awayTeamGoals).length;
    return homeGoalsFavor - homeGoalsOwn;
  }
  if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const awayGoalsFavor = awayMatches.filter((match) => match.awayTeamGoals).length;
    const awayGoalsOwn = awayMatches.filter((match) => match.homeTeamGoals).length;
    return awayGoalsFavor - awayGoalsOwn;
  }
};

const goalsBalance = async (id:number): Promise<number> => {
  const favor = await goalsFavor(id);
  const own = await goalsOwn(id);
  return favor - own;
};

// goalsEfficiency
const efficiencyByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const points = await totalPointsByHome(id);
    const homeMatches = await finishedMatchesByHome(id);
    const games = homeMatches.length;
    const efficiency = ((points / (games * 3)) * 100).toFixed(2);
    return efficiency;
  }
  if (location === 'away') {
    const points = await totalPointsByAway(id);
    const awayMatches = await finishedMatchesByAway(id);
    const games = awayMatches.length;
    const effective = ((points / (games * 3)) * 100).toFixed(2);
    return effective;
  }
};

const efficiency = async (id:number): Promise<string> => {
  const points = await totalPoints(id);
  const games = await totalGames(id);
  const effective = ((points / (games * 3)) * 100).toFixed(2);
  return effective;
};

const homeOrAwayFuncs = { victoriesByLocation,
  gamesbyLocation,
  pointsGameLocation,
  drawsByLocation,
  lossesByLocation,
  goalsFavorByLocation,
  goalsOwnByLocation,
  goalsBalanceByLocation,
  efficiencyByLocation,
};

const allGamesFuncs = {
  totalPoints,
  totalGames,
  victories,
  draws,
  losses,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  efficiency,
};

export { homeOrAwayFuncs, allGamesFuncs };
