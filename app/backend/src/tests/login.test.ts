import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import { token, user, userWithoutPassword } from './mocks/loginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica a rota /login', async () => {
    let chaiHttpResponse: Response
    afterEach(sinon.restore);

  it('Verifica se o login é realizado corretamente', async  () => {
    chai.request(app).post('/login').send(user).then((chaiHttpResponse) => {
        expect(chaiHttpResponse.status).to.be.eq(200)
        expect(chaiHttpResponse.body).to.be.eq({ token })
        })
    })
    it('Verifica se a mensagem de erro é enviada quando não há a senha', async  () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(userWithoutPassword);
            expect(chaiHttpResponse.status).to.be.eq(400)
            expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'All fields must be filled' })
    })
    it('Verifica se a mensagem de erro é enviada com o email não cadastrado', async  () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'wrong@email.com',
            password: 'wrong'
        });
            expect(chaiHttpResponse.status).to.be.eq(401)
            expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Invalid email or password' })
    })
    it('Verifica se a mensagem de erro é enviada com o email no formato incorreto', async  () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: '@email.com',
            password: 'wrong'
        });
            expect(chaiHttpResponse.status).to.be.eq(401)
            expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Invalid email or password' })
    })
});

