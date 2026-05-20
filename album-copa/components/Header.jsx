import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { colors, fonts, spacing } from './theme';

/**
 * Header — cabeçalho das telas
 *
 * Props:
 *  title        string   — título principal
 *  subtitle     string   — subtítulo opcional
 *  showBack     bool     — exibe botão voltar
 *  onBack       func     — ação do botão voltar
 *  rightIcon    node     — elemento opcional no lado direito
 *  variant      'default' | 'transparent' | 'colored'
 */
export default function Header({
  title = '',
  subtitle = '',
  showBack = false,
  onBack,
  rightIcon = null,
  variant = 'default',
}) {
  const isTransparent = variant === 'transparent';
  const isColored = variant === 'colored';

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />
      <View
        style={[
          styles.container,
          isTransparent && styles.containerTransparent,
          isColored && styles.containerColored,
        ]}
      >
        {/* Linha decorativa verde no topo */}
        {!isTransparent && <View style={styles.topAccent} />}

        <View style={styles.inner}>
          {/* Botão voltar */}
          <View style={styles.left}>
            {showBack && (
              <TouchableOpacity
                onPress={onBack}
                style={styles.backButton}
                accessibilityLabel="Voltar"
                accessibilityRole="button"
              >
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Título central */}
          <View style={styles.center}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {!!subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          {/* Ícone direito */}
          <View style={styles.right}>
            {rightIcon}
          </View>
        </View>

        {/* Linha decorativa dourada embaixo */}
        {!isTransparent && <View style={styles.bottomAccent} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  containerTransparent: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  containerColored: {
    backgroundColor: colors.primary,
  },
  topAccent: {
    height: 3,
    backgroundColor: colors.primary,
  },
  bottomAccent: {
    height: 2,
    backgroundColor: colors.secondary,
    opacity: 0.6,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    minHeight: 56,
  },
  left: {
    width: 44,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 44,
    alignItems: 'flex-end',
  },
  title: {
    ...fonts.heading,
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...fonts.label,
    fontSize: 10,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  backArrow: {
    fontSize: 18,
    color: colors.textPrimary,
    lineHeight: 22,
  },
});