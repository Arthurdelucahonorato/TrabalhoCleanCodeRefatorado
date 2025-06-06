import {
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
  inserirOuAtualizarUsuario
} from './variaveis';

class UserDataBuilder {
  constructor() {
    this.userData = {
      nome: '',
      idade: '',
      altura: '',
      peso: '',
      genero: '',
      nivelDeAtividade: '',
      gordura: '',
      calorias: '',
      historicoMedico: '',
      intolerancias: '',
      excluirAlimentos: ''
    };
  }

  withNome(nome) {
    this.userData.nome = nome || '';
    return this;
  }

  withIdade(idade) {
    const idadeNumber = parseInt(idade);
    this.userData.idade = (idadeNumber >= 0 && idadeNumber <= 150) ? idade.toString() : '';
    return this;
  }

  withAltura(altura) {
    const alturaNumber = parseFloat(altura);
    this.userData.altura = (alturaNumber >= 50 && alturaNumber <= 300) ? altura.toString() : '';
    return this;
  }

  withPeso(peso) {
    const pesoNumber = parseFloat(peso);
    this.userData.peso = (pesoNumber >= 20 && pesoNumber <= 500) ? peso.toString() : '';
    return this;
  }

  withGenero(genero) {
    const generosValidos = ['Masculino', 'Feminino'];
    this.userData.genero = generosValidos.includes(genero) ? genero : '';
    return this;
  }

  withNivelDeAtividade(nivel) {
    this.userData.nivelDeAtividade = nivel || '';
    return this;
  }

  withGordura(gordura) {
    this.userData.gordura = gordura ? gordura.toString() : '';
    return this;
  }

  withCalorias(calorias) {
    this.userData.calorias = calorias ? calorias.toString() : '';
    return this;
  }

  withHistoricoMedico(historico) {
    this.userData.historicoMedico = historico || '';
    return this;
  }

  withIntolerancias(intolerancias) {
    this.userData.intolerancias = intolerancias || '';
    return this;
  }

  withExcluirAlimentos(alimentos) {
    this.userData.excluirAlimentos = alimentos || '';
    return this;
  }

  withDadosBasicos({ nome, idade, altura, peso, genero }) {
    return this
      .withNome(nome)
      .withIdade(idade)
      .withAltura(altura)
      .withPeso(peso)
      .withGenero(genero);
  }

  withDadosFisicos({ gordura, calorias, nivelDeAtividade }) {
    return this
      .withGordura(gordura)
      .withCalorias(calorias)
      .withNivelDeAtividade(nivelDeAtividade);
  }

  withDadosMedicos({ historicoMedico, intolerancias, excluirAlimentos }) {
    return this
      .withHistoricoMedico(historicoMedico)
      .withIntolerancias(intolerancias)
      .withExcluirAlimentos(excluirAlimentos);
  }

  validate() {
    const errors = [];
    
    if (!this.userData.nome.trim()) {
      errors.push('Nome é obrigatório');
    }
    
    if (!this.userData.idade || parseInt(this.userData.idade) <= 0) {
      errors.push('Idade deve ser um número válido');
    }
    
    if (!this.userData.altura || parseFloat(this.userData.altura) <= 0) {
      errors.push('Altura deve ser um número válido');
    }
    
    if (!this.userData.peso || parseFloat(this.userData.peso) <= 0) {
      errors.push('Peso deve ser um número válido');
    }
    
    if (!this.userData.genero) {
      errors.push('Gênero é obrigatório');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  apply() {
    BsetNome(this.userData.nome);
    BsetIdade(this.userData.idade);
    BsetAltura(this.userData.altura);
    BsetPeso(this.userData.peso);
    BsetGenero(this.userData.genero);
    BsetNivelDeAtividade(this.userData.nivelDeAtividade);
    BsetGordura(this.userData.gordura);
    BsetCalorias(this.userData.calorias);
    BsetHistoricoMedico(this.userData.historicoMedico);
    BsetIntolerancias(this.userData.intolerancias);
    BsetExcluirAlimentos(this.userData.excluirAlimentos);
    
    return this;
  }

  async save() {
    const validation = this.validate();
    if (!validation.isValid) {
      throw new Error(`Dados inválidos: ${validation.errors.join(', ')}`);
    }
    
    this.apply();
    await inserirOuAtualizarUsuario();
    return this;
  }

  async build() {
    return await this.save();
  }

  getData() {
    return { ...this.userData };
  }

  clear() {
    Object.keys(this.userData).forEach(key => {
      this.userData[key] = '';
    });
    return this;
  }
}

export default UserDataBuilder;
