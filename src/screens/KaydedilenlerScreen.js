import { Button, StyleSheet, Text, View } from 'react-native';

export default function KaydedilenlerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kaydedilenler</Text>
      <Text style={styles.description}>
        Henüz kaydedilen bir ödül sahibi yok.
      </Text>
      {/* Kaydetme özelliği sonraki aşamada eklenecek. */}
      <Button
        title="Detay ekranını dene"
        onPress={() => navigation.navigate('Detay', { kaynak: 'Kaydedilenler' })}
        color="#22577a"
      />
    </View>
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
    marginBottom: 24,
  },
});
