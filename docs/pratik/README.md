# BSM447 canlı değişiklik provası

G211210575 · K08 Nobel Ödülleri · b Kimya · ek kural 7.

Kaynak: öğrencinin yerel `BSM447_Donem_Odevi.pdf` dosyası, Ek 3, s.17–18. Görev numaraları ve istekler bu sayfalarla karşılaştırıldı. PDF depoya eklenmedi.

Bu çalışma sınav öncesi hazırlık içindir. Kontrolde tek görev kurayla seçilir, süre 2,5 dakikadır ve görev desteksiz yapılır. Ek kural ile aynı işe denk gelen görev yeniden çekilir. Kutuları, kendin yazıp cihazda gösterdiğin denemelerden sonra işaretle.

## Ayrı pratik kopyası

30 patch birbirinden bağımsızdır ve uygulamanın `83dc794` sürümüne göre hazırlanmıştır. Aynı anda tek patch kullanılır. Teslim uygulamasının App.js/src dosyaları bu çalışma için değiştirilmedi.

Ana depo klasöründe PowerShell:

```powershell
git status --short
git worktree add --detach ../nobel-chemistry-pratik 83dc794
Set-Location ../nobel-chemistry-pratik
npm ci
npx expo start
```

Bu komut mevcut dizin varsa üzerine yazmaz. Pratik kopyasını ayrı VS Code penceresinde aç ve Expo Go'da deneme kayıtları kullan. Her göreve başlamadan önce bu kopyada `git status --short` ve `git diff` ile değişikliklerini kontrol et.

Örnek çözümü karşılaştırmak/uygulamak için, **pratik kopyasında**:

```powershell
git apply --check ../nobel-chemistry/docs/pratik/patches/01-zebra.patch
git apply ../nobel-chemistry/docs/pratik/patches/01-zebra.patch
git diff
```

Yalnızca aynı patch'in değişikliklerini geri almak için önce kontrol et:

```powershell
git apply --reverse --check ../nobel-chemistry/docs/pratik/patches/01-zebra.patch
git apply --reverse ../nobel-chemistry/docs/pratik/patches/01-zebra.patch
git status --short
```

`--check` başarısızsa değişikliklerini incele; başka görevin patch'ini üstüne uygulama. Görev 25 yeni bir dosya da ekler; ters patch bu pratik dosyasını geri alır. Çözümü incele, ardından temiz pratik kopyasında aynı değişikliği kendin yaz.

## 150 saniyelik deneme

1. 0–20 sn: İstenen davranışı söyle; dosyayı, state'i ve JSX yerini bul.
2. 20–100 sn: En küçük çalışan değişikliği yaz.
3. 100–135 sn: Telefonda ana davranışı ve tersini dene.
4. 135–150 sn: Değişikliği bir Türkçe cümleyle açıkla.

Rastgele numara seçimi: `Get-Random -Minimum 1 -Maximum 31`. Süreyi kendin ölç; çözüm patch'ini süreli denemeden sonra kontrol et. Otomatik doğrulama sonuçları [DOGRULAMA.md](DOGRULAMA.md) dosyasındadır.

## Uygulamanın akışını anlat

- Liste: `useEffect → fetch → laureates → filter/sort → odulSahipleri`. `arama` değişince türetilen filtre değişir; yeni API isteği gerekmez.
- Detay: `navigation.navigate('Detay', { odulSahibi: item })`; aynı isim `route.params.odulSahibi` içinde okunur.
- Kaydetme: ortak state App.js'tedir. AsyncStorage yazması başarılı olduktan sonra liste güncellenir; ilk okuma bitmeden yazılmaz.
- Tema: ayrı anahtarda saklanır; `useTheme().colors` ekran/header/tab/düğme renklerine uygulanır.
- Yaş: ödül yılı eksi doğum yılıdır; bu yüzden `yaklaşık` denir. `00` ay/gün kesin tarih sayılmaz.

## Beş dakikalık sunum provası

Örnek akış: 0:00–0:45 Liste/arama/Detay; 0:45–1:30 kaydetme, tema ve yeniden açma; 1:30–2:15 seçilen commit'i kodda anlatma; 2:15–4:45 canlı değişiklik; 4:45–5:00 sonucu gösterme. Hocanın verdiği sıraya göre hareket et.

