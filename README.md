# Nobel Kimya Ödülleri

Sakarya Üniversitesi BSM447 Mobil Uygulama Geliştirme dersi dönem ödevi.

- Öğrenci numarası: **G211210575**
- Konu: **K08 - Nobel Ödülleri**
- Varyant: **b - Kimya**
- Ek kural: **7 - Karanlık / Aydınlık Tema** (henüz uygulanmadı)
- Kalıcı veri yöntemi: **AsyncStorage** planlandı; henüz uygulanmadı.

## Projenin mevcut durumu

Phase 1 ve Phase 2 tamamlandı. Uygulama geliştirme aşamasındadır.

Çalışan özellikler:

- React Navigation ile Liste ve Kaydedilenler alt sekmeleri, bunların üzerinde açılan Detay ekranı.
- Nobel Prize API üzerinden uygulama çalışırken 30 Kimya ödülü sahibinin alınması.
- FlatList ile ad ve ödül yılı gösterimi; kayıt kimliğinin liste anahtarı olarak kullanılması.
- Gelen 30 kaydın ödül yılına göre yeniden eskiye sıralanması.
- İsimde büyük/küçük harfe duyarsız arama.
- Seçilen kaydın route.params ile Detay ekranına aktarılması ve adının gösterilmesi.
- Yükleniyor, boş sonuç ve hata mesajları; Tekrar dene düğmesi.

Detay ekranındaki diğer bilgiler ve Kaydedilenler ekranındaki kalıcı kayıt işlemleri henüz tamamlanmadı.

## Veri kaynağı

[Nobel Prize API - Kimya](https://api.nobelprize.org/2.1/laureates?limit=30&nobelPrizeCategory=che)

Veriler API yanıtındaki laureates dizisinden okunur. Projeye kopyalanmış bir JSON veri seti kullanılmaz. Belirlenen adresin döndürdüğü ilk 30 kayıt sıralanır; tüm kazananlar veya en yeni 30 kazanan listeleniyor iddiası yoktur.

## Kullanılan teknolojiler

- JavaScript, React Native ve Expo SDK 58 (expo ~58.0.25)
- React Navigation: Bottom Tabs ve Native Stack
- useState, useEffect, fetch, FlatList, TextInput ve StyleSheet.create

## Kurulum ve çalıştırma

Node.js ve Expo SDK 58 ile uyumlu Expo Go gerekir. Depo klasöründe:

```sh
npm ci
npx expo start
```

Android telefonda Expo Go ile terminaldeki QR kodunu okutun. Telefon ve bilgisayar aynı Wi-Fi ağında olmalıdır.

Listeyi ve yıl sırasını kontrol edin. aziz ve AZIZ ile arama yapın, bir kaydı açıp geri dönün ve iki sekme arasında geçiş yapın. Fiziksel Android telefon testi henüz doğrulanmadı.

## Tamamlanacak işler

- Detayda doğum tarihi, ülke, ödül gerekçesi ve Wikipedia bağlantısı.
- Ödül yılındaki yaşın hesaplanması; eksik tarihler için uygun açıklama.
- Kaydet / Kaydedilenlerden çıkar işlemleri ve AsyncStorage ile kalıcı kayıtlar.
- Karanlık / Aydınlık Tema anahtarı ve tema seçiminin saklanması.
- Uygulamaya özel simge, Android telefon ve APK testleri.

## Ekran görüntüleri

Ödev için uygulamadan alınmış üç gerçek ekran görüntüsü eklenecek:

1. Liste: henüz eklenmedi.
2. Detay: henüz eklenmedi.
3. Kaydedilenler: henüz eklenmedi.

## APK indirme bağlantısı

Henüz APK üretilmedi; gerçek indirme bağlantısı eklenecek.

## Ekran kaydı

Henüz hazırlanmadı; gerçek kayıt bağlantısı eklenecek. Kayıt Liste, Detay ve Kaydedilenler ekranlarını göstermeli ve en fazla 1 dakika sürmelidir.

## Teslim

Teslim dosyası: G211210575_BSM447.zip. node_modules ve .expo klasörleri ZIP'e eklenmez. Son teslim 15 Aralık 2026, saat 23.59; ZIP dosyası OBİS'e yüklenmelidir.

## Lisans bildirimi

LICENSE dosyasında Expo / 650 Industries kaynaklı MIT lisans bildirimi korunmaktadır. Kullanılan bağımlılıkların kendi lisansları da geçerlidir.
