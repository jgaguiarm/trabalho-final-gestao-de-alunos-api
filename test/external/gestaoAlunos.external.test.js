import { expect } from 'chai';
import { api } from '../helpers/api.js';
import testData from '../fixtures/testData.json' with { type: 'json' };
import { limparDadosTeste } from '../helpers/database.js';
import 'dotenv/config';

describe('Fluxo de alunos', () => {

    beforeEach(async () => {
        await limparDadosTeste();
    });
    
    it('deve retornar 200 e um token quando o admin realizar login com sucesso', async () => {

        const loginResposta = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: process.env.ADMIN_EMAIL,
                senha: process.env.ADMIN_PASSWORD
            });

        expect(loginResposta.status).to.equal(testData.statusCodeEsperado.loginAdmin);
        expect(loginResposta.body).to.have.property('token');
    });

})