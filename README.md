# Nobel Kimya Ödülleri

Sakarya Üniversitesi BSM447 Mobil Uygulama Geliştirme dersi dönem ödevi.

- Öğrenci numarası: **G211210575**
- Konu: **K08 - Nobel Ödülleri**
- Varyant: **b - Kimya**
- Ek kural: **7 - Karanlık / Aydınlık Tema** (henüz uygulanmadı)
- Kalıcı veri yöntemi: **AsyncStorage 2.2.0**. Kaydedilen kayıtlar tüm detaylarıyla JSON olarak saklanır ve uygulama açıldığında geri yüklenir.

## Projenin mevcut durumu

Phase 1, Phase 2, Phase 3 ve Phase 4 uygulandı. Uygulama geliştirme aşamasındadır; fiziksel Android telefon doğrulaması beklenmektedir.

Çalışan özellikler:

- React Navigation ile Liste ve Kaydedilenler alt sekmeleri, bunların üzerinde açılan Detay ekranı.
- Nobel Prize API üzerinden uygulama çalışırken 30 Kimya ödülü sahibinin alınması.
- FlatList ile ad ve ödül yılı gösterimi; kayıt kimliğinin liste anahtarı olarak kullanılması.
- Gelen 30 kaydın ödül yılına göre yeniden eskiye sıralanması.
- İsimde büyük/küçük harfe duyarsız arama.
- Seçilen kaydın route.params ile Detay ekranına aktarılması; ad, ödül yılı, doğum tarihi, ülke ve ödül gerekçesinin gösterilmesi.
- Doğum yılı ile ödül yılının farkından yaklaşık yaş hesaplanması. Eksik ay/gün bilgileri açıkça belirtilir; bu değer ödül günündeki kesin yaş değildir.
- Mevcut İngilizce Wikipedia bağlantısının gösterilmesi ve açılması; açılamayan bağlantı için hata mesajı.
- Yükleniyor, boş sonuç ve hata mesajları; Tekrar dene düğmesi.
- Detay ekranında Kaydet / Kaydedilenlerden çıkar düğmesi; durum iki ekranda ortak tutulur.
- Kaydedilenler ekranında kayıtları listeleme, aynı Detay ekranına geçiş ve Çıkar düğmesi.
- Uygulama yeniden açıldığında kayıtları AsyncStorage'dan geri yükleme; API erişilemese de saklanan detayları gösterme.
- Depolama okuma/yazma hatalarını gösterme; okuma tamamlanmadan kayıtları değiştirmeme ve yazma başarısızsa mevcut listeyi koruma.

Karanlık / Aydınlık Tema ve tema tercihinin saklanması henüz uygulanmadı.

## Veri kaynağı

[Nobel Prize API - Kimya](https://api.nobelprize.org/2.1/laureates?limit=30&nobelPrizeCategory=che)

Veriler API yanıtındaki laureates dizisinden okunur. Projeye kopyalanmış bir JSON veri seti kullanılmaz. Belirlenen adresin döndürdüğü ilk 30 kayıt sıralanır; tüm kazananlar veya en yeni 30 kazanan listeleniyor iddiası yoktur.

## Kullanılan teknolojiler

- JavaScript, React Native ve Expo SDK 58 (expo ~58.0.26)
- React Navigation: Bottom Tabs ve Native Stack
- AsyncStorage ile kalıcı veri; App.js içindeki ortak state ve ekranlara geçirilen props
- useState, useEffect, fetch, FlatList, TextInput ve StyleSheet.create

## Kurulum ve çalıştırma

Node.js ve Expo SDK 58 ile uyumlu Expo Go gerekir. Depo klasöründe:

```sh
npm ci
npx expo start
```

Android telefonda Expo Go ile terminaldeki QR kodunu okutun. Telefon ve bilgisayar aynı Wi-Fi ağında olmalıdır.

Listeyi ve yıl sırasını kontrol edin. aziz ve AZIZ ile arama yapın; Aziz Sancar'ın detayında 2015 ödül yılı, 1946-09-08 doğum tarihi ve yaklaşık 69 yaş bilgisini kontrol edin. David Baker'ın eksik doğum tarihi 1962 (ay ve gün bilinmiyor), yaklaşık yaşı 62 olarak gösterilir. Wikipedia düğmesini ve geri dönüşü deneyin. Fiziksel Android telefon testi henüz doğrulanmadı.

Kaydet düğmesine basın; düğme Kaydedilenlerden çıkar olarak değişmelidir. Kaydedilenler sekmesinde aynı kaydı açın, çıkarın ve diğer ekrandaki durumunu kontrol edin. İki kayıt ekleyip uygulamayı tamamen kapatın ve uygulama verilerini silmeden yeniden açın. Kayıtların ve detaylarının kaldığını, çıkarılan kaydın tekrar açılışta gelmediğini doğrulayın. API erişilemediğinde Kaydedilenler'i deneyin; Expo Go geliştirme testinde Metro sunucusuna yerel erişim sürmelidir.

Doğum tarihi, yaklaşık yaş ve kaydedilen veri doğrulamasının otomatik testlerini çalıştırmak için:

```sh
npm test
```

## Tamamlanacak işler

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
