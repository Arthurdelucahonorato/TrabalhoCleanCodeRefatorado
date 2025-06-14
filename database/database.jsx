import { db } from './config';
import { carregarDadosDoUsuario, inserirOuAtualizarUsuario } from './variaveis';

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS usuario (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Nome TEXT,
        Idade TEXT,
        Altura TEXT,
        Peso TEXT,
        Genero TEXT,
        NivelDeAtividade TEXT,
        Gordura TEXT,
        Calorias TEXT,
        HistoricoMedico TEXT,
        Intolerancias TEXT,
        ExcluirAlimentos TEXT
      );`,
      [],
      (_, _result) => {
        console.log('Tabela de usuários criada com sucesso!');
      },
      (_, error) => {
        console.log('Erro ao criar tabela de usuários:', error);
      },
    );
  });

  carregarDadosDoUsuario();
  inserirOuAtualizarUsuario();
};

const refeicoes = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS refeicoes (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        texto TEXT,
        status char(1)
      );`,
      [],
      (_, _result) => {
        console.log('Tabela de reifecoes criada com sucesso!');
      },
      (_, error) => {
        console.log('Erro ao criar tabela de reifecoes:', error);
      },
    );
  });

};

const lista = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS lista (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                texto TEXT
            );`,
      [],
      (_, _result) => {
        console.log('Tabela de lista criada com sucesso!');
      },
      (_, error) => {
        console.log('Erro ao criar tabela de lista:', error);
      },
    );
  });
};


export { createTable, db, lista, refeicoes };
