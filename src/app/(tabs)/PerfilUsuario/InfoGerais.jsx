import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import FormularioGeral from '../../../../components/Formularios/FormularioGeral';
import Header from '../../../../components/Header';
import Colors from '../../../../constants/Colors';

const InfoGerais = () => {
  return (
    <LinearGradient
      colors={[Colors.grdienteInicio, Colors.gradienteFim]}
      style={styles.containerGlobal}
    >
      <View style={styles.container}>
        <Header ativo={true} />
        <FormularioGeral />
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
    width: '80%',
    alignItems: 'center',
  },
  tituloPagina: {
    fontFamily: 'KodChasanBold',
    color: Colors.brancoBase,
    fontSize: 20,
  },
});
export default InfoGerais;
