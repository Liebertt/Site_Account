const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://site_account_user:4U8OMPLtp2sFkdcQ@cluster0.kq5tp.mongodb.net/site_account?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas'))
.catch((err) => console.error('❌ Erro de conexão:', err));