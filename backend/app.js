// Importações
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

// Configurações
const app = express();
const PORT = process.env.PORT || 3000; // Define a porta

// Middleware
app.use(cors()); // Permite CORS para todos os domínios
app.use(morgan('dev')); // Registra requisições no console
app.use(bodyParser.json()); // Parseia o corpo das requisições como JSON

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.get('/', (req, res) => {
    res.send('API do VitaSUS');
});

// Importar e usar os routers
const patientRouter = require('./models/Patient'); // Importa as rotas de pacientes
const doctorRouter = require('./models/Doctor'); // Importa as rotas de médicos
const appointmentRouter = require('./models/Appointment'); // Importa as rotas de agendamentos
const reviewRouter = require('./models/Review'); // Importa as rotas de avaliações

app.use('/api/patients', patientRouter); // Define a rota para pacientes
app.use('/api/doctors', doctorRouter); // Define a rota para médicos
app.use('/api/appointments', appointmentRouter); // Define a rota para agendamentos
app.use('/api/reviews', reviewRouter); // Define a rota para avaliações

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
