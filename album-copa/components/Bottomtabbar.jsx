import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, fonts, spacing, radius } from './theme';

/**
 * BottomTabBar — navegação inferior customizada estilo FIFA
 *
 * Uso com React Navigation (Tab.Navigator):
 *
 *   <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
 *     <Tab.Screen name="Home" ... />
 *     ...
 *   </Tab.Navigator>
 *
 * Ou use standalone passando as tabs manualmente:
 *
 *   const tabs = [
 *     { key: 'home',      label: 'Início',   icon: '🏠', activeIcon: '🏠' },
 *     { key: 'album',     label: 'Álbum',    icon: '📋', activeIcon: '📋' },
 *     { key: 'historico', label: 'História', icon: '🏆', activeIcon: '🏆' },
 *     { key: 'quiz',      label: 'Quiz',     icon: '❓', activeIcon: '❓' },
 *   ];
 *   <BottomTabBar tabs={tabs} activeTab="home" onTabPress={(key) => ...} />
 */

// ── Modo integrado ao React Navigation ──────────────────────────────────────
export default function BottomTabBar({ state, descriptors, navigation }) {
  // Se veio do React Navigation, usa o state dele
  if (state && descriptors && navigation) {
    return (
      <View style={styles.container}>
        <View style={styles.topAccent} />
        <View style={styles.inner}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;
            const isFocused = state.index === index;
            const icon = isFocused
              ? (options.tabBarActiveIcon ?? options.tabBarIcon ?? '●')
              : (options.tabBarIcon ?? '○');

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabItem
                key={route.key}
                label={label}
                icon={icon}
                isFocused={isFocused}
                onPress={onPress}
              />
            );
          })}
        </View>
      </View>
    );
  }

  // Modo standalone — sem React Navigation
  return null;
}

// ── Modo standalone (sem React Navigation) ──────────────────────────────────
export function StandaloneBottomTabBar({ tabs = [], activeTab, onTabPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.topAccent} />
      <View style={styles.inner}>
        {tabs.map((tab) => (
          <TabItem
            key={tab.key}
            label={tab.label}
            icon={activeTab === tab.key ? tab.activeIcon : tab.icon}
            isFocused={activeTab === tab.key}
            onPress={() => onTabPress(tab.key)}
          />
        ))}
      </View>
    </View>
  );
}

// ── Item individual da aba ───────────────────────────────────────────────────
function TabItem({ label, icon, isFocused, onPress }) {
  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
    >
      {/* Bolinha indicadora ativa */}
      {isFocused && <View style={styles.activeIndicator} />}

      {/* Ícone */}
      <View style={[styles.iconWrapper, isFocused && styles.iconWrapperActive]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      {/* Label */}
      <Text style={[styles.label, isFocused && styles.labelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    borderTopWidth: 0,
    paddingBottom: Platform.OS === 'android' ? spacing.sm : spacing.lg,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  topAccent: {
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
  inner: {
    flexDirection: 'row',
    paddingTop: spacing.xs,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 2,
    backgroundColor: colors.secondary,
    borderRadius: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: colors.primary + '22',
  },
  icon: {
    fontSize: 22,
  },
  label: {
    ...fonts.label,
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 1,
  },
  labelActive: {
    color: colors.secondary,
  },
});