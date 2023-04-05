module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches',{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    homeTeamId: {
      field: 'home_team_id',
      type: Sequelize.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    homeTeamGoals: {
      field: 'home_team_goals',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    awaitTeamId: {
      field: 'away_team_id',
      type: Sequelize.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    awaitTeamGoals: {
      field: 'away_team_goals',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    inProgress: {
      field: 'in_progress',
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  });
},

down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('matches');
}
};