import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../../constants/Colors';
import {
  Bexcluir_alimentos,
  BsetExcluirAlimentos,
  inserirOuAtualizarUsuario,
} from '../../database/variaveis';
import Botoes from '../Botoes';

const FormularioNaoIncluir = () => {
  const router = useRouter();
  const [naoIncluir, setNaoIncluir] = useState(Bexcluir_alimentos);

  useEffect(() => {
    inserirOuAtualizarUsuario();
  }, []);

  const handleSubmit = () => {
    BsetExcluirAlimentos(naoIncluir);

    inserirOuAtualizarUsuario();

    router.push('GuiaAlimentar');
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerNaoIncluir}>
        <Text style={styles.label}>Alimentos Para Não Incluir</Text>
        <TextInput
          value={naoIncluir.toString()}
          onChangeText={setNaoIncluir}
          style={styles.inputMaior}
          color={Colors.brancoBase}
          inputMode="text"
          placeholder="Ex: Melancia, aipim, uva"
          placeholderTextColor={Colors.cinzaBase} 
          textAlignVertical="top" 
        />
      </View>
      <View style={styles.botao}>
        <Botoes
          texto="Próximo"
          urlAnterior={'PerfilUsuario/ProblemasAlimentares'}
          ativo={true}
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
  containerNaoIncluir: {
    flexDirection: 'column',
    paddingTop: 80,
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
  botao: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: -450,
  },
  label: {
    color: Colors.brancoBase,
    fontSize: 16,
    fontFamily: 'KodChasanMedium',
    paddingBottom: 30,
  },
});

export default FormularioNaoIncluir;
