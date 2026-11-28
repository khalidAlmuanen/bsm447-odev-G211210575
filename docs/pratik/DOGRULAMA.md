# Phase 8 doğrulama kaydı

28 Kasım 2026 · G211210575 · K08-b Kimya · ek kural 7.

## Kapsam

Ödevin Ek 3, s.17–18 bölümü metin ve sayfa görüntüsü üzerinden yeniden karşılaştırıldı. [Rehber](README.md) ve [görev dizini](gorevler.json), 1–30 numaralarının tamamını içerir. PDF yerel ve Git dışında tutulur.

Teslim uygulamasının `App.js`, `src/`, `package.json`, `package-lock.json`, `app.json`, `eas.json` ve ignore/lisans dosyaları `83dc794` ile aynıdır. Çalışma çözümleri yalnız `docs/pratik/patches/` altındadır; uygulamaya eklenmiş 30 yeni özellik değildir. `.easignore` içindeki `/docs/` bunları APK derleme arşivinden de çıkarır. APK yeniden üretilmedi.

Yeni `.gitattributes` kuralı yalnız eğitim patch'lerinde LF satır sonlarını korur. Unified diff'in boş bağlam satırındaki gerekli tek boşluk, bu dosyalarda kod boşluğu hatası sayılmaz; uygulama dosyalarının kuralları değiştirilmez.

## Yapılan kontroller

- `npm test`: **105/105 PASS**, 0 fail, 0 skipped. Bunlar uygulamanın mevcut yardımcı fonksiyon, tarih/yaş, kayıt doğrulama, tema ve kontrast testleridir; patch'lerin ekran testleriyle aynı test kümesi değildir. Node'un `MODULE_TYPELESS_PACKAGE_JSON` uyarısı ölümcül değildir; proje yapılandırması uyarıyı gizlemek için değiştirilmedi.
- **30/30 patch** için temiz, detached `83dc794` worktree üzerinde `git apply --check --whitespace=error-all` başarılı. Ayrıca her patch ayrı kaynak kopyasına uygulandı; **30/30** ters patch için `git apply --reverse --check --whitespace=error-all` başarılı. Uygulama/geri alma kontrolleri gerçek dosyalarla yapıldı; ana çalışma dosyaları değiştirilmedi.
- **30/30 bağımsız kaynak kopyası** mevcut bağımlılıklarla Metro üzerinden web JavaScript paketi olarak derlendi. Yeni paket kurulmadı, SDK değiştirilmedi. Bu kontrol APK derlemesi değildir.
- **30/30 görev grubu** gerçek ekran kodu, React Navigation ve AsyncStorage web uygulamasıyla geçici JSDOM ortamında kontrol edildi. Her kopya kendi patch'ini içerdi. Test düzeni native başlangıç kodu yerine web başlangıcını kullanır; uygulamanın kaynak koduna mock eklenmedi.
- Canlı Nobel API'nin `limit=30&nobelPrizeCategory=che` yanıtı alındı. Etkileşim kontrollerinde bu yanıttaki David Baker, Aziz Sancar ve Aaron Ciechanover kayıtları kullanıldı; yanıt/çevrimdışı hataları test düzeninde üretildi. Görev 19'un `limit=10&nobelPrizeCategory=che` adresi ayrıca gerçek ağ üzerinden **HTTP 200, 10 Chemistry kaydı** döndürdü. Üretim API adresi değiştirilmedi.

Geçici test düzeni ve derleme çıktıları depo dışındadır. `npm test` geçici ekran kontrollerini çalıştırmaz; telefon provası için rehberdeki görev kontrollerini izleyin.

Kontrol ortamı: Node 24.13.0, npm 11.6.2, Metro 0.87.1, React Native Web 0.21.4, JSDOM 27.2.0. Uygulama Expo 58.0.26 ve AsyncStorage 2.2.0 üzerinde kaldı.

## Görev bazında gözlenen sonuçlar

