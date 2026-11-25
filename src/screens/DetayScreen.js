import { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Button from '../components/UygulamaDugmesi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dogumBilgisiGetir, odulYasiniHesapla } from '../utils/odulYasi';
import { isimGetir, metinGetir, yilGetir } from '../utils/nobel';

export default function DetayScreen({
  navigation, route, kaydedilenler, kayitlarYukleniyor, kayitlarHazir,
  kayitHatasi, kayitIslemiSuruyor, kaydiDegistir, kayitlariTekrarOku,
}) {
  const { colors } = useTheme();
  const styles = stilleriOlustur(colors);
  const odulSahibi = route.params?.odulSahibi;
  const isim = isimGetir(odulSahibi);
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
        <Text style={styles.title}>{odulSahibi ? isim : 'Ödül sahibi detayları'}</Text>

        {odulSahibi ? (
          <>
            <View style={styles.saveButton}>
              <Button
                title={kayitli ? 'Kaydedilenlerden çıkar' : 'Kaydet'}
                onPress={() => kaydiDegistir(odulSahibi)}
                disabled={!kayitlarHazir || kayitIslemiSuruyor}
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
                <Button title="Tekrar dene" onPress={kayitlariTekrarOku} />
              )}
            </View>

            <View style={styles.card}>
              <Text style={[styles.label, styles.firstLabel]}>Ödül yılı</Text>
              <Text style={styles.value}>{yilGetir(odulSahibi) || 'Bilinmiyor'}</Text>

              <Text style={styles.label}>Doğum tarihi</Text>
              <Text style={styles.value}>{dogum.metin}</Text>

              <Text style={styles.label}>Doğum ülkesi</Text>
              <Text style={styles.value}>
                {metinGetir(odulSahibi.birth?.place?.country?.en)}
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
            </View>

            <View style={styles.card}>
              <Text style={[styles.label, styles.firstLabel]}>Ödül gerekçesi</Text>
              <Text style={styles.value}>
                {metinGetir(odul?.motivation?.en, 'Ödül gerekçesi bulunamadı.')}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={[styles.label, styles.firstLabel]}>Wikipedia</Text>
              {wikipediaVar ? (
                <>
                  <Text selectable style={styles.url}>{wikipedia}</Text>
                  <Button title="Wikipedia'da aç" onPress={wikipediaAc} />
                </>
              ) : (
                <Text style={styles.value}>Wikipedia bağlantısı bulunamadı.</Text>
              )}
              {baglantiHatasi !== '' && (
                <Text style={styles.error} accessibilityRole="alert">
                  {baglantiHatasi}
                </Text>
              )}
            </View>
          </>
        ) : (
          <Text style={styles.value}>
            Henüz bir ödül sahibi seçilmedi. Liste ekranından bir kayıt seçin.
          </Text>
        )}

        <View style={styles.backButton}>
          <Button title="Geri dön" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function stilleriOlustur(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
      paddingBottom: 32,
    },
    title: {
      fontSize: 24,
      lineHeight: 34,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.secondaryText,
      marginTop: 20,
      marginBottom: 6,
    },
    value: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
    },
    note: {
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
      marginTop: 6,
    },
    url: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.primary,
      marginBottom: 12,
    },
    error: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.error,
      marginTop: 12,
    },
    backButton: {
      marginTop: 28,
    },
    saveButton: {
      marginBottom: 20,
    },
    card: {
      padding: 16,
      marginBottom: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    firstLabel: {
      marginTop: 0,
    },
  });
}
