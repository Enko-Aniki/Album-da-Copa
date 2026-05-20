/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useColorScheme } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

  const handlePress = (action: string) => {
    Alert.alert('Hub do Álbum', `Ação selecionada: ${action}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={statusBarStyle} />
      <View style={styles.container}>
        <Text style={styles.title}>Álbum Copa 2026</Text>
        

        <View style={styles.buttonGroup}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Ver álbum"
              onPress={() => handlePress('Ver álbum')}
              color="#1f8ef1"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Seleções"
              onPress={() => handlePress('Seleções')}
              color="#10ac84"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Progresso"
              onPress={() => handlePress('Progresso')}
              color="#f39c12"
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
