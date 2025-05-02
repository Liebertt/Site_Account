const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const path = require('path');

// Conexão com o MongoDB Atlas (substitua pela sua URL do MongoDB Atlas)
mongoose.connect('mongodb+srv://site_account_user:4U8OMPLtp2sFkdcQ@cluster0.kq5tp.mongodb.net/site_account?retryWrites=true&w=majority')
    .then(() => console.log("MongoDB conectado com sucesso"))
    .catch(err => console.log("Erro ao conectar ao MongoDB: " + err));

// Configuração do Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static('public/img'));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Páginas estáticas
app.get('/sobre', (req, res) => res.render('sobre'));
app.get('/servicos', (req, res) => res.render('servicos'));
app.get('/mensagem', (req, res) => res.render('mensagem'));
app.get('/contato', (req, res) => res.render('contato'));

// Página inicial
app.get('/', (req, res) => {
    Post.find().sort({ createdAt: -1 }).then(posts => {
        res.render('home', { posts });
    });
});

// Formulário de cadastro
app.get('/cad', (req, res) => res.render('formulario'));

// Adicionar dados
app.post('/add', (req, res) => {
    const novoPost = new Post({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        observacao: req.body.observacao
    });

    novoPost.save()
        .then(post => res.redirect(`/confirmacao/${post._id}`))
        .catch(err => res.send('Houve um erro: ' + err));
});

// Página de confirmação
app.get('/confirmacao/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) res.render('confirmacao', { post });
            else res.send('Mensagem não encontrada.');
        })
        .catch(err => res.send('Erro: ' + err));
});

// Deletar dados
app.get('/deletar/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/'))
        .catch(err => res.send("Erro ao deletar: " + err));
});

// Salvar post
app.post('/save_post', (req, res) => {
    const novoPost = new Post(req.body);
    novoPost.save()
        .then(post => res.redirect(`/mensagens/${post._id}`))
        .catch(err => res.status(500).send('Erro ao salvar o comentário: ' + err));
});

// Buscar mensagem
app.get('/mensagens/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) res.render('mensagem', { post });
            else res.status(404).send('Comentário não encontrado.');
        })
        .catch(err => res.status(500).send('Erro ao carregar a página de mensagens: ' + err));
});

// Página de alteração
app.get('/alterar/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) res.render('alterar', { post });
            else res.status(404).send('Comentário não encontrado.');
        })
        .catch(err => res.status(500).send('Erro ao carregar a página de alteração: ' + err));
});

// Atualizar dados
app.post('/update', (req, res) => {
    Post.findByIdAndUpdate(req.body.id, {
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        observacao: req.body.observacao
    }, { new: true })
        .then(() => res.redirect(`/mensagens/${req.body.id}`))
        .catch(err => res.send("Erro ao atualizar: " + err));
});

// Classificador de empresas
app.post('/classificador', (req, res) => {
    const { faturamento, funcionarios, setor } = req.body;
    let tipo = 'Desconhecido';

    // MEI
    if (faturamento <= 81000 && funcionarios <= 1) {
        tipo = 'MEI';
    } 
    // Microempresa (ME)
    else if (faturamento <= 360000 && ((setor === 'comercio' || setor === 'servicos') && funcionarios <= 9) || (setor === 'industria' && funcionarios <= 19)) {
        tipo = 'Microempresa (ME)';
    }
    // Empresa de Pequeno Porte (EPP)
    else if (faturamento <= 4800000 && ((setor === 'comercio' || setor === 'servicos') && funcionarios >= 10 && funcionarios <= 49) || (setor === 'industria' && funcionarios >= 20 && funcionarios <= 99)) {
        tipo = 'Empresa de Pequeno Porte (EPP)';
    }
    // Empresa de Médio Porte
    else if (faturamento <= 300000000 && ((setor === 'comercio' || setor === 'servicos') && funcionarios >= 50 && funcionarios <= 99) || (setor === 'industria' && funcionarios >= 100 && funcionarios <= 499)) {
        tipo = 'Empresa de Médio Porte';
    }
    // Grande Empresa
    else if (faturamento > 300000000 && ((setor === 'comercio' || setor === 'servicos') && funcionarios >= 100) || (setor === 'industria' && funcionarios >= 500)) {
        tipo = 'Grande Empresa';
    }

    res.render('resultado', { tipo });
});

// Inicialização do servidor
app.listen(8081, () => console.log("Servidor Rodando na porta 8081"));
