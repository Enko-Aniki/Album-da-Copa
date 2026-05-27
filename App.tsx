/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useColorScheme } from 'react-native';
import Selecoes, { type Selecao } from './album-copa/paginas/Selecoes';
import Time from './album-copa/paginas/Time';
import Sorteio, { type SorteioCard } from './album-copa/paginas/Sorteio';
import Paises from './album-copa/paginas/Paises';

function App() {
  const [page, setPage] = useState<'home' | 'selecoes' | 'time' | 'sorteio' | 'paises'>('home');
  const [selectedTeam, setSelectedTeam] = useState<Selecao | null>(null);
  const [unlockedCards, setUnlockedCards] = useState<string[]>([]);
  const isDarkMode = useColorScheme() === 'dark';
  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

  const handleNewUnlocked = (cards: SorteioCard[]) => {
    setUnlockedCards((current) => {
      const next = new Set(current);
      cards.forEach((card) => next.add(card.id));
      return Array.from(next);
    });
  };

  if (page === 'time' && selectedTeam) {
    return (
      <Time
        selecao={selectedTeam}
        unlockedIds={unlockedCards}
        onBack={() => setPage('selecoes')}
      />
    );
  }

  if (page === 'sorteio') {
    return (
      <Sorteio
        onBack={() => setPage('home')}
        unlockedCount={unlockedCards.length}
        onOpen={(cards) => {
          handleNewUnlocked(cards);
          setPage('home');
        }}
      />
    );
  }

  if (page === 'paises') {
    return <Paises onBack={() => setPage('home')} />;
  }

  if (page === 'selecoes') {
    return (
      <Selecoes
        onBack={() => setPage('home')}
        onSelect={(team) => {
          setSelectedTeam(team);
          setPage('time');
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={statusBarStyle} />
      <View style={styles.container}>
        <Text style={styles.title}>Álbum Copa 2026</Text>

        <View style={styles.buttonGroup}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Ver Album"
              onPress={() => setPage('selecoes')}
              color="#10ac84"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Sorteio"
              onPress={() => setPage('sorteio')}
              color="#f39c12"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Paises Sede"
              onPress={() => setPage('paises')}
              color="#172ce7d8"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#111111',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#444444',
  },
  buttonGroup: {
    gap: 16,
  },
  buttonWrapper: {
    marginBottom: 14,
  },
});

export default App;
