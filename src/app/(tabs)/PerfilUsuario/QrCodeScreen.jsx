import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import Botoes from '../../../../components/Botoes';
import Header from '../../../../components/Header';
import Colors from '../../../../constants/Colors';

import { useRouter } from 'expo-router';

const QrCodeScreen = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('PerfilUsuario/InfoGerais');
  };
  return (
    <LinearGradient
      colors={[Colors.grdienteInicio, Colors.gradienteFim]}
      style={styles.containerGlobal}
    >
      <View style={styles.container}>
        <Header ativo={true} />
        <View style={styles.containerConteudo}>
          <Text style={styles.textoQrCode}>Alterar dados</Text>
          <Image
            style={styles.imagemQrCode}
            source={require('../../../../assets/images/ic_round-qr-code-2.png')}
          />
          <View style={styles.botaoQRCODE}>
            <Botoes
              texto="Ler QR Code"
              ativo={false}
              urlAnterior="PerfilUsuario/InfoGerais"
              submit={handleSubmit}
            />
          </View>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 70,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerConteudo: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 80,
    marginBottom: 48,
  },

  imagemQrCode: {
    height: 250,
    width: 250,
  },
  textoQrCode: {
    color: Colors.brancoBase,
    fontSize: 20,
    fontFamily: 'KodChasanBold',
    marginTop: 120,
  },
});

export default QrCodeScreen;
