import UserDataBuilder from '../database/UserDataBuilder';
import * as variaveis from '../database/variaveis';

jest.mock('../database/variaveis', () => ({
  BsetNome: jest.fn(),
  BsetIdade: jest.fn(),
  BsetAltura: jest.fn(),
  BsetPeso: jest.fn(),
  BsetGenero: jest.fn(),
  BsetNivelDeAtividade: jest.fn(),
  BsetGordura: jest.fn(),
  BsetCalorias: jest.fn(),
  BsetHistoricoMedico: jest.fn(),
  BsetIntolerancias: jest.fn(),
  BsetExcluirAlimentos: jest.fn(),
  inserirOuAtualizarUsuario: jest.fn().mockResolvedValue(true)
}));

describe('UserDataBuilder - Interface Fluente', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve construir dados básicos do usuário com interface fluente', () => {
    const builder = new UserDataBuilder()
      .withNome('João Silva')
      .withIdade('30')
      .withAltura('175')
      .withPeso('70')
      .withGenero('Masculino');

    const data = builder.getData();

    expect(data.nome).toBe('João Silva');
    expect(data.idade).toBe('30');
    expect(data.altura).toBe('175');
    expect(data.peso).toBe('70');
    expect(data.genero).toBe('Masculino');
  });

  test('deve usar método withDadosBasicos para configurar múltiplos campos', () => {
    const dadosBasicos = {
      nome: 'Maria Santos',
      idade: '25',
      altura: '165',
      peso: '60',
      genero: 'Feminino'
    };

    const builder = new UserDataBuilder()
      .withDadosBasicos(dadosBasicos);

    const data = builder.getData();

    expect(data.nome).toBe('Maria Santos');
    expect(data.idade).toBe('25');
    expect(data.altura).toBe('165');
    expect(data.peso).toBe('60');
    expect(data.genero).toBe('Feminino');
  });

  test('deve configurar dados físicos com interface fluente', () => {
    const dadosFisicos = {
      gordura: '15',
      calorias: '2000',
      nivelDeAtividade: 'Moderado'
    };

    const builder = new UserDataBuilder()
      .withDadosFisicos(dadosFisicos);

    const data = builder.getData();

    expect(data.gordura).toBe('15');
    expect(data.calorias).toBe('2000');
    expect(data.nivelDeAtividade).toBe('Moderado');
  });

  test('deve configurar dados médicos com interface fluente', () => {
    const dadosMedicos = {
      historicoMedico: 'Diabetes tipo 2',
      intolerancias: 'Lactose',
      excluirAlimentos: 'Nozes'
    };

    const builder = new UserDataBuilder()
      .withDadosMedicos(dadosMedicos);

    const data = builder.getData();

    expect(data.historicoMedico).toBe('Diabetes tipo 2');
    expect(data.intolerancias).toBe('Lactose');
    expect(data.excluirAlimentos).toBe('Nozes');
  });

  test('deve validar idade dentro dos limites', () => {
    const builder1 = new UserDataBuilder().withIdade('25');
    const builder2 = new UserDataBuilder().withIdade('200');
    const builder3 = new UserDataBuilder().withIdade('-5');

    expect(builder1.getData().idade).toBe('25');
    expect(builder2.getData().idade).toBe('');
    expect(builder3.getData().idade).toBe('');
  });

  test('deve validar altura dentro dos limites', () => {
    const builder1 = new UserDataBuilder().withAltura('175');
    const builder2 = new UserDataBuilder().withAltura('400');
    const builder3 = new UserDataBuilder().withAltura('30');

    expect(builder1.getData().altura).toBe('175');
    expect(builder2.getData().altura).toBe('');
    expect(builder3.getData().altura).toBe('');
  });

  test('deve validar peso dentro dos limites', () => {
    const builder1 = new UserDataBuilder().withPeso('70');
    const builder2 = new UserDataBuilder().withPeso('600');
    const builder3 = new UserDataBuilder().withPeso('10');

    expect(builder1.getData().peso).toBe('70');
    expect(builder2.getData().peso).toBe('');
    expect(builder3.getData().peso).toBe('');
  });

  test('deve validar gênero', () => {
    const builder1 = new UserDataBuilder().withGenero('Masculino');
    const builder2 = new UserDataBuilder().withGenero('Feminino');
    const builder3 = new UserDataBuilder().withGenero('Outro');

    expect(builder1.getData().genero).toBe('Masculino');
    expect(builder2.getData().genero).toBe('Feminino');
    expect(builder3.getData().genero).toBe('');
  });

  test('deve validar dados obrigatórios', () => {
    const builderValido = new UserDataBuilder()
      .withNome('João')
      .withIdade('30')
      .withAltura('175')
      .withPeso('70')
      .withGenero('Masculino');

    const builderInvalido = new UserDataBuilder()
      .withNome('')
      .withIdade('0')
      .withAltura('')
      .withPeso('')
      .withGenero('');

    const validacaoValida = builderValido.validate();
    const validacaoInvalida = builderInvalido.validate();

    expect(validacaoValida.isValid).toBe(true);
    expect(validacaoValida.errors).toHaveLength(0);

    expect(validacaoInvalida.isValid).toBe(false);
    expect(validacaoInvalida.errors.length).toBeGreaterThan(0);
  });

  test('deve aplicar dados às variáveis globais', () => {
    const builder = new UserDataBuilder()
      .withNome('João')
      .withIdade('30')
      .withAltura('175')
      .withPeso('70')
      .withGenero('Masculino');

    builder.apply();

    expect(variaveis.BsetNome).toHaveBeenCalledWith('João');
    expect(variaveis.BsetIdade).toHaveBeenCalledWith('30');
    expect(variaveis.BsetAltura).toHaveBeenCalledWith('175');
    expect(variaveis.BsetPeso).toHaveBeenCalledWith('70');
    expect(variaveis.BsetGenero).toHaveBeenCalledWith('Masculino');
  });

  test('deve salvar dados válidos no banco', async () => {
    const builder = new UserDataBuilder()
      .withNome('João')
      .withIdade('30')
      .withAltura('175')
      .withPeso('70')
      .withGenero('Masculino');

    await builder.save();

    expect(variaveis.inserirOuAtualizarUsuario).toHaveBeenCalled();
  });

  test('deve rejeitar salvamento de dados inválidos', async () => {
    const builder = new UserDataBuilder()
      .withNome('')
      .withIdade('0');

    await expect(builder.save()).rejects.toThrow('Dados inválidos');
    expect(variaveis.inserirOuAtualizarUsuario).not.toHaveBeenCalled();
  });

  test('deve permitir build completo com dados válidos', async () => {
    const builder = new UserDataBuilder()
      .withNome('João')
      .withIdade('30')
      .withAltura('175')
      .withPeso('70')
      .withGenero('Masculino');

    const result = await builder.build();

    expect(result).toBeInstanceOf(UserDataBuilder);
    expect(variaveis.inserirOuAtualizarUsuario).toHaveBeenCalled();
  });

  test('deve limpar todos os dados', () => {
    const builder = new UserDataBuilder()
      .withNome('João')
      .withIdade('30')
      .clear();

    const data = builder.getData();

    expect(data.nome).toBe('');
    expect(data.idade).toBe('');
    expect(data.altura).toBe('');
    expect(data.peso).toBe('');
    expect(data.genero).toBe('');
  });

  test('deve permitir encadeamento completo de métodos', async () => {
    const builder = await new UserDataBuilder()
      .withNome('João Silva')
      .withIdade('30')
      .withAltura('175')
      .withPeso('70')
      .withGenero('Masculino')
      .withGordura('15')
      .withCalorias('2000')
      .withHistoricoMedico('Nenhum')
      .build();

    expect(builder).toBeInstanceOf(UserDataBuilder);
    expect(variaveis.inserirOuAtualizarUsuario).toHaveBeenCalled();
  });

  test('deve converter números para string corretamente', () => {
    const builder = new UserDataBuilder()
      .withIdade(30)
      .withAltura(175.5)
      .withPeso(70.2)
      .withGordura(15)
      .withCalorias(2000);

    const data = builder.getData();

    expect(data.idade).toBe('30');
    expect(data.altura).toBe('175.5');
    expect(data.peso).toBe('70.2');
    expect(data.gordura).toBe('15');
    expect(data.calorias).toBe('2000');
  });
});
