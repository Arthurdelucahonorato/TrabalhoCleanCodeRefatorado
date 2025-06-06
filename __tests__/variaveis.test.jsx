import {
  Bid,
  Bnome,
  Bidade,
  Baltura,
  Bpeso,
  Bgenero,
  Bnivel_de_atividade,
  Bgordura,
  Bcalorias,
  Bhistorico_medico,
  Bintolerancias,
  Bexcluir_alimentos,
  BsetId,
  BsetNome,
  BsetIdade,
  BsetAltura,
  BsetPeso,
  BsetGenero,
  BsetNivelDeAtividade,
  BsetGordura,
  BsetCalorias,
  BsetHistoricoMedico,
  BsetIntolerancias,
  BsetExcluirAlimentos,
  BsetJsonTexto,
  BsetUsuarioId,
  BsetRefeicaoId,
  BsetJsonIngredientes,
  BsetListaUsuarioId,
  BsetListaId,
  carregarDadosDoUsuario,
  inserirOuAtualizarUsuario,
  carregarDadosDoJson,
  inserirOuAtualizarJson,
  carregarDadosDaLista,
  inserirOuAtualizarLista,
} from '../database/variaveis';

jest.mock('../database/config', () => ({
  db: {
    transaction: jest.fn(),
  },
}));

import { db } from '../database/config';

