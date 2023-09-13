// server.js
const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const models=require('C:/Users/Lenovo/meuapp/models');
const nodemailer = require('nodemailer');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
let user=models.User;
let cadastro=models.cadastro
let orçamento=models.orçamento
let clientedomicilio=models.clientedomicilio


app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const userFound = await user.findOne({
      where: { email, senha }
    });

    if (userFound) {
      // Usuário encontrado, você pode enviar uma resposta JSON de sucesso aqui
      res.json({ message: 'Login bem-sucedido', user: userFound });
    } else {
      // Usuário não encontrado ou senha incorreta, você pode enviar uma resposta JSON de erro aqui
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login. Tente novamente mais tarde.' });
  }
});

app.post('/cadastrar-usuario', async (req, res) => {
  const { nome, estado, cidade, email, senha } = req.body;

  try {
    // Verifique se o email já existe no banco de dados
    const existingUser = await user.findOne({ where: { email } });

    if (existingUser) {
      // Se o email já existir, retorne um erro
      return res.status(400).json({ error: 'Este email já está registrado.' });
    }

    // Se o email não existe, crie um novo usuário
    const newUser = await user.create({
      nome,
      estado,
      cidade,
      email,
      senha,
    });

    console.log('Cadastro realizado com sucesso!', newUser);
    res.json({ message: 'Cadastro realizado com sucesso!', user: newUser });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário. Tente novamente mais tarde.' });
  }
});

app.post('/cadastro-tecnico', async (req, res) => {
  const { nome, cpf, endereco, cidade, estado, empresa, telefone, latitude, longitude } = req.body;

  try {
    // Verifique se o email já existe no banco de dados
    const existingUser = await cadastro.findOne({ where: { cpf } });

    if (existingUser) {
      // Se o cpf já existir, retorne um erro
      return res.status(400).json({ error: 'Este email já está registrado.' });
    }

    // Se o email não existe, crie um novo usuário
    const newUser1 = await cadastro.create({
      nome,
      cpf,
      endereco,
      cidade,
      estado,
      empresa,
      telefone,
      latitude,
      longitude,
      
    });

    console.log('Cadastro realizado com sucesso!', newUser1);
    res.json({ message: 'Cadastro realizado com sucesso!', user: newUser1 });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário. Tente novamente mais tarde.' });
  }
});

app.get('/marcadores', async (req, res) => {
  try {
    // Consulte o banco de dados para obter as informações de empresa, latitude e longitude de todos os usuários
    const usuarios = await cadastro.findAll({
      attributes: ['id', 'empresa', 'latitude', 'longitude'], // Especifique os campos que você deseja buscar
    });

    // Mapeie os resultados para um formato que você deseja (array de objetos JSON)
    const marcadores = usuarios.map((usuario) => ({
      id: usuario.id,
      empresa: usuario.empresa,
      latitude: usuario.latitude,
      longitude: usuario.longitude,
    }));

    res.json(marcadores);
  } catch (error) {
    console.error('Erro ao buscar marcadores:', error);
    res.status(500).json({ error: 'Erro ao buscar marcadores.' });
  }
});

app.post('/orcamento', async (req, res) => {
  const { nome, estado, cidade, telefone, email, modelo, ano } = req.body;

  try {
    // Verifique se o email já existe no banco de dados
    const existingUser = await orçamento.findOne({ where: { telefone } });

    if (existingUser) {
      // Se o email já existir, retorne um erro
      return res.status(400).json({ error: 'Este email já está registrado.' });
    }

    // Se o email não existe, crie um novo usuário
    const newUser = await orçamento.create({
      nome,
      estado,
      cidade,
      telefone,
      email,
      modelo,
      ano
    });

    console.log('Cadastro realizado com sucesso!', newUser);
    res.json({ message: 'Cadastro realizado com sucesso!', user: newUser });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário. Tente novamente mais tarde.' });
  }
});

app.post('/Domicilio', async (req, res) => {
  const { nome, cpf, endereco, estado, cidade, telefone, email  } = req.body;

  try {
    // Verifique se o email já existe no banco de dados
    const existingUser = await clientedomicilio.findOne({ where: { cpf } });

    if (existingUser) {
      // Se o cpf já existir, retorne um erro
      return res.status(400).json({ error: 'Este email já está registrado.' });
    }

    // Se o email não existe, crie um novo usuário
    const newUser1 = await clientedomicilio.create({
      nome,
      cpf,
      endereco,
      estado,
      cidade,
      telefone,
      email
      
    });

    console.log('Cadastro realizado com sucesso!', newUser1);
    res.json({ message: 'Cadastro realizado com sucesso!', user: newUser1 });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário. Tente novamente mais tarde.' });
  }
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, (req,res) => {
  console.log(`Servidor executando na porta ${PORT}`);
});
