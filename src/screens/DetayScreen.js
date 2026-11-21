import { useState } from 'react';
import { Button, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dogumBilgisiGetir, odulYasiniHesapla } from '../utils/odulYasi';

export default function DetayScreen({
  navigation, route, kaydedilenler, kayitlarYukleniyor, kayitlarHazir,
  kayitHatasi, kayitIslemiSuruyor, kaydiDegistir, kayitlariTekrarOku,
}) {
  const odulSahibi = route.params?.odulSahibi;
  const isim = odulSahibi?.knownName?.en || odulSahibi?.orgName?.en;
  const odul = odulSahibi?.nobelPrizes?.[0];
  const dogum = dogumBilgisiGetir(odulSahibi?.birth?.date);
  const yas = odulYasiniHesapla(odulSahibi?.birth?.date, odul?.awardYear);
  const wikipedia = odulSahibi?.wikipedia?.english;
  const wikipediaVar = typeof wikipedia === 'string'
    && /^https:\/\/en\.wikipedia\.org\/wiki\/\S+$/i.test(wikipedia);
  const [baglantiHatasi, setBaglantiHatasi] = useState('');
  const kayitli = odulSahibi && kaydedilenler.some((item) =>
    String(item.id) === String(odulSahibi.id)
  );

  async function wikipediaAc() {
    setBaglantiHatasi('');
    try {
      await Linking.openURL(wikipedia);
    } catch {
      setBaglantiHatasi('Wikipedia açılamadı. Lütfen tekrar deneyin.');
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{isim || 'Ödül sahibi detayları'}</Text>

        {odulSahibi ? (
          <>
            <View style={styles.saveButton}>
              <Button
                title={kayitli ? 'Kaydedilenlerden çıkar' : 'Kaydet'}
                onPress={() => kaydiDegistir(odulSahibi)}
                disabled={!kayitlarHazir || kayitIslemiSuruyor}
                color="#22577a"
              />
              {kayitlarYukleniyor && (
                <Text style={styles.note}>Kaydedilenler yükleniyor...</Text>
              )}
              {kayitIslemiSuruyor && (
                <Text style={styles.note}>Kayıt işlemi yapılıyor...</Text>
              )}
              {kayitHatasi !== '' && (
                <Text style={styles.error} accessibilityRole="alert">
                  {kayitHatasi}
                </Text>
              )}
              {!kayitlarHazir && !kayitlarYukleniyor && (
                <Button title="Tekrar dene" onPress={kayitlariTekrarOku} color="#22577a" />
              )}
            </View>

            <Text style={styles.label}>Ödül yılı</Text>
            <Text style={styles.value}>{odul?.awardYear || 'Bilinmiyor'}</Text>

            <Text style={styles.label}>Doğum tarihi</Text>
            <Text style={styles.value}>{dogum.metin}</Text>

            <Text style={styles.label}>Doğum ülkesi</Text>
            <Text style={styles.value}>
              {odulSahibi.birth?.place?.country?.en || 'Bilinmiyor'}
            </Text>

            <Text style={styles.label}>Ödül yılındaki yaş</Text>
            <Text style={styles.value}>
              {yas !== null ? `Ödülü yaklaşık ${yas} yaşında aldı.` : 'Yaş hesaplanamadı.'}
            </Text>
            {yas !== null && (
              <Text style={styles.note}>
                Doğum yılı ile ödül yılının farkına göre yaklaşık hesaplanmıştır.
              </Text>
            )}

            <Text style={styles.label}>Ödül gerekçesi</Text>
            <Text style={styles.value}>
              {odul?.motivation?.en || 'Ödül gerekçesi bulunamadı.'}
            </Text>

            <Text style={styles.label}>Wikipedia</Text>
            {wikipediaVar ? (
              <>
                <Text selectable style={styles.url}>{wikipedia}</Text>
                <Button title="Wikipedia'da aç" onPress={wikipediaAc} color="#22577a" />
              </>
            ) : (
              <Text style={styles.value}>Wikipedia bağlantısı bulunamadı.</Text>
            )}
            {baglantiHatasi !== '' && (
              <Text style={styles.error} accessibilityRole="alert">
                {baglantiHatasi}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.value}>
            Henüz bir ödül sahibi seçilmedi. Liste ekranından bir kayıt seçin.
          </Text>
        )}

        <View style={styles.backButton}>
          <Button title="Geri dön" onPress={() => navigation.goBack()} color="#22577a" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#193549',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#475569',
    marginTop: 20,
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    lineHeight: 24,
    color: '#193549',
  },
  note: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
    marginTop: 6,
  },
  url: {
    fontSize: 14,
    lineHeight: 22,
    color: '#22577a',
    marginBottom: 12,
  },
  error: {
    fontSize: 16,
    lineHeight: 24,
    color: '#b91c1c',
    marginTop: 12,
  },
  backButton: {
    marginTop: 28,
  },
  saveButton: {
    marginBottom: 4,
  },
});
