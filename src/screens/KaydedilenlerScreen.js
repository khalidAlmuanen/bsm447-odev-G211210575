import {
  ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

export default function KaydedilenlerScreen({
  navigation, kaydedilenler, kayitlarYukleniyor, kayitlarHazir,
  kayitHatasi, kayitIslemiSuruyor, kayitSil, kayitlariTekrarOku,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kaydedilenler</Text>
      {kayitHatasi !== '' && (
        <Text style={styles.error} accessibilityRole="alert">
          {kayitHatasi}
        </Text>
      )}
      {kayitlarYukleniyor ? (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color="#22577a" />
          <Text style={styles.description}>Kaydedilenler yükleniyor...</Text>
        </View>
      ) : !kayitlarHazir ? (
        <View style={styles.messageContainer}>
          <Button title="Tekrar dene" onPress={kayitlariTekrarOku} color="#22577a" />
        </View>
      ) : (
        <FlatList
          data={kaydedilenler}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => navigation.navigate('Detay', { odulSahibi: item })}
              >
                <Text style={styles.name}>
                  {item.knownName?.en || item.orgName?.en || 'İsim bilgisi yok'}
                </Text>
                <Text style={styles.description}>
                  Ödül yılı: {item.nobelPrizes?.[0]?.awardYear || 'Bilinmiyor'}
                </Text>
              </TouchableOpacity>
              <Button
                title="Çıkar"
                onPress={() => kayitSil(item.id)}
                disabled={kayitIslemiSuruyor}
                color="#22577a"
              />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.messageContainer}>
              <Text style={styles.description}>Henüz kaydedilen bir ödül sahibi yok.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
    marginVertical: 12,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  row: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#193549',
  },
  error: {
    fontSize: 16,
    lineHeight: 24,
    color: '#b91c1c',
    marginBottom: 12,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
