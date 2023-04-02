import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import { allTeams, teamById } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Varifica a rota /teams', async () => {
    let chaiHttpResponse: Response

  it('Busca o time conforme o id', async  () => {
    sinon.stub(Teams, 'findOne').resolves(teamById as Teams);

    chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(teamById);
  });

  it('Busca a lista de todos os times', async  () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(allTeams);
  });
});
