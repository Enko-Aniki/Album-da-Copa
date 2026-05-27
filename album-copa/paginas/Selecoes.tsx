import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const selecoesData = require('../data/timesdacopa.json');

const brasoes: Record<string, any> = {
  alemanha: require('../imagens/Brasoes/alemanha.png'),
  brasil: require('../imagens/Brasoes/brasil.jpg'),
  costa_do_marfim: require('../imagens/Brasoes/costa_mar.png'),
  curacao: require('../imagens/Brasoes/curacao.png'),
  equador: require('../imagens/Brasoes/ecuador.png'),
  escocia: require('../imagens/Brasoes/escocia.png'),
  franca: require('../imagens/Brasoes/fraca.png'),
  haiti: require('../imagens/Brasoes/haiti.jpg'),
  iraque: require('../imagens/Brasoes/iraq.png'),
  marrocos: require('../imagens/Brasoes/marrocos.png'),
  noruega: require('../imagens/Brasoes/noruega.jpg'),
  senegal: require('../imagens/Brasoes/senegal.png'),
};

const getIconKey = (pais: string) =>
  pais
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '');

export type Selecao = {
  pais: string;
  tecnico: string;
  jogadores: Array<{ nome: string; posicao: string }>;
};

type Props = {
  onBack: () => void;
  onSelect: (team: Selecao) => void;
};

export default function Selecoes({ onBack, onSelect }: Props) {
  const selecoes: Selecao[] = selecoesData.copa_do_mundo_2026?.selecoes || [];

  const renderItem = ({ item }: { item: Selecao }) => {
    const icon = brasoes[getIconKey(item.pais)] ?? null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onSelect(item)}
        activeOpacity={0.8}
      >
        {icon ? (
          <Image source={icon} style={styles.flag} resizeMode="contain" />
        ) : (
          <View style={styles.flagPlaceholder}>
            <Text style={styles.flagPlaceholderText}>?</Text>
          </View>
        )}
        <Text style={styles.name} numberOfLines={1}>
          {item.pais}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          Tecnico: {item.tecnico}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Selecoes da Copa</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <FlatList
        data={selecoes}
        keyExtractor={(item) => item.pais}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9e9e9',
  },
  backButtonText: {
    fontSize: 13,
    color: '#333333',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  headerPlaceholder: {
    width: 36,
    height: 36,
  },
  list: {
    padding: 16,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  flag: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  flagPlaceholder: {
    width: 80,
    height: 80,
    marginBottom: 12,
    backgroundColor: '#d8d8d8',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagPlaceholderText: {
    fontSize: 28,
    color: '#777777',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
  },
});
