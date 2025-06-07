import { View, Text, StyleSheet } from 'react-native';


export default function Header() {
  return(

  <View style={styles.Header}>
    <Text style={styles.Text}>JOGO DA MEMORIA </Text>
  </View>

  );
}
const styles = StyleSheet.create({
  Header: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    background: 'darkmagenta',
  },
  Text:{
    fontSize: 20,
    color: 'white',
    marginBottom: 15,
    marginTop:20,
     fontWeight: 'bold',
  }
})