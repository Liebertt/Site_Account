const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    email: String,
    observacao: String
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);