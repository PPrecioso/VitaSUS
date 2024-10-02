require('dotenv').config();

const checkEnvVars = () => {
  const requiredVars = ['MONGO_URI', 'PORT'];

  requiredVars.forEach((variable) => {
    if (!process.env[variable]) {
      console.error(`Variável de ambiente ${variable} não definida. Verifique o arquivo .env.`);
      process.exit(1);
    }
  });
};

checkEnvVars();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
};
