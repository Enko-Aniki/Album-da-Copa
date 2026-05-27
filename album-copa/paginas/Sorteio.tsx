import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const selecoesData = require('../data/timesdacopa.json');
const { width } = Dimensions.get('window');
const CARD_WIDTH = 120;
const VISIBLE_COUNT = 7;

export type SorteioCard = {
  id: string;
  nome: string;
  posicao: string;
  pais: string;
};

type Props = {
  onBack: () => void;
  unlockedCount: number;
  onOpen: (cards: SorteioCard[]) => void;
};

const normalizeId = (pais: string, nome: string) => `${pais}:${nome}`;

const buildPlayerPool = () => {
  const selecoes: Array<{ pais: string; tecnico: string; jogadores: Array<{ nome: string; posicao: string }> }> = selecoesData.copa_do_mundo_2026?.selecoes || [];
  return selecoes.flatMap((team) =>
    team.jogadores.map((player) => ({
      id: normalizeId(team.pais, player.nome),
      nome: player.nome,
      posicao: player.posicao,
      pais: team.pais,
    })),
  );
};

const shuffle = <T,>(items: T[]) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const pickPack = (pool: SorteioCard[]) => {
  const shuffled = shuffle(pool);
  return shuffled.slice(0, 7);
};

export default function Sorteio({ onBack, unlockedCount, onOpen }: Props) {
  const allPlayers = useMemo(() => buildPlayerPool(), []);
  const [pack, setPack] = useState<SorteioCard[]>([]);
  const [running, setRunning] = useState(false);
  const [reelCards, setReelCards] = useState<SorteioCard[]>([]);
  const [feedback, setFeedback] = useState('Toque em Abrir Sorteio para desbloquear 7 figurinhas.');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCards, setModalCards] = useState<SorteioCard[]>([]);
  const animatedX = useRef(new Animated.Value(0)).current;

  const animateReel = (distance: number, onComplete: () => void) => {
    const totalDistance = -distance;
    const steps = [0.35, 0.7, 1].map((fraction) => ({
      toValue: totalDistance * fraction,
      duration: 500 + Math.round(500 * fraction),
    }));

    Animated.sequence(
      steps.map((step) =>
        Animated.timing(animatedX, {
          toValue: step.toValue,
          duration: step.duration,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ),
    ).start(onComplete);
  };

  const handleOpenPack = () => {
    if (running) {
      return;
    }

    const winners = pickPack(allPlayers);
    const winnerIds = new Set(winners.map((card) => card.id));
    const reelItems = [...shuffle(allPlayers.filter((card) => !winnerIds.has(card.id))).slice(0, 14), ...winners];

    setPack([]);
    setReelCards(reelItems);
    setRunning(true);
    setFeedback('Abrindo o sorteio...');
    animatedX.setValue(0);

    const maxDistance = Math.max(0, reelItems.length - VISIBLE_COUNT) * CARD_WIDTH;
    animateReel(maxDistance, () => {
      setRunning(false);
      setModalCards(winners);
      setModalVisible(true);
      setFeedback(`Você desbloqueou ${winners.length} figurinhas! Confirme para salvar no álbum.`);
    });
  };

  const handleConfirm = () => {
    setPack(modalCards);
    setModalVisible(false);
    setFeedback(`Figurinhas confirmadas: ${modalCards.length}`);
    onOpen(modalCards);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sorteio de Figurinhas</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.infoBar}>
        <Text style={styles.infoText}>Figurinhas desbloqueadas: {unlockedCount}</Text>
      </View>

      <View style={styles.animationArea}>
        <View style={styles.mask}>
          <Animated.View
            style={[
              styles.reel,
              { transform: [{ translateX: animatedX }] },
            ]}
          >
            {reelCards.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.reelCard}>
                <Text style={styles.reelCardTitle}>{item.pais}</Text>
                <Text style={styles.reelCardName} numberOfLines={1}>
                  {item.nome}
                </Text>
              </View>
            ))}
          </Animated.View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.actionButton, running && styles.disabledButton]}
        onPress={handleOpenPack}
        disabled={running}
      >
        <Text style={styles.actionText}>{running ? 'Abrindo...' : 'Abrir Sorteio'}</Text>
      </TouchableOpacity>

      <View style={styles.feedbackBox}>
        <Text style={styles.feedbackText}>{feedback}</Text>
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Figurinhas desbloqueadas</Text>
            <FlatList
              data={modalCards}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.modalCard}>
                  <Text style={styles.resultPais}>{item.pais}</Text>
                  <Text style={styles.resultName} numberOfLines={1}>
                    {item.nome}
                  </Text>
                  <Text style={styles.resultPosition}>{item.posicao}</Text>
                </View>
              )}
              contentContainerStyle={styles.resultList}
            />
            <Pressable style={styles.modalButton} onPress={handleConfirm}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {pack.length > 0 && (
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Você desbloqueou</Text>
          <FlatList
            data={pack}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.resultCard}>
                <Text style={styles.resultPais}>{item.pais}</Text>
                <Text style={styles.resultName} numberOfLines={1}>
                  {item.nome}
                </Text>
                <Text style={styles.resultPosition}>{item.posicao}</Text>
              </View>
            )}
            contentContainerStyle={styles.resultList}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7fb',
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
  infoBar: {
    margin: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e8e8f0',
  },
  infoText: {
    color: '#444444',
    fontSize: 14,
  },
  animationArea: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
  },
  mask: {
    width: Math.min(width - 32, VISIBLE_COUNT * CARD_WIDTH),
    height: 140,
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  reel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reelCard: {
    width: CARD_WIDTH,
    height: 140,
    padding: 12,
    marginRight: 8,
    borderRadius: 18,
    backgroundColor: '#f0f2ff',
    borderWidth: 1,
    borderColor: '#d7d8ea',
    justifyContent: 'center',
  },
  reelCardTitle: {
    fontSize: 11,
    color: '#6f73a3',
    marginBottom: 10,
    fontWeight: '700',
  },
  reelCardName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
  },
  actionButton: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10ac84',
  },
  disabledButton: {
    backgroundColor: '#aacbb1',
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  resultSection: {
    marginTop: 24,
  },
  resultTitle: {
    marginLeft: 16,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  resultList: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  resultCard: {
    width: 140,
    marginRight: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e8e8f0',
  },
  feedbackBox: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#eef7f0',
    borderWidth: 1,
    borderColor: '#d3e8d6',
  },
  feedbackText: {
    fontSize: 14,
    color: '#22663d',
  },
  resultPais: {
    fontSize: 11,
    color: '#6f73a3',
    marginBottom: 8,
    fontWeight: '700',
  },
  resultName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
  },
  resultPosition: {
    marginTop: 6,
    fontSize: 12,
    color: '#777777',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 14,
  },
  modalCard: {
    width: 130,
    marginRight: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#f8f8ff',
    borderWidth: 1,
    borderColor: '#e3e6f6',
  },
  modalButton: {
    marginTop: 16,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#10ac84',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
