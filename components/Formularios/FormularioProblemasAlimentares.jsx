import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../../constants/Colors';
import {
  Bintolerancias,
  BsetIntolerancias,
  inserirOuAtualizarUsuario,
} from '../../database/variaveis';
import Botoes from '../Botoes';

const FormularioProblemasAlimentares = () => {
  const router = useRouter();
  const [problemasAlimentares, setProblemasAlimentares] =
    useState(Bintolerancias);

  useEffect(() => {
    inserirOuAtualizarUsuario();
  }, []);

  const handleSubmit = () => {
    BsetIntolerancias(problemasAlimentares);

    inserirOuAtualizarUsuario();

    router.push('PerfilUsuario/NaoIncluir');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerProblemasAlimentares}>
        <Text style={styles.label}>Alergias/Intolerâncias</Text>
        <TextInput
          value={problemasAlimentares.toString()}
          onChangeText={setProblemasAlimentares}
          style={styles.inputMaior}
          color={Colors.brancoBase}
          inputMode="text"
          placeholder="Ex: Lactose, glúten"
          placeholderTextColor={Colors.cinzaBase} 
          textAlignVertical="top" 
          multiline={true}
          numberOfLines={10}
        />
      </View>
      <View style={styles.botao}>
        <Botoes
          texto="Próximo"
          ativo={true}
          urlAnterior="PerfilUsuario/Historico"
          submit={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    gap: 12,
  },
  containerProblemasAlimentares: {
    flexDirection: 'column',
    paddingTop: 80,
  },
  botao: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: -450,
  },
  inputMaior: {
    height: 250,
    width: 300, 
    borderWidth: 1,
    borderRightColor: Colors.brancoBase,
    borderLeftColor: Colors.brancoBase,
    borderTopColor: Colors.brancoBase,
    borderBottomColor: Colors.brancoBase,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft: 18,
    paddingTop: 12,
    fontSize: 16,
  },

  label: {
    color: Colors.brancoBase,
    fontSize: 16,
    fontFamily: 'KodChasanMedium',
    paddingBottom: 30,
  },
});

export default FormularioProblemasAlimentares;