Commit açıklama örneği: `9cfc737` için “Kaydı JSON olarak AsyncStorage'a yazıyorum; işlem başarılı olunca ortak state'i güncelliyorum. Ekranlar aynı state'i props ile alıyor.” Cümleyi ezberlemek yerine ilgili fonksiyonları bulup açıkla.

## Sık yapılan hatalar

- `sort` ve `reverse` için önce kopya al; `keyExtractor` id olarak kalsın.
- `numColumns` değişirken FlatList `key` değişsin.
- `setState` hemen değişkeni değiştirmez; sayacı `(onceki) => onceki + 1` ile artır.
- Kaydedilenler'in bir kopyasını ekran içinde ayrı state yapma; ortak App.js state'ini kullan.
- İlk AsyncStorage okuması bitmeden boş değeri yazma. Görev 27'de yalnız kayıt anahtarını güncelle; tema ayrı kalsın.
- Görev 19/22'de değeri/alanı hoca seçer. Aşağıdaki limit ve şehir örnekleri, verilen değere uyarlanır.
- Görev 19'da kategori değişirse yalnız URL yetmez: Liste'deki `kayitGecerliMi` Kimya kontrolü yapar. Sadece pratik Liste filtresini istenen kategoriye uyarla. Örneğin Physics gösterimi için `kayit?.id != null && kayit.nobelPrizes?.[0]?.category?.en === 'Physics'` kontrolü kullanılabilir. Ortak kayıt doğrulamasını ve eski Kimya kayıtlarını değiştirme; teslim sürümünün adresi Kimya olarak kalır.
- 6, 17, 20, 21 ve 24'ün temel davranışı zaten mevcut; kartlarda bu açıkça belirtilmiştir. Mevcut kodu tanı ve istenen küçük varyantı kendin uygulayabil.

## Görevler

### 01. Zebra satırlar

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/01-zebra.patch). Kaynak sayfa: 17.

renderItem içindeki index çift/tek kontrolüyle iki tema rengi seçilir. API dizisi ve sıralama değişmez.

Kontrol: İlk üç satırın renkleri A/B/A olsun; iki temada yazılar okunsun.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 02. Başlık ve alt satır

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/02-baslik-alt-alan.patch). Kaynak sayfa: 17.

Satır başlığı 20 olur ve primary rengini alır. Yeni alt alan doğum ülkesidir; metinGetir eksik alanı güvenle karşılar.

Kontrol: İsim boyutu/rengi değişsin; ülke küçük gri yazıyla görünsün; ülke yokken Bilinmiyor çıksın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 03. Yuvarlak görsel ve gölge

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/03-harf-golge.patch). Kaynak sayfa: 17.

Listede fotoğraf kullanılmadığından isim baş harfi daire içine alınır. elevation Android, shadow özellikleri iOS gölgesi içindir.

Kontrol: David için D dairesi ve kart gölgesi görünsün; uzun isim daralmadan kayabilsin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 04. Uzun başlığı kısalt

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/04-tek-satir.patch). Kaynak sayfa: 17.

numberOfLines satırı sınırlar; ellipsizeMode sonuna üç nokta koyar. Kayıt adı ve arama verisi kesilmez, yalnızca görünüm sınırlanır.

Kontrol: Dar ekranda uzun ad tek satır ve … ile bitsin; Detay tam adı göstersin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 05. İki sütunlu bilgi

Dosya: [src/screens/DetayScreen.js](../../src/screens/DetayScreen.js). [Bağımsız örnek çözüm](patches/05-iki-sutun.patch). Kaynak sayfa: 17.

En az üç alan için row yönünde iki Text kullanılır. flex:1 iki sütuna alan verir; uzun değerler sarmalanır.

Kontrol: Ödül yılı, doğum tarihi ve ülke solda etiket / sağda değer olarak hizalansın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 06. Boş Kaydedilenler

Dosya: [src/screens/KaydedilenlerScreen.js](../../src/screens/KaydedilenlerScreen.js). [Bağımsız örnek çözüm](patches/06-bos-kayit.patch). Kaynak sayfa: 17.

Mevcut projede bu davranışın tamamı veya temeli hazırdır; çözüm karttaki varyantı gösterir.

Simge ve ortalama mevcut. İstenen kısa metni Henüz kayıt yok yap; boş ekranın flexGrow/flex bağlantısını açıkla.

Kontrol: Boş listede ortada yıldız ve Henüz kayıt yok görünsün; kayıt eklenince kaybolsun.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 07. Beğeni sayacı

