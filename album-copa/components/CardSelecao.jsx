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
 * CardSelecao — card de seleção no álbum
 *
 * Props:
 *  selecao   object  — dados da seleção do JSON
 *    .id           string
 *    .nome         string   — ex: "Brasil"
 *    .bandeira     string   — URL da imagem da bandeira
 *    .continente   string   — ex: "América do Sul"
 *    .titulos      number   — quantidade de títulos mundiais
 *    .corPrimaria  string   — cor hex da seleção (opcional)
 *  onPress   func    — ação ao tocar no card
 *  coletado  bool    — se a figurinha já foi coletada
 */
export default function CardSelecao({ selecao = {}, onPress, coletado = true }) {
  const {
    nome = 'Seleção',
    bandeira,
    continente = '',
    titulos = 0,
    corPrimaria = colors.primary,
  } = selecao;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityLabel={`Seleção ${nome}, ${titulos} título${titulos !== 1 ? 's' : ''}`}
      accessibilityRole="button"
    >
      {/* Fundo com cor da seleção */}
      <View style={[styles.colorBand, { backgroundColor: corPrimaria + '33' }]} />

      {/* Badge de títulos */}
      {titulos > 0 && (
        <View style={styles.titulosBadge}>
          <Text style={styles.titulosIcon}>★</Text>
          <Text style={styles.titulosText}>{titulos}x</Text>
        </View>
      )}

      {/* Overlay "não coletado" */}
      {!coletado && <View style={styles.overlay} />}

      {/* Bandeira */}
      <View style={styles.bandeiraContainer}>
        {bandeira ? (
          <Image
            source={{ uri: bandeira }}
            style={[styles.bandeira, !coletado && styles.bandeiraGray]}
            resizeMode="cover"
            accessibilityLabel={`Bandeira de ${nome}`}
          />
        ) : (
          <View style={styles.bandeiraPlaceholder}>
            <Text style={styles.bandeiraEmoji}>🏳️</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>
          {nome}
        </Text>
        <Text style={styles.continente} numberOfLines={1}>
          {continente}
        </Text>
      </View>

      {/* Borda brilhante se coletado */}
      {coletado && (
        <View style={[styles.glowBorder, { borderColor: corPrimaria + '66' }]} />
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
  colorBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  titulosBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary + 'EE',
    borderRadius: radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 10,
  },
  titulosIcon: {
    fontSize: 9,
    color: colors.dark,
    marginRight: 2,
  },
  titulosText: {
    ...fonts.label,
    fontSize: 9,
    color: colors.dark,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark + 'BB',
    zIndex: 5,
    borderRadius: radius.lg,
  },
  bandeiraContainer: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  bandeira: {
    width: CARD_WIDTH - 28,
    height: 72,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  bandeiraGray: {
    opacity: 0.3,
  },
  bandeiraPlaceholder: {
    width: CARD_WIDTH - 28,
    height: 72,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bandeiraEmoji: {
    fontSize: 28,
  },
  info: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    paddingTop: 2,
  },
  nome: {
    ...fonts.subheading,
    fontSize: 13,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  continente: {
    ...fonts.label,
    fontSize: 9,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  glowBorder: {
    position: 'absolute',
    inset: 0,
    borderRadius: radius.lg,
    borderWidth: 1,
    pointerEvents: 'none',
  },
});