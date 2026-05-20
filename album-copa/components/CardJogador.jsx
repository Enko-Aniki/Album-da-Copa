import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, fonts, spacing, radius } from './theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.md * 2 - spacing.sm) / 2;

/**
 * CardJogador — card de jogador estilo figurinha FIFA Ultimate Team
 *
 * Props:
 *  jogador   object  — dados do jogador do JSON
 *    .id           string
 *    .nome         string   — ex: "Pelé"
 *    .apelido      string   — ex: "O Rei"
 *    .foto         string   — URL da foto
 *    .selecao      string   — ex: "Brasil"
 *    .posicao      string   — ex: "Atacante"
 *    .rating       number   — 0-99
 *    .stats        object   — { gols, assistencias, copas }
 *    .corPrimaria  string   — cor hex da seleção (opcional)
 *  onPress   func    — ação ao tocar
 *  coletado  bool    — figurinha coletada
 */
export default function CardJogador({ jogador = {}, onPress, coletado = true }) {
  const {
    nome = 'Jogador',
    apelido = '',
    foto,
    selecao = '',
    posicao = '',
    rating = 0,
    stats = {},
    corPrimaria = colors.primary,
  } = jogador;

  const ratingColor =
    rating >= 90 ? colors.secondary :
    rating >= 80 ? colors.primary :
    colors.textSecondary;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityLabel={`Jogador ${nome}, ${posicao}, rating ${rating}`}
      accessibilityRole="button"
    >
      {/* Fundo degradê da cor da seleção */}
      <View style={[styles.topBg, { backgroundColor: corPrimaria + '44' }]} />

      {/* Rating badge */}
      <View style={[styles.ratingBadge, { borderColor: ratingColor + '88' }]}>
        <Text style={[styles.ratingText, { color: ratingColor }]}>{rating}</Text>
        <Text style={styles.posicaoText}>{posicao?.slice(0, 3).toUpperCase()}</Text>
      </View>

      {/* Overlay não coletado */}
      {!coletado && <View style={styles.overlay}><Text style={styles.overlayText}>?</Text></View>}

      {/* Foto */}
      <View style={styles.fotoContainer}>
        {foto ? (
          <Image
            source={{ uri: foto }}
            style={[styles.foto, !coletado && styles.fotoGray]}
            resizeMode="cover"
            accessibilityLabel={`Foto de ${nome}`}
          />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Text style={styles.fotoEmoji}>👤</Text>
          </View>
        )}
      </View>

      {/* Linha divisória colorida */}
      <View style={[styles.divider, { backgroundColor: corPrimaria }]} />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>{apelido || nome}</Text>
        <Text style={styles.selecao} numberOfLines={1}>{selecao}</Text>
      </View>

      {/* Mini stats */}
      {coletado && (stats.gols !== undefined || stats.copas !== undefined) && (
        <View style={styles.statsRow}>
          {stats.gols !== undefined && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.gols}</Text>
              <Text style={styles.statLabel}>GOL</Text>
            </View>
          )}
          {stats.assistencias !== undefined && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.assistencias}</Text>
              <Text style={styles.statLabel}>ASS</Text>
            </View>
          )}
          {stats.copas !== undefined && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.copas}</Text>
              <Text style={styles.statLabel}>COP</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: spacing.sm,
  },
  topBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 100,
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    alignItems: 'center',
    backgroundColor: colors.dark + 'CC',
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 10,
  },
  ratingText: {
    ...fonts.heading,
    fontSize: 14,
    lineHeight: 16,
  },
  posicaoText: {
    ...fonts.label,
    fontSize: 7,
    color: colors.textMuted,
    lineHeight: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark + 'CC',
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
  },
  overlayText: {
    ...fonts.heading,
    fontSize: 40,
    color: colors.textMuted,
  },
  fotoContainer: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  foto: {
    width: CARD_WIDTH - 20,
    height: 90,
    borderRadius: radius.sm,
  },
  fotoGray: {
    opacity: 0.15,
  },
  fotoPlaceholder: {
    width: CARD_WIDTH - 20,
    height: 90,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoEmoji: {
    fontSize: 36,
  },
  divider: {
    height: 2,
    marginHorizontal: spacing.sm,
    borderRadius: 1,
    opacity: 0.8,
  },
  info: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.xs,
    paddingBottom: 2,
  },
  nome: {
    ...fonts.subheading,
    fontSize: 13,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  selecao: {
    ...fonts.label,
    fontSize: 9,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xs,
    paddingBottom: spacing.sm,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    marginTop: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...fonts.subheading,
    fontSize: 13,
    color: colors.secondary,
    lineHeight: 16,
  },
  statLabel: {
    ...fonts.label,
    fontSize: 7,
    color: colors.textMuted,
  },
});