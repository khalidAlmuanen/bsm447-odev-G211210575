import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetayScreen({ navigation, route }) {
  const kaynak = route.params?.kaynak;
  const odulSahibi = route.params?.odulSahibi;
  const isim = odulSahibi?.knownName?.en || odulSahibi?.orgName?.en;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <Text style={styles.title}>{isim || 'Ödül sahibi detayları'}</Text>
      <Text style={styles.description}>
        Ödül sahibinin bilgileri burada gösterilecek.
      </Text>
      {kaynak && (
        <Text style={styles.source}>Bu ekran {kaynak} üzerinden açıldı.</Text>
      )}
      <Button
        title="Geri dön"
        onPress={() => navigation.goBack()}
        color="#22577a"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#193549',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 16,
  },
  source: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },
});
