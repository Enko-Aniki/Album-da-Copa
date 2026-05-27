import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  onBack: () => void;
};

const destinations = [
  {
    title: 'Estados Unidos',
    subtitle: 'O palco moderno do futebol',
    description:
      'Com estádios de última geração e uma cultura vibrante, os Estados Unidos trazem um clima urbano para a Copa de 2026. De Los Angeles a Nova York, a experiência mistura tradição esportiva com grandes shows e festivais.',
    imageLabel: 'Imagem dos EUA',
    color: '#cde7ff',
  },
  {
    title: 'Canadá',
    subtitle: 'Natureza e paixão em estádios acolhedores',
    description:
      'O Canadá entra em cena com cidades acolhedoras e belas paisagens. Entre montanhas e lagos, o foco é criar uma experiência calorosa para visitantes que chegam pela primeira vez ao futebol mundial.',
    imageLabel: 'Imagem do Canadá',
    color: '#dcedc1',
  },
  {
    title: 'México',
    subtitle: 'Coração latino da Copa',
    description:
      'O México traz a energia festiva e a tradição do futebol latino-americano. Estádios apaixonados, cores vibrantes e comida deliciosa fazem do país uma peça essencial desta primeira Copa de três sedes.',
    imageLabel: 'Imagem do México',
    color: '#fde2d0',
  },
];

export default function Paises({ onBack }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Países Sede 2026</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Primeira Copa em três países</Text>
          <Text style={styles.introText}>
            A Copa 2026 chega como um grande marco: pela primeira vez o torneio será
            sediado por três países ao mesmo tempo. Estados Unidos, Canadá e México
            dividem estádios, cultura e hospitalidade em uma celebração única do futebol.
          </Text>
        </View>

        {destinations.map((item) => (
          <View key={item.title} style={styles.section}>
            <View style={[styles.imageBlock, { backgroundColor: item.color }]}> 
              <Text style={styles.imageLabel}>{item.imageLabel}</Text>
            </View>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.sectionSubtitle}>{item.subtitle}</Text>
            <Text style={styles.sectionText}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
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
    borderBottomColor: '#e3e3e8',
  },
  backButton: {
    width: 72,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2b3d9a',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },
  headerPlaceholder: {
    width: 72,
    height: 36,
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  introCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    color: '#111111',
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555c6c',
  },
  section: {
    marginBottom: 22,
  },
  imageBlock: {
    width: '100%',
    height: 180,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4e4e59',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2b3d9a',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#525969',
  },
});