Dosya: [src/screens/DetayScreen.js](../../src/screens/DetayScreen.js). [Bağımsız örnek çözüm](patches/07-begeni.patch). Kaynak sayfa: 17.

Sayaç geçici useState verisidir. Fonksiyonel güncelleme her basışı önceki değere ekler; kaydetme işlevinden bağımsızdır.

Kontrol: ♥ 0 üç basıştan sonra ♥ 3 olsun; Kaydet işlevi çalışmaya devam etsin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 08. Liste / ızgara

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/08-izgara.patch). Kaynak sayfa: 17.

numColumns değişirken FlatList key de değişir; aksi durumda React Native sütun değişimini reddeder. Veriler kopyalanmaz veya silinmez.

Kontrol: 1 → 2 → 1 sütun geçişini dene; arama ve satırdan Detay açma çalışsın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 09. Aramayı temizle

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/09-aramayi-temizle.patch). Kaynak sayfa: 17.

Kontrollü TextInput value=arama kullandığı için setArama boş metni hem kutuya hem filtreye yansıtır; API tekrar çağrılmaz.

Kontrol: AZIZ yaz; kutunun yanındaki ✕ ile metin silinsin ve bütün liste geri gelsin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 10. Görselleri gizle

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/10-alt-satiri-gizle.patch). Kaynak sayfa: 17.

Bu uygulamada satır görseli bulunmadığından PDF izin verdiği gibi ödül yılı alt satırı Switch ile koşullu gösterilir. Tema anahtarının state değeri kullanılmaz.

Kontrol: Ödül yılını göster anahtarı sadece alt satırı kapatsın; adlar ve sıralama kalsın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 11. Devamını göster

Dosya: [src/screens/DetayScreen.js](../../src/screens/DetayScreen.js). [Bağımsız örnek çözüm](patches/11-devamini-goster.patch). Kaynak sayfa: 17.

numberOfLines=3 yalnızca gerekçe metnine uygulanır. undefined verilince sınırlama kalkar; aynı state düğme etiketini değiştirir.

Kontrol: Uzun gerekçede ilk 3 satır görünsün; Devamını göster açsın, Gizle tekrar kapasın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 12. Kaydet düğmesinin durumu

Dosya: [src/screens/DetayScreen.js](../../src/screens/DetayScreen.js), [src/components/UygulamaDugmesi.js](../../src/components/UygulamaDugmesi.js). [Bağımsız örnek çözüm](patches/12-kaydedildi.patch). Kaynak sayfa: 17.

Mevcut projede bu davranışın tamamı veya temeli hazırdır; çözüm karttaki varyantı gösterir.

Kaydet/çıkar davranışı zaten mevcut. kayitli true olduğunda başlık ve seçili renkler değişir; düğme devre dışı bırakılmaz, ikinci basış kaydı çıkarır.

Kontrol: Kaydet → Kaydedildi ✓; renk değişsin; tekrar basınca kayıttan çıksın ve Kaydet yazsın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 13. Ters sıra

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/13-ters-sira.patch). Kaynak sayfa: 17.

reverse diziyi değiştirir. Önce spread ile kopya oluşturulur; gosterilecekListe yalnızca görüntü sırasıdır.

Kontrol: Düğmeye iki kez bas; ilk sıra geri gelsin. Arama ve ödül verileri değişmesin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 14. Sıra numarası

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/14-sira-numarasi.patch). Kaynak sayfa: 17.

renderItem index sıfırdan başlar; ekranda 1 tabanlı görünmesi için +1 kullanılır. keyExtractor id olarak kalır.

Kontrol: Satırlar 1., 2., 3. diye numaralansın; filtrelenmiş ilk satır da 1. olsun.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 15. Başlıkta toplam

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/15-toplam.patch). Kaynak sayfa: 17.

Toplam API dizisinden değil filtrelenmisListe.length üzerinden hesaplanır. Ayrı bir sayaç state gerekmez.

Kontrol: Toplam N kayıt aramada azalsın; sonuç yoksa Toplam 0 kayıt ve boş sonuç mesajı görünsün.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 16. Ayraç çizgisi

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/16-ayrac.patch). Kaynak sayfa: 17.

FlatList ItemSeparatorComponent satırlar arasına çizgi koyar; satırın iç border özelliğinden farklıdır. hairlineWidth ince çizgidir.

Kontrol: İki komşu satır arasında gri çizgi olsun; son satırdan sonra fazladan ayraç oluşmasın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 17. Sonuç bulunamadı

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/17-sonuc-yok.patch). Kaynak sayfa: 17.