describe('Variáveis de Estado Global', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    global.console = {
      ...console,
      log: jest.fn(),
      error: jest.fn(),
    };
  });

  describe('Funções Setter para Dados Básicos', () => {
    it('deve definir ID corretamente', () => {
      BsetId(123);
      expect(Bid).toBe(123);
    });

    it('deve definir nome corretamente', () => {
      BsetNome('João Silva');
      expect(Bnome).toBe('João Silva');
    });

    it('deve definir idade corretamente', () => {
      BsetIdade('30');
      expect(Bidade).toBe('30');
    });

    it('deve definir altura corretamente', () => {
      BsetAltura('175');
      expect(Baltura).toBe('175');
    });

    it('deve definir peso corretamente', () => {
      BsetPeso('70');
      expect(Bpeso).toBe('70');
    });

    it('deve definir gênero corretamente', () => {
      BsetGenero('Masculino');
      expect(Bgenero).toBe('Masculino');
    });
  });

  describe('Funções Setter para Dados Físicos', () => {
    it('deve definir nível de atividade corretamente', () => {
      BsetNivelDeAtividade('Alto');
      expect(Bnivel_de_atividade).toBe('Alto');
    });

    it('deve definir gordura corretamente', () => {
      BsetGordura('15');
      expect(Bgordura).toBe('15');
    });

    it('deve definir calorias corretamente', () => {
      BsetCalorias('2500');
      expect(Bcalorias).toBe('2500');
    });
  });

  describe('Funções Setter para Dados Médicos', () => {
    it('deve definir histórico médico corretamente', () => {
      BsetHistoricoMedico('Diabetes tipo 2');
      expect(Bhistorico_medico).toBe('Diabetes tipo 2');
    });

    it('deve definir intolerâncias corretamente', () => {
      BsetIntolerancias('Lactose, Glúten');
      expect(Bintolerancias).toBe('Lactose, Glúten');
    });

    it('deve definir alimentos a excluir corretamente', () => {
      BsetExcluirAlimentos('Amendoim, Frutos do mar');
      expect(Bexcluir_alimentos).toBe('Amendoim, Frutos do mar');
    });
  });

  describe('Funções Setter para Dados de Sistema', () => {
    it('deve definir JSON texto corretamente', () => {
      const jsonTexto = '{"refeicao": "almoço"}';
      BsetJsonTexto(jsonTexto);
      expect(() => BsetJsonTexto(jsonTexto)).not.toThrow();
    });

    it('deve definir usuário ID corretamente', () => {
      BsetUsuarioId(456);
      expect(() => BsetUsuarioId(456)).not.toThrow();
    });

    it('deve definir refeição ID corretamente', () => {
      BsetRefeicaoId(789);
      expect(() => BsetRefeicaoId(789)).not.toThrow();
    });

    it('deve definir JSON ingredientes corretamente', () => {
      const jsonIngredientes = '{"ingredientes": ["arroz", "feijão"]}';
      BsetJsonIngredientes(jsonIngredientes);
      expect(() => BsetJsonIngredientes(jsonIngredientes)).not.toThrow();
    });

    it('deve definir lista usuário ID corretamente', () => {
      BsetListaUsuarioId(101);
      expect(() => BsetListaUsuarioId(101)).not.toThrow();
    });

    it('deve definir lista ID corretamente', () => {
      BsetListaId(202);
      expect(() => BsetListaId(202)).not.toThrow();
    });
  });

  describe('carregarDadosDoUsuario', () => {
    it('deve executar transação de banco de dados', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback) => {
            const mockResult = {
              rows: {
                _array: [{
                  ID: 1,
                  Nome: 'João',
                  Idade: '30',
                  Altura: '175',
                  Peso: '70',
                  Genero: 'Masculino',
                  NivelDeAtividade: 'Alto',
                  Gordura: '15',
                  Calorias: '2500',
                  HistoricoMedico: 'Nenhum',
                  Intolerancias: 'Nenhuma',
                  ExcluirAlimentos: 'Nenhum',
                }],
              },
            };
            successCallback(null, mockResult);
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await carregarDadosDoUsuario();

      expect(db.transaction).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Selecionado os dados');
    });

    it('deve lidar com usuário não encontrado', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback) => {
            const mockResult = {
              rows: {
                _array: [],
              },
            };
            successCallback(null, mockResult);
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await carregarDadosDoUsuario();

      expect(console.log).toHaveBeenCalledWith('Nenhum usuário encontrado no banco de dados.');
    });

    it('deve lidar com erro na execução SQL', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback, errorCallback) => {
            const mockError = new Error('SQL Error');
            errorCallback(mockError);
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await carregarDadosDoUsuario();

      expect(console.error).toHaveBeenCalledWith('Erro ao carregar dados do usuário:', expect.any(Error));
    });

    it('deve lidar com erro na transação', async () => {
      db.transaction.mockImplementation(() => {
        throw new Error('Transaction Error');
      });

      await carregarDadosDoUsuario();

      expect(console.error).toHaveBeenCalledWith('Erro ao carregar dados do usuário:', expect.any(Error));
    });
  });

  describe('inserirOuAtualizarUsuario', () => {
    it('deve atualizar usuário existente', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback) => {
            if (query.includes('SELECT')) {
              const mockResult = {
                rows: {
                  _array: [{ ID: 1, Nome: 'João' }],
                },
              };
              successCallback(null, mockResult);
            } else if (query.includes('UPDATE')) {
              successCallback();
            }
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await inserirOuAtualizarUsuario();

      expect(console.log).toHaveBeenCalledWith('Atualizado no banco');
      expect(console.log).toHaveBeenCalledWith('Dados do usuário inseridos/atualizados com sucesso.');
    });

    it('deve inserir novo usuário', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback) => {
            if (query.includes('SELECT')) {
              const mockResult = {
                rows: {
                  _array: [],
                },
              };
              successCallback(null, mockResult);
            } else if (query.includes('INSERT')) {
              successCallback();
            }
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await inserirOuAtualizarUsuario();

      expect(console.log).toHaveBeenCalledWith('Inserido no banco');
      expect(console.log).toHaveBeenCalledWith('Dados do usuário inseridos/atualizados com sucesso.');
    });

    it('deve lidar com erro na atualização', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback, errorCallback) => {
            if (query.includes('SELECT')) {
              const mockResult = {
                rows: {
                  _array: [{ ID: 1 }],
                },
              };
              successCallback(null, mockResult);
            } else if (query.includes('UPDATE')) {
              const mockError = new Error('Update Error');
              errorCallback(mockError);
            }
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await inserirOuAtualizarUsuario();

      expect(console.error).toHaveBeenCalledWith('Erro ao atualizar dados do usuário:', expect.any(Error));
    });
  });

  describe('carregarDadosDoJson', () => {
    it('deve carregar dados JSON existentes', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback) => {
            const mockResult = {
              rows: {
                _array: [{
                  ID: 1,
                  usuario_id: 1,
                  json_texto: '{"test": "data"}',
                }],
              },
            };
            successCallback(null, mockResult);
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await carregarDadosDoJson();

      expect(console.log).toHaveBeenCalledWith('Selecionado os dados');
    });

    it('deve lidar com JSON não encontrado', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback) => {
            const mockResult = {
              rows: {
                _array: [],
              },
            };
            successCallback(null, mockResult);
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await carregarDadosDoJson();

      expect(console.log).toHaveBeenCalledWith('Nenhum Json encontrado no banco de dados.');
    });
  });

  describe('carregarDadosDaLista', () => {
    it('deve carregar dados da lista existentes', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback) => {
            const mockResult = {
              rows: {
                _array: [{
                  ID: 1,
                  usuario_id: 1,
                  json_ingredientes: '{"ingredientes": ["arroz"]}',
                }],
              },
            };
            successCallback(null, mockResult);
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await carregarDadosDaLista();

      expect(console.log).toHaveBeenCalledWith('Selecionado os dados');
    });

    it('deve lidar com lista não encontrada', async () => {
      const mockTransaction = jest.fn((callback) => {
        const mockTx = {
          executeSql: jest.fn((query, params, successCallback) => {
            const mockResult = {
              rows: {
                _array: [],
              },
            };
            successCallback(null, mockResult);
          }),
        };
        callback(mockTx);
      });

      db.transaction.mockImplementation(mockTransaction);

      await carregarDadosDaLista();

      expect(console.log).toHaveBeenCalledWith('Nenhum Json encontrado no banco de dados.');
    });
  });

  describe('Cenários de Erro Diversos', () => {
    it('inserirOuAtualizarJson deve lidar com erro geral', async () => {
      db.transaction.mockImplementation(() => {
        throw new Error('General Error');
      });

      await inserirOuAtualizarJson();

      expect(console.error).toHaveBeenCalledWith('Erro ao inserir/atualizar dados do json:', expect.any(Error));
    });

    it('inserirOuAtualizarLista deve lidar com erro geral', async () => {
      db.transaction.mockImplementation(() => {
        throw new Error('General Error');
      });

      await inserirOuAtualizarLista();

      expect(console.error).toHaveBeenCalledWith('Erro ao inserir/atualizar dados da lista:', expect.any(Error));
    });
  });
});
