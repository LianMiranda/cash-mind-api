const app = require('./app');
const env = require('./config/env/env');

app.listen(env.port, async () => {
    console.log(`🚀 Servidor rodando na porta ${env.port}`);
});
  
