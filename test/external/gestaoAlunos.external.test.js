import { expect } from 'chai';
import { loginAdmin, loginAluno } from '../helpers/auth.js';
import { api } from '../helpers/api.js';
import testData from '../fixtures/testData.json' with { type: 'json' };
import { limparDadosTeste } from '../helpers/database.js';
import 'dotenv/config';

describe('Fluxo de alunos', () => {

     let alunosCriados = [];

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

    it('deve logar como Administrador e cadastrar um alunos', async () => {

        const login = await loginAdmin();

        // Act
        for (const aluno of testData.alunos) {
            const cadastroAlunoResposta = await api()
                .post('/api/admin/alunos')
                .set('Content-Type', 'application/json')
                .set('Authorization', login)
                .send(aluno);


            // Assert
            expect(cadastroAlunoResposta.status).to.equal(testData.statusCodeEsperado.cadastroAluno);
            expect(cadastroAlunoResposta.body.nome).to.equal(aluno.nome);
            expect(cadastroAlunoResposta.body.email).to.equal(aluno.email);
            expect(cadastroAlunoResposta.body.matricula).to.equal(aluno.matricula);

            alunosCriados.push(cadastroAlunoResposta.body);
        }
    });

    it('deve realizar login como aluno', async () => {

        const loginAdminToken = await loginAdmin();

        for (const aluno of testData.alunos) {

            // Cadastra o aluno
            const cadastroAlunoResposta = await api()
                .post('/api/admin/alunos')
                .set('Content-Type', 'application/json')
                .set('Authorization', loginAdminToken)
                .send(aluno);

            expect(cadastroAlunoResposta.status).to.equal(testData.statusCodeEsperado.cadastroAluno);

            // Login do aluno
            const loginAlunoResposta = await loginAluno(aluno);

            expect(loginAlunoResposta.status).to.equal(testData.statusCodeEsperado.loginAluno);
            expect(loginAlunoResposta.body).to.have.property('token');
            expect(loginAlunoResposta.body.token).to.be.a('string').and.not.be.empty;

        }
    });

})