1. PASS — Satırların arka planı A/B/A olarak değişti.
2. PASS — Başlık için üretilen CSS `20px` oldu; API'den doğum ülkesi alt satırda göründü. JSDOM'un font shorthand hesaplaması yerine eşleşen CSS kuralı incelendi; gerçek yazı görünümü telefonda kontrol edilmeli.
3. PASS — Baş harf, 48px genişlik ve 24px köşe yarıçapıyla gösterildi. Android gölgesi görsel olarak bu testte ölçülmedi.
4. PASS — Başlık için tek satır/ellipsis CSS'i üretildi; gerçek kesilme genişliğini telefonda deneyin.
5. PASS — Detay'da yıl, doğum tarihi ve ülke üç ayrı, iki sütunlu satırda gösterildi.
6. PASS — Boş Kaydedilenler'de yıldız ve `Henüz kayıt yok` göründü.
7. PASS — Beğeni sayacı `♥ 0 → ♥ 1 → ♥ 2` oldu.
8. PASS — Liste → Izgara → Liste geçişi, satır genişliği ve yeniden oluşturma çalıştı; Android yerleşimi ayrıca denenmeli.
9. PASS — `AZIZ` araması tek kayıt gösterdi; `✕` aramayı boşaltıp üç kaydı geri getirdi.
10. PASS — Switch ödül yılı alt satırlarını gizledi ve geri getirdi.
11. PASS — `Devamını göster` / `Gizle` geçişleri çalıştı.
12. PASS — Kaydetme `Kaydedildi ✓` metnini ve rengi değiştirdi; tekrar basınca kayıt kalıcı olarak kaldırıldı.
13. PASS — Sıra ters çevrildi ve geri döndü; kaynak veri değişmedi.
14. PASS — Görüntülenen sıra numaraları filtrelemeden sonra yeniden 1'den başladı.
15. PASS — Aramayla `Toplam 3 → 1 → 0 kayıt` oldu.
16. PASS — Üç kayıt arasında iki ince ayraç üretildi.
17. PASS — Eşleşmeyen aramada `Sonuç bulunamadı` göründü.
18. PASS — A→Z sırası ve ödül yılı sırasına dönüş çalıştı; kaynak veri değişmedi.
19. PASS — Fetch `limit=10` kullandı; dönen kayıtlar gösterildi. Ayrı canlı istek on kayıt döndürdü. Hocanın seçeceği başka parametre için rehberdeki kategori uyarısı geçerlidir.
20. PASS — Yanıt beklerken spinner ve `Yükleniyor…`, sonra kayıtlar gösterildi.
21. PASS — Simüle edilmiş ağ hatasında `Bağlantı yok`; bağlantı geri gelince `Tekrar dene` ile kayıtlar gösterildi.
22. PASS — Yeni şehir alanı Detay'da gösterildi: Aaron Ciechanover için Haifa.
23. PASS — Navigation header seçilen kayıt adı David Baker oldu.
24. PASS — Kaydedilenler'deki Aziz Sancar aynı Detay ekranına tam kayıtla açıldı.
25. PASS — Hakkında'da ad, G211210575 ve app.json sürümü 1.0.0 göründü; Stack geri geçişi Liste'yi açtı.
26. PASS — `Favoriler` etiketi ve kalp simgesi Kaydedilenler route'unu açtı.
27. PASS — Onay callback'leriyle vazgeçme kayıtları korudu, `Sil` yalnız kayıt anahtarını boşalttı; yeni uygulama örneğinde boş liste kaldı ve tema korundu. **Alert için test taklidi kullanıldı; Android onay penceresi bu testte açılmadı.**
28. PASS — ISO kayıt tarihi kaydedildi, tarih+saat gösterildi ve yeniden açılışta değişmedi. Eski tarihsiz/bozuk tarihli kayıtlarda `Bilinmiyor` gösterildi.
29. PASS — Son arama geri yüklendi, değişti ve boş değer de saklandı. Gecikmiş ilk okumadan önce yazma olmadı; okuma hatasında önceki arama korundu ve kutu kilitli kaldı. Kayıt ve tema anahtarları korundu.
30. PASS — En yeni tarih önce gösterildi; tarihsiz kayıtlar hata vermedi. Saklanan asıl dizi sırası değiştirilmedi ve görüntü sırası yeniden açılışta korundu.

## Henüz doğrulanmayanlar

- Bu 30 patch için Android/Expo Go üzerinde dokunma, fiziksel yerleşim, gölge, uzun metin ve native Alert provası yapılmadı. Phase 7'deki APK testi, bu eğitim varyantlarının cihaz testi sayılmaz.
- JSDOM kalıcılık denemeleri, ortak bir depoyla yeni uygulama örneği açar; gerçek telefonun process kapatma testi değildir.
- Öğrencinin görevleri **150 saniyede, desteksiz** yazıp anlatabilmesi otomatik testle kanıtlanamaz. Rehberdeki 30 kişisel prova kutusu boş bırakıldı.
- Git'teki en az 10 gerçek farklı gün, fiziksel telefon kontrolü ve kişisel OBİS teslimi ayrıca tamamlanmalıdır. Commit tarihleri değiştirilmez.

## Kısa tekrar

Rehberdeki ayrı worktree adımlarını kullanın. Tek patch seçin, önce kendiniz yazın, Expo Go'da görevdeki kontrolü yapın ve süreyi kaydedin. Çözümü ancak sonra karşılaştırın. Hoca parametre veya alan seçerse 19/22 örneklerinin değerini verilen isteğe uyarlayın.
