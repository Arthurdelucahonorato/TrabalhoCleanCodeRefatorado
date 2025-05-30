import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/Header';
import Colors from '../../../constants/Colors';
import { buscaLista } from '../../../database/buscaLista';


const ListaCompras = () => {
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      console.log('Buscando lista ...');
      const data = await buscaLista();
      console.log(data);
      setLista(data);
    } catch (error) {
      console.error('Erro ao carregar dados da lista:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.grdienteInicio, Colors.gradienteFim]}
      style={styles.containerGlobal}
    >
      <View style={styles.container}>
        <Header ativo={true} />
        <Text style={styles.tituloListaCompras}>Lista de Compras</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.brancoBase} />
          <Text style={styles.TextoCarregando}>Carregando lista...</Text>
        </View>
      ) : !lista || !lista.texto ? (
        <Text style={styles.TextoCarregando}>Lista vazia.</Text>
      ) : (
        <View style={styles.ScrollViewContainer}>
          <ScrollView>
            <Text style={styles.TextoLista}>{lista.texto}</Text>
          </ScrollView>
        </View>
      )}
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
  },
  tituloListaCompras: {
    color: Colors.brancoBase,
    paddingTop: 170,
    fontSize: 20,
    fontFamily: 'KodChasanBold',
  },
  ScrollViewContainer: {
    borderWidth: 1,
    borderColor: Colors.brancoBase,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    height: '60%',
    width: '80%',
    padding: 30,
    marginBottom: 60,
  },
  TextoLista: {
    color: Colors.brancoBase,
    fontSize: 16,
    fontFamily: 'KodChasanMedium',
    margin: 10,
  },
  TextoCarregando: {
    color: Colors.cinzaBase,
    fontSize: 14,
    fontFamily: 'KodChasanMedium',
    marginTop: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default ListaCompras;
