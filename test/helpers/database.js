import 'dotenv/config';
import mongoose from '../../src/database/db.js';

export async function limparDadosTeste() {
    await mongoose.connection.collection('alunos').deleteMany({});
    await mongoose.connection.collection('disciplinas').deleteMany({});
    await mongoose.connection.collection('trabalhos').deleteMany({});
}