import 'dotenv/config';
import mongoose from '../../src/database/db.js';

export async function limparDadosTeste() {
    await mongoose.connection.collection('alunos').deleteMany({});
}