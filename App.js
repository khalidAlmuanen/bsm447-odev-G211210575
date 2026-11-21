import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ListeScreen from './src/screens/ListeScreen';
import DetayScreen from './src/screens/DetayScreen';
import KaydedilenlerScreen from './src/screens/KaydedilenlerScreen';
import { KAYIT_ANAHTARI, kayitGecerliMi, kayitlariCoz } from './src/utils/kayitlar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ kayitProps }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#22577a',
        tabBarIcon: ({ color, size }) => (
          <Text style={{ color, fontSize: size }}>
            {route.name === 'Liste' ? '≡' : '☆'}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Liste" component={ListeScreen} />
      <Tab.Screen name="Kaydedilenler">
        {(props) => <KaydedilenlerScreen {...props} {...kayitProps} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
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
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator>
          {/* Detay, sekmelerin üstünde açılır. */}
          <Stack.Screen
            name="MainTabs"
            options={{ headerShown: false }}
          >
            {() => <MainTabs kayitProps={kayitProps} />}
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
