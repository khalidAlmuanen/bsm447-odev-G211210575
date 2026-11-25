import {
  ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Button from '../components/UygulamaDugmesi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isimGetir, yilGetir } from '../utils/nobel';

export default function KaydedilenlerScreen({
  navigation, kaydedilenler, kayitlarYukleniyor, kayitlarHazir,
  kayitHatasi, kayitIslemiSuruyor, kayitSil, kayitlariTekrarOku,
}) {
  const { colors } = useTheme();
  const styles = stilleriOlustur(colors);
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Text style={styles.title}>Kaydedilenler</Text>
      {kayitHatasi !== '' && (
        <Text style={styles.error} accessibilityRole="alert">
          {kayitHatasi}
        </Text>
      )}
      {kayitlarYukleniyor ? (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.description} accessibilityLiveRegion="polite">Kaydedilenler yükleniyor...</Text>
        </View>
      ) : !kayitlarHazir ? (
        <View style={styles.messageContainer}>
          <Button title="Tekrar dene" onPress={kayitlariTekrarOku} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={kaydedilenler}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`${isimGetir(item)}. Detayı aç`}
                onPress={() => navigation.navigate('Detay', { odulSahibi: item })}
              >
                <Text style={styles.name}>
                  {isimGetir(item)}
                </Text>
                <Text style={styles.description}>
                  Ödül yılı: {yilGetir(item) || 'Bilinmiyor'}
                </Text>
              </TouchableOpacity>
              <Button
                title="Çıkar"
                accessibilityLabel={`${isimGetir(item)} kaydını çıkar`}
                onPress={() => kayitSil(item.id)}
                disabled={kayitIslemiSuruyor}
              />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.messageContainer}>
              <Text style={styles.emptyIcon} accessible={false}>☆</Text>
              <Text style={styles.description}>Henüz kaydedilen bir ödül sahibi yok.</Text>
              <Text style={styles.emptyHint}>
                Liste ekranından bir ödül sahibi seçip Kaydet'e basın.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
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
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      backgroundColor: colors.card,
    },
    list: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      lineHeight: 26,
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
    emptyIcon: {
      fontSize: 48,
      color: colors.primary,
    },
    emptyHint: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.secondaryText,
      textAlign: 'center',
    },
  });
}
