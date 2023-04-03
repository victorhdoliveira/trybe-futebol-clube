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

describe('Verifica a rota /teams', async () => {
    let chaiHttpResponse: Response
    afterEach(sinon.restore);

  it('Busca a lista de todos os times', async  () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);
    chaiHttpResponse = await chai.request(app).get('/teams');
    const {status, body} = chaiHttpResponse;
    
    expect(status).to.be.eq(200)
    expect(body).to.be.deep.eq(allTeams);
  });

  it('Busca o time conforme o id', async  () => {
    sinon.stub(Teams, 'findByPk').resolves(teamById as Teams);
    chaiHttpResponse = await chai.request(app).get('/teams/1');
    const {status, body} = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.eq(teamById);
  });
});
