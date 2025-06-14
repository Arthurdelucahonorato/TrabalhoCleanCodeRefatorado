import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Cards from '../../../../components/Cards';
import Header from '../../../../components/Header';
import JanelaAtual from '../../../../components/JanelaAtual';
import Colors from '../../../../constants/Colors';

const GuiaAlimentar = () => {
  return (
    <LinearGradient
      colors={[Colors.grdienteInicio, Colors.gradienteFim]}
      style={styles.containerGlobal}
    >
      <View style={styles.container}>
        <Header ativo={true} />
        <JanelaAtual titulo="Guia Alimentar" />
        <Cards />
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
  },
});

export default GuiaAlimentar;
