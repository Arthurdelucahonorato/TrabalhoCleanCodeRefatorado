import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import FormularioHistorico from '../../../../components/Formularios/FormularioHistorico';
import Header from '../../../../components/Header';
import JanelaAtual from '../../../../components/JanelaAtual';
import Colors from '../../../../constants/Colors';

const Historico = () => {
  return (
    <LinearGradient
      colors={[Colors.grdienteInicio, Colors.gradienteFim]}
      style={styles.containerGlobal}
    >
      <View style={styles.container}>
        <Header ativo={true} />
        <JanelaAtual titulo="Histórico" />
        <FormularioHistorico />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
});

export default Historico;
