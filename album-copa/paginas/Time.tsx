import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type Jogador = {
  nome: string;
  posicao: string;
};

export type Selecao = {
  pais: string;
  tecnico: string;
  jogadores: Jogador[];
};

type Props = {
  selecao: Selecao;
  unlockedIds: string[];
  onBack: () => void;
};

export default function Time({ selecao, onBack }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{selecao.pais}</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{selecao.pais}</Text>
        <Text style={styles.teamCoach}>Técnico: {selecao.tecnico}</Text>
      </View>

      <Text style={styles.sectionTitle}>Jogadores</Text>
      <FlatList
        data={selecao.jogadores}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoText}>+</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.nome}</Text>
              <Text style={styles.playerPosition}>{item.posicao}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  backButton: {
    width: 72,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9e9e9',
  },
  backButtonText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  headerPlaceholder: {
    width: 72,
    height: 36,
  },
  teamInfo: {
    padding: 16,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  teamName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 8,
  },
  teamCoach: {
    fontSize: 14,
    color: '#666666',
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  photoPlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: '#f0f0f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  photoText: {
    fontSize: 32,
    color: '#b0b0b8',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  playerPosition: {
    fontSize: 12,
    color: '#777777',
  },
});
