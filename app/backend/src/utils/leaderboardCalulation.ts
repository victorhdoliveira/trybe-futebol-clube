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
  if (location === 'home') { return totalPointsByHome(id); }
  if (location === 'away') { return totalPointsByAway(id); }
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

// generic goals
const sumGoals = async (array: any[]) => array.reduce((acc:number, cur:number) => acc + cur, 0);

// goalsFavor
const goalsFavorByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const goalsFavor = homeMatches.map((match) => match.homeTeamGoals);
    return sumGoals(goalsFavor);
  } if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const goalsFavor = awayMatches.map((match) => match.awayTeamGoals);
    return sumGoals(goalsFavor);
  }
};

const goalsFavor = async (id:number): Promise<number> => {
  const homeMatches = await finishedMatchesByHome(id);
  const homeGoalsFavor = homeMatches.map((match) => match.homeTeamGoals);
  const sumHomeGoalsFavor = await sumGoals(homeGoalsFavor);
  const awayMatches = await finishedMatchesByAway(id);
  const awayGoalsFavor = awayMatches.map((match) => match.awayTeamGoals);
  const sumAwayGoalsFavor = await sumGoals(awayGoalsFavor);
  return sumHomeGoalsFavor + sumAwayGoalsFavor;
};

// goalsOwn
const goalsOwnByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const goalsOwn = homeMatches.map((match) => match.awayTeamGoals);
    return sumGoals(goalsOwn);
  } if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const goalsOwn = awayMatches.map((match) => match.homeTeamGoals);
    return sumGoals(goalsOwn);
  }
};

const goalsOwn = async (id:number): Promise<number> => {
  const homeMatches = await finishedMatchesByHome(id);
  const homeGoalsOwn = homeMatches.map((match) => match.awayTeamGoals);
  const sumHomeGoalsOwn = await sumGoals(homeGoalsOwn);
  const awayMatches = await finishedMatchesByAway(id);
  const awayGoalsOwn = awayMatches.map((match) => match.homeTeamGoals);
  const sumAwayGoalsOwn = await sumGoals(awayGoalsOwn);
  return sumHomeGoalsOwn + sumAwayGoalsOwn;
};

// goalsBalance
const goalsBalanceByLocation = async (id:number, location:string) => {
  if (location === 'home') {
    const homeMatches = await finishedMatchesByHome(id);
    const homeGoalsFavor = homeMatches.map((match) => match.homeTeamGoals);
    const homeGoalsOwn = homeMatches.map((match) => match.awayTeamGoals);
    const sumHomeGoalsFavor = await sumGoals(homeGoalsFavor);
    const sumHomeGoalsOwn = await sumGoals(homeGoalsOwn);
    return sumHomeGoalsFavor - sumHomeGoalsOwn;
  }
  if (location === 'away') {
    const awayMatches = await finishedMatchesByAway(id);
    const awayGoalsFavor = awayMatches.map((match) => match.awayTeamGoals);
    const awayGoalsOwn = awayMatches.map((match) => match.homeTeamGoals);
    const sumAwayGoalsFavor = await sumGoals(awayGoalsFavor);
    const sumAwayGoalsOwn = await sumGoals(awayGoalsOwn);
    return sumAwayGoalsFavor - sumAwayGoalsOwn;
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
