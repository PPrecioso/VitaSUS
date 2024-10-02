const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    await mongoose.connect(process.env.MONGO_URI, options);

    console.log(`MongoDB conectado: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    setTimeout(connectDB, 5000); // Tenta reconectar em 5 segundos
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('Conexão perdida com o MongoDB. Tentando reconectar...');
    setTimeout(connectDB, 5000);
  });

  mongoose.connection.on('reconnected', () => {
    console.log('Reconectado ao MongoDB com sucesso.');
  });
};

module.exports = connectDB;
