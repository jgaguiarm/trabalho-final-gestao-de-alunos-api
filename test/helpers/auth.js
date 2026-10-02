import { api } from "./api.js";
import 'dotenv/config';

let tokenEmCache = null;

export async function loginAdmin() {
    if(!tokenEmCache){
        const loginResposta = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: process.env.ADMIN_EMAIL,
                senha: process.env.ADMIN_PASSWORD
            });
        tokenEmCache = loginResposta.body.token;
    }

    return `Bearer ${tokenEmCache}`;
}

export async function loginAluno(dadosDoAluno) { 
    const loginResposta = await api()
        .post('/api/auth/login') 
        .set('Content-Type', 'application/json') 
        .send({ 
            email: dadosDoAluno.email, 
            senha: dadosDoAluno.senha 
    }); 
    
    return loginResposta; 
}