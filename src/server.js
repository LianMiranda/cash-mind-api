const app = require('./app');
const env = require('./config/EnvConfig/env.config');


app.listen(env.port, async () => {
    console.log(`🚀 Servidor rodando na porta ${env.port}`);
});
  
