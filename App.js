import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Alert, SafeAreaView } from 'react-native';
import Header from './components/Header';

const imagens = [
  require('./assets/gato1.jpg'),
  require('./assets/gato2.jpg'),
  require('./assets/gato3.jpg'),
  require('./assets/gato4.jpg'),
];

const App = () => {
  const [cartas, setCartas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [pareadas, setPareadas] = useState([]);

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const cartasIniciais = [];
    const tempImagens = [...imagens, ...imagens]; 
    tempImagens.sort(() => Math.random() - 0.5); 
    for (let i = 0; i < tempImagens.length; i++) {
      cartasIniciais.push({ id: i, image: tempImagens[i], flipped: false });
    }
    setCartas(cartasIniciais);
    setSelecionadas([]);
    setPareadas([]);
  };

  const virarCarta = (cartaId) => {
    if (selecionadas.length == 2) return;
    const novasCartas = [...cartas];
    const index = novasCartas.findIndex((carta) => carta.id === cartaId);
    novasCartas[index].flipped = true;
    setCartas(novasCartas);
    setSelecionadas([...selecionadas, cartaId]);

    if (selecionadas.length === 1) {
      if (novasCartas[selecionadas[0]].image === novasCartas[index].image) {
        setPareadas([...pareadas, selecionadas[0], cartaId]);
        setSelecionadas([]);
      } else {
        setTimeout(() => {
          const cartasResetadas = [...novasCartas];
          cartasResetadas[selecionadas[0]].flipped = false;
          cartasResetadas[index].flipped = false;
          setCartas(cartasResetadas);
          setSelecionadas([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (pareadas.length === imagens.length * 2) {
      Alert.alert('Parabéns!', 'Você completou o jogo!', [{ text: 'Novo Jogo', onPress: iniciarJogo }]);
    }
  }, [pareadas]);

  return (
    <SafeAreaView style={estilos.safe}>
      <View>
        <Header/>
        <View style={estilos.grade}>
          {cartas.map((carta) => (
            <TouchableOpacity
              key={carta.id}
              style={estilos.carta}
              onPress={() => virarCarta(carta.id)}
              disabled={selecionadas.includes(carta.id) || pareadas.includes(carta.id)}
            >
              {carta.flipped || pareadas.includes(carta.id) ? (
                <Image source={carta.image} style={estilos.imagem} />
              ) : (
                <Image source={require('./assets/back.png')} style={estilos.imagem} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  safe: {
    backgroundColor: 'darkmagenta',
    height: '100%'
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50
  },
  carta: {
    width: 150,
    height: 150,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  imagem: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: '8px',
  },
});

export default App;