Mevcut projede bu davranışın tamamı veya temeli hazırdır; çözüm karttaki varyantı gösterir.

Bu davranış mevcut ListEmptyComponent içinde hazır. Varyant, mesajı PDF metniyle ve canlı erişilebilirlik bildirimiyle gösterir; boş API yanıtı ayrı kalır.

Kontrol: Olmayan ad yazınca Sonuç bulunamadı görünsün; aramayı silince kayıtlar geri gelsin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 18. A → Z sıralama

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/18-alfabetik.patch). Kaynak sayfa: 17.

İsimler localeCompare ile karşılaştırılır. Önce kopya alındığı için ödül yılına göre temel sıra korunur.

Kontrol: A → Z sırala isimleri alfabetik yapsın; Yıla göre ile eski sıra dönsün; arama çalışsın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 19. Parametre değiştir

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/19-api-parametresi.patch). Kaynak sayfa: 17.

Örnek yalnızca limit=30 değerini 10 yapar; Kimya kategorisi korunur. Sınavdaki gerçek parametreyi hoca belirler. Kategori değişirse Liste filtresi de uyarlanmalıdır.

Kontrol: Ağ isteğinde limit=10 ve nobelPrizeCategory=che görülsün; yeni yanıt listelensin. Sabit JSON ekleme.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 20. Yükleniyor göstergesi

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/20-yukleniyor.patch). Kaynak sayfa: 17.

Mevcut projede bu davranışın tamamı veya temeli hazırdır; çözüm karttaki varyantı gösterir.

yukleniyor/useEffect/try-finally akışı zaten mevcut. Varyant göstergeye etiket ekler ve PDF metnini kullanır; setTimeout ile sahte bekleme eklenmez.

Kontrol: Yavaş yanıtta gösterge ve Yükleniyor… görünsün; yanıt tamamlanınca listeye geçilsin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 21. Hata mesajı

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/21-baglanti-yok.patch). Kaynak sayfa: 17.

Mevcut projede bu davranışın tamamı veya temeli hazırdır; çözüm karttaki varyantı gösterir.

Hata ve tekrar deneme akışı mevcut. Ağ hatasındaki TypeError için Bağlantı yok kullanılır; timeout ve geçersiz yanıt ayrı kalır.

Kontrol: İnterneti kes: Bağlantı yok ve Tekrar dene görünsün. Bağlantıyı açıp tekrar dene; liste gelsin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 22. Yeni alan

Dosya: [src/screens/DetayScreen.js](../../src/screens/DetayScreen.js). [Bağımsız örnek çözüm](patches/22-yeni-alan.patch). Kaynak sayfa: 17.

Örnek alan birth.place.city.en, mevcut detayda gösterilmeyen doğum şehridir. Alanı hoca seçerse yolu ve etiketi değiştir; optional chaining ve metinGetir kullan.

Kontrol: Şehir alanı bulunan kayıtta gerçek şehir görünsün; alan eksikse Bilinmiyor çıksın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 23. Başlıkta kaydın adı

Dosya: [App.js](../../App.js). [Bağımsız örnek çözüm](patches/23-dinamik-baslik.patch). Kaynak sayfa: 18.

Stack.Screen options bir fonksiyon olur; route.params.odulSahibi içinden güvenli isim okunur. Ekran gövdesindeki başlık ile header farklıdır.

Kontrol: İki farklı kaydı aç; üst navigasyon başlığı her kaydın adını göstersin; geri düğmesi çalışsın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 24. Kaydedilenlerden detaya

Dosya: [src/screens/KaydedilenlerScreen.js](../../src/screens/KaydedilenlerScreen.js). [Bağımsız örnek çözüm](patches/24-kayittan-detaya.patch). Kaynak sayfa: 18.

Mevcut projede bu davranışın tamamı veya temeli hazırdır; çözüm karttaki varyantı gösterir.

Geçiş zaten mevcut. Varyantta aynı navigation.navigate çağrısı detayiAc isimli sıradan fonksiyona alınır; seçilen tam kayıt parametre olarak taşınır.

Kontrol: İki kayıt sakla; Kaydedilenler içinden ikincisini aç; Detay ikinci kaydın adı ve yılı olsun.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 25. Hakkında ekranı

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js), [App.js](../../App.js), `src/screens/HakkindaScreen.js` (yalnız pratik kopyasında yeni dosya). [Bağımsız örnek çözüm](patches/25-hakkinda.patch). Kaynak sayfa: 18.

