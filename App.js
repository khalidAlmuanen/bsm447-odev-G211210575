import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appearance, Platform, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ListeScreen from './src/screens/ListeScreen';
import DetayScreen from './src/screens/DetayScreen';
import KaydedilenlerScreen from './src/screens/KaydedilenlerScreen';
import { KAYIT_ANAHTARI, kayitGecerliMi, kayitlariCoz } from './src/utils/kayitlar';
import { TEMA_ANAHTARI, acikRenkler, koyuRenkler, temaTercihiniCoz } from './src/utils/tema';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ kayitProps, temaProps }) {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarIcon: ({ color, size }) => (
          <Text style={{ color, fontSize: size }}>
            {route.name === 'Liste' ? '≡' : '☆'}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Liste">
        {(props) => <ListeScreen {...props} temaProps={temaProps} />}
      </Tab.Screen>
      <Tab.Screen name="Kaydedilenler">
        {(props) => <KaydedilenlerScreen {...props} {...kayitProps} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [karanlik, setKaranlik] = useState(false);
  const [temaYukleniyor, setTemaYukleniyor] = useState(true);
  const [temaHazir, setTemaHazir] = useState(false);
  const [temaKaydediliyor, setTemaKaydediliyor] = useState(false);
  const [temaHatasi, setTemaHatasi] = useState('');
  const [temaOkumaDenemesi, setTemaOkumaDenemesi] = useState(0);
  const temaKilidi = useRef(false);

  useEffect(() => {
    let aktif = true;
    async function temayiYukle() {
      setTemaYukleniyor(true);
      setTemaHazir(false);
      setTemaHatasi('');
      try {
        const tercih = await AsyncStorage.getItem(TEMA_ANAHTARI);
        const koyu = temaTercihiniCoz(tercih);
        if (aktif) {
          setKaranlik(koyu);
          setTemaHazir(true);
        }
      } catch {
        if (aktif) {
          setTemaHatasi('Tema yüklenemedi. Lütfen tekrar deneyin.');
        }
      } finally {
        if (aktif) {
          setTemaYukleniyor(false);
        }
      }
    }
    temayiYukle();
    return () => { aktif = false; };
  }, [temaOkumaDenemesi]);

  async function temaDegistir(yeniDeger) {
    if (!temaHazir || temaKilidi.current) {
      return;
    }
    temaKilidi.current = true;
    setTemaKaydediliyor(true);
    setTemaHatasi('');
    try {
      await AsyncStorage.setItem(TEMA_ANAHTARI, yeniDeger ? 'dark' : 'light');
      setKaranlik(yeniDeger);
    } catch {
      setTemaHatasi('Tema kaydedilemedi. Lütfen tekrar deneyin.');
    } finally {
      temaKilidi.current = false;
      setTemaKaydediliyor(false);
    }
  }

  function temayiTekrarOku() {
    setTemaOkumaDenemesi((sayi) => sayi + 1);
  }

  useEffect(() => {
    const tercih = karanlik ? 'dark' : 'light';
    if (Platform.OS === 'web') {
      document.documentElement.style.colorScheme = tercih;
    } else {
      Appearance.setColorScheme(tercih);
    }
  }, [karanlik]);

  const colors = karanlik ? koyuRenkler : acikRenkler;
  const temelTema = karanlik ? DarkTheme : DefaultTheme;
  const navigationTheme = { ...temelTema, colors: { ...temelTema.colors, ...colors } };
  const temaProps = {
    karanlik, temaYukleniyor, temaHazir, temaKaydediliyor,
    temaHatasi, temaDegistir, temayiTekrarOku,
  };

  const [kaydedilenler, setKaydedilenler] = useState([]);
  const [kayitlarYukleniyor, setKayitlarYukleniyor] = useState(true);
  const [kayitlarHazir, setKayitlarHazir] = useState(false);
  const [kayitHatasi, setKayitHatasi] = useState('');
  const [kayitIslemiSuruyor, setKayitIslemiSuruyor] = useState(false);
  const [okumaDenemesi, setOkumaDenemesi] = useState(0);
  const islemKilidi = useRef(false);

  useEffect(() => {
    let aktif = true;

    async function kayitlariYukle() {
      setKayitlarYukleniyor(true);
      setKayitlarHazir(false);
      setKayitHatasi('');
      try {
        const json = await AsyncStorage.getItem(KAYIT_ANAHTARI);
        const liste = kayitlariCoz(json);
        if (aktif) {
          setKaydedilenler(liste);
          setKayitlarHazir(true);
        }
      } catch {
        if (aktif) {
          setKayitHatasi('Kaydedilenler yüklenemedi. Lütfen tekrar deneyin.');
        }
      } finally {
        if (aktif) {
          setKayitlarYukleniyor(false);
        }
      }
    }

    kayitlariYukle();
    return () => { aktif = false; };
  }, [okumaDenemesi]);

  async function kayitlariGuncelle(yeniListe) {
    // İlk okuma bitmeden veya başka yazma sürerken veriyi değiştirme.
    if (!kayitlarHazir || islemKilidi.current) {
      return;
    }
    islemKilidi.current = true;
    setKayitIslemiSuruyor(true);
    setKayitHatasi('');
    try {
      await AsyncStorage.setItem(KAYIT_ANAHTARI, JSON.stringify(yeniListe));
      setKaydedilenler(yeniListe);
    } catch {
      setKayitHatasi('Kayıt işlemi tamamlanamadı. Lütfen tekrar deneyin.');
    } finally {
      islemKilidi.current = false;
      setKayitIslemiSuruyor(false);
    }
  }

  function kaydiDegistir(kayit) {
    if (!kayitGecerliMi(kayit)) {
      setKayitHatasi('Bu kayıt kaydedilemiyor.');
      return;
    }
    const kayitli = kaydedilenler.some((item) => String(item.id) === String(kayit.id));
    const yeniListe = kayitli
      ? kaydedilenler.filter((item) => String(item.id) !== String(kayit.id))
      : [...kaydedilenler, kayit];
    kayitlariGuncelle(yeniListe);
  }

  function kayitSil(id) {
    const yeniListe = kaydedilenler.filter((item) => String(item.id) !== String(id));
    kayitlariGuncelle(yeniListe);
  }

  function kayitlariTekrarOku() {
    setOkumaDenemesi((sayi) => sayi + 1);
  }

  const kayitProps = {
    kaydedilenler, kayitlarYukleniyor, kayitlarHazir, kayitHatasi,
    kayitIslemiSuruyor, kaydiDegistir, kayitSil, kayitlariTekrarOku,
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.background }}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style={karanlik ? 'light' : 'dark'} />
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}>
          {/* Detay, sekmelerin üstünde açılır. */}
          <Stack.Screen
            name="MainTabs"
            options={{ headerShown: false }}
          >
            {() => <MainTabs kayitProps={kayitProps} temaProps={temaProps} />}
          </Stack.Screen>
          <Stack.Screen
            name="Detay"
            options={{ headerBackTitle: 'Geri' }}
          >
            {(props) => <DetayScreen {...props} {...kayitProps} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
