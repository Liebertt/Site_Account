const db = require('./db');

//criando a tabela postagens

const Post = db.sequelize.define('postagens', { 
    nome:{
type: db.Sequelize.STRING
},
telefone:{
type: db.Sequelize.STRING
},
email:{
    type: db.Sequelize.STRING
    },
    observacao:{
        type: db.Sequelize.STRING
        }
});

//Post.sync({force: true});

module.exports = Post;