import {
  ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Button from '../components/UygulamaDugmesi';

export default function KaydedilenlerScreen({
  navigation, kaydedilenler, kayitlarYukleniyor, kayitlarHazir,
  kayitHatasi, kayitIslemiSuruyor, kayitSil, kayitlariTekrarOku,
}) {
  const { colors } = useTheme();
  const styles = stilleriOlustur(colors);
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
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.description}>Kaydedilenler yükleniyor...</Text>
        </View>
      ) : !kayitlarHazir ? (
        <View style={styles.messageContainer}>
          <Button title="Tekrar dene" onPress={kayitlariTekrarOku} />
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

function stilleriOlustur(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.secondaryText,
      marginVertical: 12,
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: 16,
    },
    row: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    error: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.error,
      marginBottom: 12,
    },
    messageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
  });
}