Basit ekran adı/öğrenci no/sürüm gösterir. Sürüm app.json içinden okunur; isim mevcut Git kimliğidir. Stack kaydı ve Liste düğmesi birlikte eklenir.

Kontrol: Hakkında aç: KHALID ALMUANEN, G211210575 ve 1.0.0 görünsün; geri dön ve temayı dene.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 26. Sekme etiketi ve simgesi

Dosya: [App.js](../../App.js). [Bağımsız örnek çözüm](patches/26-sekme-etiketi.patch). Kaynak sayfa: 18.

Kaydedilenler route adı korunur. Yalnızca tabBarLabel Favoriler ve simge ♥ olur; mevcut navigation çağrıları bozulmaz.

Kontrol: Alt sekmede Favoriler ve kalp görünsün; sekmeye basınca Kaydedilenler içeriği açılsın.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 27. Tümünü sil

Dosya: [src/screens/KaydedilenlerScreen.js](../../src/screens/KaydedilenlerScreen.js), [App.js](../../App.js). [Bağımsız örnek çözüm](patches/27-tumunu-sil.patch). Kaynak sayfa: 18.

Onay Alert içinde alınır. Sil callback ortak kayitlariGuncelle([]) fonksiyonunu kullanır; başlangıç okuması, yazma kilidi ve hata korumaları korunur. Tema anahtarı silinmez.

Kontrol: Vazgeç kayıtları korusun; Sil listeyi boşaltsın; yeniden açılışta boş kalsın. Yalnızca deneme kayıtları kullan.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 28. Kayıt tarihi

Dosya: [src/screens/KaydedilenlerScreen.js](../../src/screens/KaydedilenlerScreen.js), [App.js](../../App.js). [Bağımsız örnek çözüm](patches/28-kayit-tarihi.patch). Kaynak sayfa: 18.

Yeni kayda ISO tarih eklenir ve tam kayıtla saklanır. Görünümde tr-TR tarih+saat kullanılır. Eski tarihsiz kayıtta Bilinmiyor gösterilir.

Kontrol: Bir kayıt ekle; tarih ve saat görünsün; yeniden açınca tarih değişmesin; eski kayıtlar hata vermesin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 29. Son aramayı hatırla

Dosya: [src/screens/ListeScreen.js](../../src/screens/ListeScreen.js). [Bağımsız örnek çözüm](patches/29-son-arama.patch). Kaynak sayfa: 18.

Son arama ayrı anahtarda düz metin tutulur. İlk getItem bitmeden setItem çalıştırılmaz; böylece saklanan aramanın üstüne boş değer yazılmaz. Okuma hatasında kutu kilitli kalır ve yeniden açma mesajı görünür.

Kontrol: AZIZ yazıp uygulamayı yeniden aç; kutu ve filtre AZIZ olsun. Boş arama da saklansın; kayıt/tema anahtarları değişmesin.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

### 30. Kaydedilenleri sırala

Dosya: [src/screens/KaydedilenlerScreen.js](../../src/screens/KaydedilenlerScreen.js), [App.js](../../App.js). [Bağımsız örnek çözüm](patches/30-kaydedilenleri-sirala.patch). Kaynak sayfa: 18.

Yeni kayıtlara ISO tarih eklenir. Kopya ters çevrilip tarihe göre sıralanır; eski tarihsiz kayıtlarda da son eklenen önce görünür. Ana dizi değiştirilmez.

Kontrol: A sonra B kaydet: B üstte olsun. A çıkarılıp yeniden eklenirse A üste gelsin; yeniden açılışta sıra korunsun.

- [ ] Kendim yazdım, cihazda gösterdim ve açıklayabildim. Sürem: ___ sn.

## Referanslar

- [React Native FlatList](https://reactnative.dev/docs/flatlist): index, numColumns ve ayraçlar.
- [React Navigation header seçenekleri](https://reactnavigation.org/docs/headers/): route.params ile başlık.
- [AsyncStorage 2.x API](https://react-native-async-storage.github.io/2.0/API/): bu projedeki 2.2.0 sürümünün getItem/setItem arayüzü. Yeni 3.x API'sini bu örneklere karıştırma.

Hazırlık materyali bütün görevleri kapsar. Öğrencinin hız, açıklama ve gerçek telefon yeterliliği kendi süreli denemeleriyle doğrulanır.
