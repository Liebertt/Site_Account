const express = require("express"); 
const app = express();
const handlebars = require('express-handlebars'); 
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const path = require('path');

// Configuração do Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); 
app.set('views', path.join(__dirname, 'views'));

// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static('public/img'))

// Middleware para tratar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para página estática
app.get('/sobre', (req, res) => {
    res.render('sobre'); // Renderiza a página quemsomos.handlebars
});

app.get('/servicos', (req, res) => {
    res.render('servicos'); // Renderiza a página servicos.handlebars
});

app.get('/mensagem', (req, res) => {
    res.render('mensagem'); // Renderiza a página mensagem.handlebars
});

app.get('/contato', (req, res) => {
    res.render('contato'); // Renderiza a página contato.handlebars
});

// Rota principal
app.get('/', (req, res) => { 
    Post.findAll().then(posts => {
        posts = posts.map(post => post.toJSON());
        res.render('home', { posts: posts });
    });
});

// Rota para o cadastro 
app.get('/cad', (req, res) => {
    res.render('formulario');
});

// Rota para adicionar dados
app.post('/add', (req, res) => {
    Post.create({
        nome: req.body.nome, 
        telefone: req.body.telefone,
        email: req.body.email,
        observacao: req.body.observacao
    })
    .then(post => {
        res.redirect(`/confirmacao/${post.id}`); // Redireciona para a página de confirmação com o ID do post
    })
    .catch(erro => { 
        res.send('Houve um erro: ' + erro);
    });
});

// Rota para página de confirmação
app.get('/confirmacao/:id', (req, res) => {
    Post.findByPk(req.params.id)
    .then(post => {
        if (post) {
            res.render('confirmacao', { post: post.toJSON() });
        } else {
            res.send('Mensagem não encontrada.');
        }
    })
    .catch(erro => {
        res.send('Erro: ' + erro);
    });
});


// Rota para deletar dados
app.get('/deletar/:id', (req, res) => {
    Post.destroy({ where: { id: req.params.id } })
    .then(() => {
        res.redirect('/'); // Redireciona para a página principal após a exclusão
    })
    .catch(erro => {
        res.send("Erro ao deletar: " + erro);
    });
});

app.post('/save_post', (req, res) => {
    const { nome, telefone, email, observacao } = req.body;

    // Cria um novo registro de Post no banco de dados
    Post.create({
        nome: nome,
        telefone: telefone,
        email: email,
        observacao: observacao
    })
    .then(post => {
        // Após criar o post, redireciona para a página de mensagens com o ID do post recém-criado
        res.redirect(`/mensagens/${post.id}`);
    })
    .catch(erro => {
        res.status(500).send('Erro ao salvar o comentário: ' + erro);
    });
});



// Rota para buscar mensagem cadastrada
app.get('/mensagens/:id', (req, res) => {
    Post.findByPk(req.params.id)
    .then(post => {
        if (post) {
            res.render('mensagem', { post: post.toJSON() });
        } else {
            res.status(404).send('Comentário não encontrado.');
        }
    })
    .catch(erro => {
        res.status(500).send('Erro ao carregar a página de mensagens: ' + erro);
    });
});

app.get('/alterar/:id', (req, res) => {
    Post.findByPk(req.params.id)
    .then(post => {
        if (post) {
            res.render('alterar', { post: post.toJSON() });
        } else {
            res.status(404).send('Comentário não encontrado.');
        }
    })
    .catch(erro => {
        res.status(500).send('Erro ao carregar a página de alteração: ' + erro);
    });
});


// Rota para atualizar dados
app.post('/update', (req, res) => {
    Post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        observacao: req.body.observacao
    }, {
        where: { id: req.body.id }
    })
    .then(() => {
        
        res.redirect('/mensagens/'+req.body.id); // Redireciona para a página inicial após o update
    })
    .catch(erro => {
        res.send("Erro ao atualizar: " + erro);
    });
});


// Inicialização do servidor
app.listen(8081, () => { 
    console.log("Servidor Rodando");
});
