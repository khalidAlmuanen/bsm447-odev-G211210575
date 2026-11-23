import { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Button from '../components/UygulamaDugmesi';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL =
  'https://api.nobelprize.org/2.1/laureates?limit=30&nobelPrizeCategory=che';

function isimGetir(kayit) {
  return kayit.knownName?.en || kayit.orgName?.en || 'İsim bilgisi yok';
}

function yilGetir(kayit) {
  return Number(kayit.nobelPrizes?.[0]?.awardYear) || 0;
}

export default function ListeScreen({ navigation, temaProps }) {
  const { colors, dark } = useTheme();
  const styles = stilleriOlustur(colors);
  const {
    karanlik, temaYukleniyor, temaHazir, temaKaydediliyor,
    temaHatasi, temaDegistir, temayiTekrarOku,
  } = temaProps;
  const [odulSahipleri, setOdulSahipleri] = useState([]);
  const [arama, setArama] = useState('');
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');
  const [yenileme, setYenileme] = useState(0);

  useEffect(() => {
    let aktif = true;
    const controller = new AbortController();

    async function verileriGetir() {
      setYukleniyor(true);
      setHata('');
      // Bağlantı yanıt vermezse beklemeyi 20 saniye ile sınırla.
      const zamanAsimi = setTimeout(() => controller.abort(), 20000);

      try {
        const cevap = await fetch(API_URL, { signal: controller.signal });
        if (!cevap.ok) {
          throw new Error('API isteği başarısız.');
        }

        const veri = await cevap.json();
        if (!Array.isArray(veri?.laureates)) {
          throw new Error('Laureates dizisi bulunamadı.');
        }

        // filter yeni bir dizi üretir; API'den gelen dizi değişmez.
        const liste = veri.laureates
          .filter((kayit) => kayit?.id != null)
          .sort((a, b) => yilGetir(b) - yilGetir(a));

        if (aktif) {
          setOdulSahipleri(liste);
        }
      } catch {
        if (aktif) {
          setOdulSahipleri([]);
          setHata('Veriler alınamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.');
        }
      } finally {
        clearTimeout(zamanAsimi);
        if (aktif) {
          setYukleniyor(false);
        }
      }
    }

    verileriGetir();

    return () => {
      aktif = false;
      controller.abort();
    };
  }, [yenileme]);

  const aramaMetni = arama.trim().toLowerCase();
  const filtrelenmisListe = odulSahipleri.filter((kayit) =>
    isimGetir(kayit).toLowerCase().includes(aramaMetni)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nobel Kimya Ödülleri</Text>
      <Text style={styles.description}>
        Ödül yılına göre yeniden eskiye
      </Text>
      <View style={styles.themeRow}>
        <Text style={styles.themeLabel}>{karanlik ? 'Karanlık tema' : 'Aydınlık tema'}</Text>
        <Switch
          accessibilityLabel="Karanlık tema"
          value={karanlik}
          onValueChange={temaDegistir}
          disabled={!temaHazir || temaKaydediliyor}
          trackColor={{ false: colors.switchTrackOff, true: colors.primary }}
          thumbColor={colors.switchThumb}
        />
      </View>
      {temaYukleniyor && <Text style={styles.themeMessage}>Tema yükleniyor...</Text>}
      {temaKaydediliyor && <Text style={styles.themeMessage}>Tema kaydediliyor...</Text>}
      {temaHatasi !== '' && (
        <Text style={styles.error} accessibilityRole="alert">{temaHatasi}</Text>
      )}
      {!temaHazir && !temaYukleniyor && (
        <View style={styles.themeRetry}>
          <Button title="Temayı tekrar yükle" onPress={temayiTekrarOku} />
        </View>
      )}
      <TextInput
        style={styles.searchInput}
        placeholder="İsme göre ara..."
        placeholderTextColor={colors.placeholder}
        selectionColor={colors.primary}
        keyboardAppearance={dark ? 'dark' : 'light'}
        accessibilityLabel="Ödül sahibi ara"
        value={arama}
        onChangeText={setArama}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {yukleniyor ? (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.message}>Yükleniyor...</Text>
        </View>
      ) : hata ? (
        <View style={styles.messageContainer}>
          <Text style={[styles.message, styles.error]} accessibilityRole="alert">
            {hata}
          </Text>
          <Button
            title="Tekrar dene"
            onPress={() => setYenileme(yenileme + 1)}
          />
        </View>
      ) : (
        <FlatList
          data={filtrelenmisListe}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              accessibilityRole="button"
              onPress={() =>
                navigation.navigate('Detay', { odulSahibi: item, kaynak: 'Liste' })
              }
            >
              <Text style={styles.name}>{isimGetir(item)}</Text>
              <Text style={styles.year}>
                Ödül yılı: {yilGetir(item) || 'Bilinmiyor'}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.messageContainer}>
              <Text style={styles.message}>
                {aramaMetni ? 'Sonuç bulunamadı.' : 'Gösterilecek kayıt bulunamadı.'}
              </Text>
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
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.secondaryText,
      marginBottom: 16,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.text,
      marginBottom: 12,
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
    year: {
      fontSize: 15,
      color: colors.secondaryText,
      marginTop: 6,
    },
    messageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    message: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.secondaryText,
      textAlign: 'center',
      marginVertical: 16,
    },
    themeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
      minHeight: 44,
    },
    themeLabel: {
      fontSize: 16,
      color: colors.text,
    },
    themeMessage: {
      color: colors.secondaryText,
      marginBottom: 8,
    },
    error: {
      color: colors.error,
      marginBottom: 12,
    },
    themeRetry: {
      marginBottom: 12,
    },
  });
}
