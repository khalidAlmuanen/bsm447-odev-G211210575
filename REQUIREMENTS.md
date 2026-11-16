# BSM447 - قائمة المتطلبات والمتابعة

تاريخ المراجعة: 16 نوفمبر 2026. المصدر الرسمي: `BSM447_Donem_Odevi.pdf`، قُرئت صفحاته الـ18 وفُحصت صور الصفحات 1 و2 و5 و9 و17 و18.

`PASS`: تحقق فعلي ضمن الدليل المذكور. `PARTIAL`: تنفيذ موجود يحتاج اختباراً إضافياً. `TODO`: لم ينفذ. `BLOCKED`: يحتاج إجراءً خارج بيئة العمل الحالية.

## الهوية والنطاق المؤكد

- PASS - ص5: `G211210575`، المجموعة `2. öğretim` التي تبدأ في ص4، `K08 Nobel Ödülleri`، `b · Kimya`، الإضافة `7 · Karanlık / aydınlık tema`. الدليل: نص الصف وجدوله المرئي في PDF.
- PASS - ص3: `B211210575` طالب آخر، تكليفه `K02-d` وقاعدته 6؛ لم يُستخدم لتحديد هذا المشروع.
- PASS - المشروع الحالي `nobel-chemistry`، JavaScript blank؛ Expo `58.0.25`، React `19.3.0`، React Native `0.88.1`. الملفات: `package.json`, `app.json`, `App.js`, `index.js`. الدليل: قراءة الملفات و`npm ls --depth=0` قبل التعديل.
- المرحلة الحالية: اكتملت Phase 1، ثم أذن الطالب بالمتابعة فنُفذت Phase 2 فقط: Nobel Chemistry API وFlatList والبحث والترتيب. لا حفظ أو ثيمات حتى الآن، ولا commit أو push دون موافقة.

## المتطلبات الرسمية العامة

- PASS - ص1: مشروع React Native + Expo. الملفات: `package.json`, `index.js`. الدليل: فحص الاعتماديات ونقطة التسجيل الحالية.
- TODO - ص1: توافق SDK مع Expo Go على جهاز العرض. الملف: `package.json`. الاختبار المطلوب: تشغيل على الهاتف؛ لم يُتحقق من نسخة Expo Go على هاتف الطالب.
- PASS - ص1: شُغّل `npx --yes expo-doctor --verbose` بعد Phase 1 ونجح 20/20 (exit 0). فشل اتصال TLS في المحاولة الأولى ثم نجحت التالية؛ يجب إعادة الفحص قرب العرض النهائي.
- PARTIAL - ص1: `NavigationContainer` ثم Stack يحتوي `MainTabs` و`Detay`؛ تبويبا `Liste` و`Kaydedilenler` داخل MainTabs. الملف: `App.js`. نجحت انتقالات JavaScript في اختبار DOM الفعلي أدناه وبناء Android؛ اللمس والتخطيط وزر الرجوع النظامي على الهاتف لم تختبر.
- PARTIAL - ص1: `route.params` مستخدم دون متغير عام. الملفات: `src/screens/ListeScreen.js` و`src/screens/DetayScreen.js`. Phase 2 تمرر السجل الحقيقي كاملاً في `odulSahibi`؛ تحقق اختبار DOM من ظهور اسم المختار والعودة مع بقاء البحث. اختبار الهاتف متبقٍ.
- PASS - ص1، ضمن اختبار JavaScript مع اتصال حقيقي: جلب بيانات أثناء التشغيل باستخدام `fetch` و`useEffect`، دون JSON بديل داخل المشروع. الملف: `src/screens/ListeScreen.js`. الدليل: 30 سجلاً من API الفعلي في اختبار Phase 2؛ اختبار شبكة الهاتف متبقٍ.
- PASS - ص1، ضمن اختبار JavaScript: `FlatList` و`keyExtractor={(item) => String(item.id)}`. الملف: `src/screens/ListeScreen.js`. الدليل: 30 معرفاً فريداً في الاستجابة، وعرض الصفوف بالترتيب الصحيح، ولا تحذيرات مفاتيح ملتقطة.
- PASS - ص1، ضمن اختبار JavaScript: `TextInput` للبحث دون حساسية لحالة الأحرف. الملف: `src/screens/ListeScreen.js`. الدليل: `aziz` و`  AZIZ  ` يعيدان Aziz Sancar؛ بحث بلا نتائج ثم مسحه يعيد القائمة دون طلب جديد. لوحة مفاتيح الهاتف متبقية للاختبار.
- TODO - ص1: زر `Kaydet / Kaydedilenlerden çıkar` داخل Detay يعكس حالة السجل. الملف المستهدف: `src/screens/DetayScreen.js`، Phase 4. الاختبار: إضافة وإزالة وتزامن الشاشات.
- TODO - ص1: شاشة Kaydedilenler تعرض المحفوظات وتحتفظ بها بعد إغلاق التطبيق وفتحه. الملفات المستهدفة: `App.js` وشاشتا التفاصيل والمحفظات، Phase 4. الاختبار: إضافة وإزالة ثم إنهاء التطبيق وإعادة فتحه.
- TODO - ص1: اسم وأيقونة خاصة بالتطبيق. الملف: `app.json` و`assets/`. الاسم الحالي خاص بالمشروع؛ الأيقونة لا تزال أيقونة القالب.
- TODO - ص2: فهم وشرح كل سطر، وتجنب نسخ تطبيق طالب آخر. الدليل المطلوب: شرح الطالب للكود بنفسه.

## K08-b: متطلبات Nobel Chemistry الرسمية

المصدر لكل البنود التالية ص9، إلا حيث يذكر غير ذلك. نُفذت القائمة في Phase 2، والتفاصيل والحفظ مؤجلان إلى Phase 3/4.

- PASS - العنوان المحدد: `https://api.nobelprize.org/2.1/laureates?limit=30&nobelPrizeCategory=che`. الملف: `src/screens/ListeScreen.js`. اختُبر الطلب الفعلي عند تشغيل التطبيق في DOM؛ لا استبدال للفئة أو بيانات API ثابتة.
- PASS - ضمن اختبار JavaScript: عرض `knownName.en` أو `orgName.en` عند غياب الأول، ثم `İsim bilgisi yok` عند غيابهما. الملف: `src/screens/ListeScreen.js`. اختُبرت البيانات الحقيقية وحالات نقص مصطنعة داخل الاختبار فقط.
- PASS - ضمن اختبار JavaScript: سنة الجائزة من `nobelPrizes[0].awardYear` والترتيب التنازلي، والمجهول في النهاية بنص `Bilinmiyor`. الملف: `src/screens/ListeScreen.js`. جرى التحقق من صفوف البيانات الحية ومن عدم تعديل مصفوفة المصدر. الاتجاه التنازلي اختيار واجهة في تعليمات الطالب؛ PDF لا يحدد الاتجاه.
- PASS - استخدام `id` كمفتاح. الملف: `src/screens/ListeScreen.js`. الدليل: 30 معرفاً فريداً من API، واستبعاد السجلات بلا معرف في اختبار الحالات الناقصة.
- TODO - عرض `birth.date` و`birth.place.country.en` في التفاصيل. الملف المستهدف: `src/screens/DetayScreen.js`. الاختبار: تواريخ وبلدان موجودة ومفقودة.
- TODO - عرض `nobelPrizes[0].motivation.en` و`wikipedia.english`. الملف المستهدف: `src/screens/DetayScreen.js`. الاختبار: فحص JSON الحقيقي لشكل Wikipedia قبل استخدامه كرابط.
- TODO - حساب العمر في سنة الجائزة من تاريخ الميلاد، بنص مثل `Ödülü 47 yaşında aldı`. الملف المستهدف: `src/screens/DetayScreen.js`. الاختبار: سنوات معروفة، تاريخ ناقص، بيانات مفقودة؛ السنة وحدها لا تعطي العمر الدقيق في يوم منح الجائزة.

## الإضافة الإلزامية الخاصة بك: القاعدة 7

- TODO - ص2 وص5: `Switch` ظاهر يبدل Karanlık / Aydınlık. الملفات المستهدفة: `App.js` والشاشات، Phase 5. الاختبار: التبديل في الشاشات الثلاث.
- TODO - ص2: حفظ اختيار الثيم وإعادته عند فتح التطبيق. الملف المستهدف: `App.js` باستخدام AsyncStorage، Phase 5. الاختبار: إنهاء التطبيق وفتحه لكل من الخيارين.
- TODO - تعليمات الطالب، تطبيقاً لاتساق الثيم: ألوان النصوص والخلفيات وStack header وBottom Tabs قابلة للقراءة في الوضعين. الاختبار: فحص مرئي على الجهاز.
- القواعد 1-6 و8-10 ليست إضافات معينة لهذا الطالب. خصوصاً القاعدة 5 (مؤشر تحميل ورسالة خطأ مع إعادة المحاولة) ليست إضافتك، لكن المعالجة الآمنة للأخطاء مطلوبة في تعليماتك الخاصة.

## اختيارات الطالب ومتطلبات المتانة، منفصلة عن حرفية PDF

- PASS - JavaScript بدلاً من TypeScript؛ PDF ص1 يسمح بالاثنين. الدليل: `App.js` و`index.js`.
- TODO - AsyncStorage بدلاً من SQLite؛ PDF ص1 يسمح بالاثنين. النسخة المتوافقة لـExpo 58 هي `2.2.0`؛ لم تثبت في Phase 1.
- PASS - فحص المصدر: دوال JavaScript بسيطة و`StyleSheet.create` و`useState` و`useEffect`؛ بلا Redux أو Zustand أو Router أو طبقات معقدة. الملفات: `App.js`, `src/screens/*.js`.
- PARTIAL - حالات Liste مكتملة ومختبرة في DOM: تحميل وخطأ وزر `Tekrar dene` وعدم وجود نتائج وقيم بديلة للاسم والسنة، وكل النصوص تركية. الملف: `src/screens/ListeScreen.js`. تفاصيل الحقول المتبقية واختبار الهاتف مؤجلان.
- PASS - قبل Phase 2 فُحصت استجابة `laureates` و`nobelPrizes` الحقيقية: 30 سجلاً، وكل سجل في هذه الاستجابة يحتوي جائزة Chemistry واحدة في `[0]`، فلا تعارض حالي مع ص9. `wikipedia.english` رابط نصي؛ لا استخدام له في الواجهة حتى Phase 3. إن تغيرت البيانات وظهرت جوائز متعددة تُراجع قبل تغيير دلالة `[0]`.
- TODO - مشاركة حالة المحفوظات بين الشاشات وتخزين بيانات كافية لعرضها دون اتصال API، مع إزالة السجلات من Kaydedilenler. الملفات المستهدفة: `App.js` وشاشتا التفاصيل والمحفوظات، Phase 4.
- TODO - تعامل آمن مع التواريخ الجزئية، وعدم تقديم عمر يوم الجائزة على أنه دقيق حين لا تدعمه البيانات. Phase 3.
- شيفرة المثال المتاح خارج المشروع: `../Uygulamalar/AppTest/App.js`، دالة بسيطة و`StyleSheet.create` ونصوص React Native. لا يحتوي مثال Navigation. مجلد `../Dersler` لا يحتوي ملفات؛ ملف الملاحظات PDF غير موثق على أنه شرائح الأستاذ. لا ادعاء بمطابقة مثال Navigation لم يتوفر.

## GitHub والتوثيق

- PASS - فحص read-only قبل التعديل: الفرع `master`، commit واحد `bf28af5 Initial commit` بتاريخ 16 نوفمبر 2026 (+03:00)، و`git remote -v` فارغ. PDF كان untracked؛ لم يُحذف أو يُعدّل. هذا فحص للتاريخ المسجل، وليس تدقيقاً مستقلاً في مصدره.
- TODO - ص1: مستودع public باسم `bsm447-odev-G211210575`. العنوان الذي قدمه الطالب: `https://github.com/khalidAlmuanen/bsm447-odev-G211210575.git`. لا يوجد remote محلي؛ لم تُتحقق علنية المستودع البعيد. أي ربط أو push ينتظر الموافقة.
- PASS - ص1: `node_modules` لا يدخل Git. الملف: `.gitignore`. الدليل: قواعد التجاهل وفحص الملفات المتعقبة؛ `.expo/` مهمل أيضاً.
- TODO - ص1: 10 commits ذات معنى على الأقل في 10 أيام مختلفة حقيقية بين 5 نوفمبر و15 ديسمبر 2026؛ التواريخ المعدلة وما بعد 15 ديسمبر 23:59 لا يُحتسب. المسجل حالياً: commit واحد في يوم واحد. لا تزوير تواريخ أو commits.
- TODO - ص1: رسائل تصف العمل الفعلي، دون `update` أو `asd`. اقتراح Phase 1 بعد الاختبار: `Üç ekran arasındaki geçişleri ekledim`. لم ينفذ commit.
- TODO - ص1: `README.md` يتضمن الرقم والموضوع والمتغير والإضافة وطريقة التخزين الدائم. الملف المستهدف: `README.md`، Phase 7.
- TODO - ص1: ثلاث لقطات شاشة حقيقية في README. الدليل المطلوب: التطبيق المنفذ، بلا صور مختلقة.
- TODO - ص1: رابط APK قابل للتنزيل في README. لا رابط APK متوفر الآن.
- TODO - ص1: رابط تسجيل حقيقي مدته دقيقة كحد أقصى يعرض الشاشات الثلاث. لا تسجيل متوفر الآن.
- لا commit أو push في هذه المرحلة؛ الإذن مطلوب صراحة من الطالب. خطة الأيام الـ12 في تعليمات الطالب أهداف مرنة وليست مواعيد commits مصطنعة.

## APK وOBİS والعرض

- TODO - ص1: إعداد `eas.json` بملف `preview` ينتج APK، وتشغيل `eas build -p android --profile preview`. Phase 7؛ لا بناء أو رفع الآن.
- TODO - ص1 وص2: تثبيت واختبار APK على Android أو محاكي؛ حتى عند العرض على iPhone يبقى APK ورابطه مطلوبين. الدليل المطلوب: تثبيت حقيقي.
- TODO - ص1: تجهيز `G211210575_BSM447.zip` بالمصدر والإعدادات دون `node_modules` و`.expo`. Phase 7.
- BLOCKED - ص1: الطالب يرفع ZIP شخصياً إلى OBİS ويتحقق من نجاح التسليم. الموعد: 15 ديسمبر 2026، 23:59 بتوقيت تركيا حسب تعليمات الطالب. GitHub وحده لا يكفي؛ عدم الرفع يعني عدم الدخول للتقييم ودرجة 0.
- BLOCKED - ص1 وص3: موعد العرض لهذا الرقم المنتهي بـ5 هو 17 ديسمبر 2026. الساعة تُعلن في OBİS؛ تحتاج تحقق الطالب من الموعد.
- TODO - ص1: تجهيز الهاتف/المحاكي والتطبيق والكمبيوتر المفتوح في VS Code وتشغيل `npx expo start` وشاحن؛ الشبكة نفسها أو `--tunnel` عند الحاجة.
- TODO - ص1: عرض التطبيق وإعادة فتحه للتحقق من بقاء المحفوظات، ثم شرح commit مختار، ضمن 5 دقائق.
- TODO - ص2: القدرة على شرح كل سطر؛ الحضور إلزامي. إذا تعذر API، يُستخدم التسجيل في README؛ لا تغيير للفئة أو المتغير من تلقاء الطالب.

## الامتحان العملي: تدريب منفصل، وليس نطاق Phase 1

ص17: مهمة واحدة من 30 بالقرعة، 2.5 دقيقة، دون أي دعم أثناء التقييم؛ تعاد القرعة إن تكررت وظيفة الإضافة المعيّنة. كل البنود التالية TODO (لم يختبر الطالب تنفيذها). الدليل المطلوب لكل بند: تنفيذه في نسخة تدريب آمنة ثم عرضه على الجهاز في الوقت المحدد.

### Görünüm - ص17

1. TODO - Zebra satırlar: لونان متناوبان لصفوف القائمة. الملف المستهدف: `ListeScreen.js`.
2. TODO - Başlık ve alt satır: تغيير حجم/لون العنوان وإضافة حقل API صغير رمادي. `ListeScreen.js`.
3. TODO - Yuvarlak görsel ve gölge: صورة دائرية أو حرف أول مع ظل. `ListeScreen.js`.
4. TODO - Uzun başlığı kısalt: عنوان من سطر واحد ينتهي بـ`…`. `ListeScreen.js`.
5. TODO - İki sütunlu bilgi: 3 معلومات على الأقل بتنسيق تسمية/قيمة. `DetayScreen.js`.
6. TODO - Boş Kaydedilenler: رمز و`Henüz kayıt yok` في الوسط. `KaydedilenlerScreen.js`.

### State - ص17

7. TODO - Beğeni sayacı: زر قلب يزيد العداد كل ضغطة. `DetayScreen.js`.
8. TODO - Liste / ızgara: تبديل عمود/عمودين. `ListeScreen.js`.
9. TODO - Aramayı temizle: زر يمسح البحث ويعيد جميع النتائج. `ListeScreen.js`.
10. TODO - Görselleri gizle: Switch لإظهار/إخفاء الصور أو النص الثانوي. `ListeScreen.js`.
11. TODO - Devamını göster: 3 أسطر أولاً ثم توسيع/طي النص. `DetayScreen.js`.
12. TODO - Kaydet düğmesinin durumu: `Kaydedildi ✓` ولون مختلف للمحفوظ ثم الإزالة عند الضغط ثانية. `DetayScreen.js`.

### Liste - ص17

13. TODO - Ters sıra: عكس العرض دون تعديل المصفوفة الأصلية. `ListeScreen.js`.
14. TODO - Sıra numarası: ترقيم الصفوف 1، 2، 3. `ListeScreen.js`.
15. TODO - Başlıkta toplam: `Toplam N kayıt` يتحدث مع البحث. `ListeScreen.js`.
16. TODO - Ayraç çizgisi: خط رمادي رفيع بين الصفوف. `ListeScreen.js`.
17. TODO - Sonuç bulunamadı: رسالة حين لا توجد نتائج بحث. `ListeScreen.js`.
18. TODO - A→Z sıralama: زر ترتيب أبجدي. `ListeScreen.js`.

### API - ص17

19. TODO - Parametre değiştir: تغيير معامل API إلى قيمة يحددها الأستاذ وعرض النتيجة. `ListeScreen.js`؛ تغيير تدريبي آمن فقط، لا تغيير تكليف Chemistry النهائي.
20. TODO - Yükleniyor göstergesi: مؤشر و`Yükleniyor…` حتى وصول البيانات. `ListeScreen.js`.
21. TODO - Hata mesajı: `Bağlantı yok` و`Tekrar dene` عند انقطاع الشبكة. `ListeScreen.js`.
22. TODO - Yeni alan: إضافة حقل API يختاره الأستاذ. `DetayScreen.js`.

### Navigasyon - ص18

23. TODO - Başlıkta kaydın adı: اسم السجل عنواناً لشاشة Detay. `App.js` أو `DetayScreen.js`.
24. TODO - Kaydedilenlerden detaya: فتح نفس Detay بالسجل المحفوظ المختار. `KaydedilenlerScreen.js`؛ زر تجربة Phase 1 لا يثبت هذا الشرط ببيانات محفوظة حقيقية.
25. TODO - Hakkında ekranı: شاشة جديدة للاسم والرقم والإصدار تصل إليها من قائمة أو تبويب. `App.js` وملف شاشة يُضاف عند التدريب فقط.
26. TODO - Sekme etiketi ve simgesi: تغيير تسمية وأيقونة تبويب. `App.js`.

### Kalıcı veri - ص18

27. TODO - Tümünü sil: تأكيد ثم حذف كل المحفوظات وبقاء الحالة الفارغة بعد إعادة الفتح. `KaydedilenlerScreen.js` وحالة الحفظ.
28. TODO - Kayıt tarihi: تخزين وعرض تاريخ ووقت الحفظ مثل `31.10.2026 14:05`. حالة الحفظ و`KaydedilenlerScreen.js`.
29. TODO - Son aramayı hatırla: استعادة نص آخر بحث عند فتح التطبيق. `ListeScreen.js`.
30. TODO - Kaydedilenleri sırala: الأحدث حفظاً أولاً. `KaydedilenlerScreen.js`.

## التوافق والمخاطر قبل التنفيذ

- Expo المثبت `58.0.25` يحدد محلياً في `node_modules/expo/bundledNativeModules.json`: screens `~4.30.1`، safe-area `~5.11.1`، AsyncStorage `2.2.0`. تطابقت مع صفحات Expo الرسمية الخاصة بـ58.
- React Navigation: native `7.5.2`، bottom-tabs `7.22.0`، native-stack `7.21.1`؛ بيانات npm الرسمية تقبل React >=18.2 وscreens/safe-area >=4.0. React الحالي 19.3.0 وRN 0.88.1 يحققان peer ranges. تحقق وقت التنفيذ على جهاز Expo Go لا يزال مطلوباً.
- Native Stack يحقق Stack Navigator المطلوب ويستخدم screens دون الحاجة لـgesture-handler أو reanimated في هذا النطاق. اختيار تنفيذ بسيط، وليس شرط حزمة محددة في PDF.
- `npx expo install --check` قبل التعديل: `Dependencies are up to date`، exit 0. Node `24.13.0` يلبي engines لحزمة Expo الحالية. لا سبب مثبت لتغيير SDK.
- لا Android SDK/adb أو محاكي ظاهر في الفحص؛ لا ادعاء باختبار هاتف أو APK. يمكن اختبار JavaScript/الحزم وبناء Android، وتبقى خصائص الجهاز والرجوع النظامي بحاجة اختبار فعلي.
- لا remote مضبوط محلياً؛ لا تغيير للفروع أو التاريخ أو إعدادات remote في Phase 1.
- الأيقونة قالب افتراضي، README وAPK والتسجيل غير مكتملة؛ لا تعد Phase 1 تطبيقاً نهائياً.
- فُحصت استجابة Nobel قبل Phase 2: `laureates` هو مصفوفة النتائج، وChemistry موجودة في `[0]` للسجلات الـ30 الحالية، وWikipedia رابط نصي. فحص التواريخ الجزئية وحساب العمر يبقى قبل Phase 3.
- العنوان المعيّن يعيد أول 30 اسماً، وليس أحدث 30 فائزاً. يجري ترتيب هذه المجموعة فقط حسب السنة؛ لا تغيير للعنوان ولا إضافة pagination أو طلب كل النتائج ضمن Phase 2. `meta.count` في الاستجابة المقروءة 200، و`laureates.length` يساوي 30.
- كشف `npm audit --json` بعد التثبيت 3 تقارير متوسطة في سلسلة `expo → @expo/fingerprint → minimatch`، دون تقارير high/critical. الأمر exit 1 لهذا السبب. لم يُشغّل `audit fix --force`؛ اقتراحه التلقائي يغير Expo إلى 52.0.49 ويخالف نطاق هذه المرحلة. يلزم مراجعة تحديث آمن لاحقاً، لا تبديل SDK بلا سبب توافق مثبت.
- المقارنة مع `HEAD:package-lock.json` أكدت أن إصدارات السلسلة المذكورة كانت موجودة قبل Phase 1 ولم تتغير: expo 58.0.25، fingerprint 0.21.10، minimatch 10.2.6. لا يُنسب أصل هذه التنبيهات إلى حزم التنقل الجديدة.

## المصادر التقنية

- React Navigation: https://reactnavigation.org/docs/getting-started/
- Native Stack: https://reactnavigation.org/docs/native-stack-navigator/
- Expo 58 screens: https://docs.expo.dev/versions/v58.0.0/sdk/screens/
- Expo 58 safe area: https://docs.expo.dev/versions/v58.0.0/sdk/safe-area-context/
- Expo 58 AsyncStorage: https://docs.expo.dev/versions/v58.0.0/sdk/async-storage/
- npm metadata: `npm view <package>@<version> peerDependencies --json` من https://registry.npmjs.org/.

## أدلة اختبارات Phase 1

أُنشئت القائمة قبل تعديل التطبيق ثم حُدّثت بالنتائج الآتية عند نهاية Phase 1. هذه أدلة تاريخية لتلك المرحلة؛ أدلة Phase 2 في الفقرة التالية.

### الاعتماديات والملفات

- PASS - `npx expo install @react-navigation/native@7.5.2 @react-navigation/bottom-tabs@7.22.0 @react-navigation/native-stack@7.21.1 react-native-screens react-native-safe-area-context`، exit 0؛ أضاف 22 حزمة إجمالاً مع الاعتماديات الفرعية، وخمس اعتماديات مباشرة فقط في `package.json`.
- PASS - `npm ls --depth=0`: native 7.5.2، bottom-tabs 7.22.0، native-stack 7.21.1، screens 4.30.1، safe-area-context 5.11.1. لا AsyncStorage أو Expo Router أو حزم Web أضيفت إلى التطبيق.
- PASS - `npx expo install --check`: `Dependencies are up to date`.
- PASS - `npx --yes expo-doctor --verbose`: `20/20 checks passed. No issues detected!`، exit 0؛ النسخة المستخدمة expo-doctor 1.21.8.
- PASS - `git diff --check`: exit 0؛ تحذيرات LF/CRLF من إعداد Git المحلي، دون أخطاء whitespace.
- PASS - مقارنة `package.json` مع `HEAD`: Expo وReact وReact Native وexpo-status-bar لم تتغير إصداراتها. `app.json`, `index.js`, `.gitignore` لم تعدل. لم تُعدّل إعدادات Git أو يُنشأ commit أو push.
- PASS - فحص مصدر المرحلة: لا تنفيذ لـAPI أو AsyncStorage أو theme switching.

### بناء Android

- PASS - `npx expo export --platform android --output-dir C:\Users\server\AppData\Local\Temp\bsm447-review\android-export --max-workers 2`، exit 0.
- النتيجة الفعلية: `Android Bundled 113492ms index.js (853 modules)`؛ حزمة Hermes بحجم 1.9 MB و17 asset. هذا export لحزمة JavaScript وليس APK، ولا يثبت تشغيل native على جهاز.

### اختبار التنقل الآلي

الأمر: `node C:\Users\server\AppData\Local\Temp\bsm447-review\navigation-test.cjs`، exit 0. يشغل حزمة `App.js` الحقيقية في JSDOM 27.2.0 مع React Native Web وReact Navigation الحقيقيين؛ لا mocks للشاشات أو navigators. استُخدم shim لـResizeObserver لأن JSDOM لا يحتوي محرك تخطيط. الملفات المساعدة والنتائج خارج المستودع تحت `C:\Users\server\AppData\Local\Temp\bsm447-review`.

حزم Web الموجودة مسبقاً في `../Uygulamalar/AppTest/node_modules` استُخدمت للاختبار فقط: react-dom 19.3.0 وreact-native-web 0.21.4. إعداد Metro المؤقت يثبت React من مشروع nobel-chemistry لتجنب نسختين من React. JSDOM ثُبت في مجلد الاختبار المؤقت فقط. لم تتغير ملفات AppTest ولم تنشأ نسخة ثانية من تطبيق Expo. خادم الاختبار كان على localhost وأُوقف بعد الانتهاء.

1. PASS - عرض Liste أولاً مع تحديد تبويب Liste ووجود التبويبين.
2. PASS - Liste → Detay، وعرض `route.params.kaynak = Liste`.
3. PASS - `navigation.goBack()` يعيد إلى Liste.
4. PASS - Bottom Tab يفتح Kaydedilenler مع رسالة الحالة الفارغة.
5. PASS - Kaydedilenler → نفس Detay بمعاملات جديدة من Kaydedilenler دون بقاء مصدر Liste.
6. PASS - الرجوع يعيد إلى تبويب Kaydedilenler المحدد.
7. PASS - التبديل إلى Liste مجدداً.
8. PASS - لا أخطاء JavaScript التقطها الاختبار النهائي.

حدود الدليل: اختبار DOM لا يتحقق من المظهر المرئي أو safe area أو اللمس أو زر Android النظامي أو سلوك native-stack على جهاز. محاولة التحكم بالمتصفح أُوقفت بواسطة Computer Use لأنه تعذر تحديد عنوان نافذة Chrome بثقة؛ لم يكتمل اختبار متصفح يدوي أو اختبار هاتف.

### المطلوب على هاتف الطالب

1. BLOCKED - تشغيل `npx expo start` وفتح المشروع في Expo Go المتوافق مع SDK 58.
2. TODO - تأكيد ظهور Liste أولاً، والتبديل بين Liste وKaydedilenler.
3. TODO - بعد Phase 2: من Liste اضغط صف صاحب جائزة، ومن Kaydedilenler اضغط `Detay ekranını dene` المؤقت؛ تحقق من المصدر وغياب شريط التبويبات في Detay.
4. TODO - العودة بزر `Geri dön` وسهم الهيدر؛ على Android اختبر زر/إيماءة الرجوع النظامية أيضاً، وتأكد من العودة إلى نفس التبويب.
5. TODO - التحقق من وضوح النصوص وعدم تداخلها مع حواف الشاشة أو شريط النظام.

تمرين Phase 1 السابق: تغيير نص زر التجربة مع الإبقاء على اسم مسار Detay؛ زر Liste المؤقت استُبدل بصفوف API في Phase 2.

اقتراح commit للمرحلة الأولى: `Üç ekran arasındaki geçişleri ekledim`؛ اقتراح فقط. لم يُنفذ commit. أذن الطالب لاحقاً بالمتابعة إلى Phase 2.

## Phase 2 - التنفيذ وأدلة الاختبار

نُفذت هذه المرحلة بعد طلب الطالب «اكمل من حيث توقفت». لا اعتماديات جديدة، ولا تغيير لـExpo أو إعدادات Git.

### الملفات

- `src/screens/ListeScreen.js`: `useEffect` لجلب العنوان المعيّن و`useState` للبيانات والبحث والتحميل والخطأ وإعادة المحاولة. `filter` ينتج مصفوفة جديدة قبل `sort`، والبحث يعمل على الاسم بـ`trim().toLowerCase()`، والصف يمرر `odulSahibi` عبر `route.params`.
- نفس الملف: `AbortController` يلغي الطلب عند إزالة الشاشة، مع علم `aktif` لمنع تحديث حالة شاشة أزيلت. الطلب غير المستجيب يُلغى بعد 20 ثانية ويظهر خطأ قابل لإعادة المحاولة.
- `src/screens/DetayScreen.js`: يقرأ السجل المختار ويعرض اسمه فقط للتحقق من المعاملات؛ لم تُنفذ حقول الميلاد أو الدافع أو Wikipedia أو حساب العمر بعد.
- `REQUIREMENTS.md`: تحديث الحالات والأدلة. لا تعديل إضافي لـ`App.js`, `KaydedilenlerScreen.js`, `package.json`, `package-lock.json`, `app.json` في Phase 2.

### فحص API الفعلي قبل التنفيذ وأثناء الاختبار

- PASS - HTTP 200 من العنوان المطلوب؛ المفاتيح العليا: `laureates`, `meta`, `links`.
- PASS - 30 سجلاً و30 معرفاً فريداً. كل الجوائز الحالية في `[0]` هي Chemistry.
- PASS - عند تشغيل حزمة التطبيق في الاختبار، أُجري fetch حي آخر إلى نفس العنوان. أول صف بعد الترتيب: David Baker، 2024. رُسمت أول 10 صفوف في FlatList عند بدء الاختبار؛ virtualization لا تعني أن استجابة API تحتوي عشرة فقط.
- النسخ المقروءة من API لأغراض الفحص والاختبار موجودة خارج المشروع في `%TEMP%/bsm447-review` فقط؛ لا JSON بيانات بديل داخل مصدر التطبيق.

### الاختبارات الآلية: 20/20 ناجحة، exit 0

الأمر: `node C:\Users\server\AppData\Local\Temp\bsm447-review\phase2-test.cjs`.

يختبر حزمة التطبيق الفعلية مع React Navigation وReact Native Web وFlatList الحقيقيين في JSDOM 27.2.0. الجلب في اختبار القائمة حي؛ سيناريوهات الأعطال والحقول الناقصة مصطنعة داخل الاختبار فقط. ResizeObserver shim يعوض غياب محرك التخطيط؛ مهلة 20 ثانية سُرّعت إلى 25ms في اختبار المهلة وحده.

1. PASS - عرض التحميل وطلب العنوان المحدد مرة واحدة عبر useEffect.
2. PASS - استجابة حية فيها 30 صاحب جائزة Chemistry بمعرفات فريدة.
3. PASS - الأسماء والسنوات وترتيب الصفوف المرئية تنازلياً تطابق البيانات الحقيقية.
4. PASS - البحث `aziz` يعيد Aziz Sancar.
5. PASS - البحث `  AZIZ  ` يعيد النتيجة نفسها.
6. PASS - البحث غير الموجود يعرض `Sonuç bulunamadı.`.
7. PASS - مسح البحث يعيد القائمة دون طلب API جديد.
8. PASS - ضغط صف حقيقي يفتح Detay باسم صاحب الجائزة المختار والمصدر Liste.
9. PASS - الرجوع يحافظ على نص البحث ونتيجته دون إعادة الجلب.
10. PASS - تبويب Kaydedilenler وزر التجربة والرجوع ثم العودة إلى Liste تعمل دون بقاء اسم المختار السابق في تفاصيل تجربة المحفوظات أو طلب زائد.
11. PASS - فشل شبكة مصطنع يظهر رسالة تركية وينهي التحميل.
12. PASS - `Tekrar dene` يرسل طلباً إضافياً واحداً ويستعيد البيانات.
13. PASS - HTTP 503 يُعالج دون انهيار JavaScript.
14. PASS - JSON غير صالح يُعالج دون انهيار JavaScript.
15. PASS - غياب مصفوفة laureates يُعالج دون انهيار JavaScript.
16. PASS - JSON بقيمة null يُعالج دون انهيار JavaScript.
17. PASS - مصفوفة API فارغة تظهر رسالة حالة فارغة، دون تصنيفها كخطأ شبكة.
18. PASS - orgName والبحث فيه، وغياب الاسم/السنة، والسجلات بلا معرف، وعدم تعديل مصفوفة المصدر؛ هذه حالات مصطنعة داخل ملف الاختبار فقط.
19. PASS - انتهاء المهلة يلغي الطلب غير المستجيب ويعرض خطأ يمكن إعادة محاولته.
20. PASS - لا أخطاء JavaScript ملتقطة في التشغيل النهائي للاختبارات.

### البناء والفحوص الأخرى

- PASS - `npx expo export --platform android --output-dir C:\Users\server\AppData\Local\Temp\bsm447-review\phase2-android-export --max-workers 2`، exit 0. النتيجة: `Android Bundled 15019ms index.js (853 modules)` وحزمة Hermes نحو 2 MB. هذا ليس APK أو اختبار تشغيل هاتف.
- PASS - `npx expo install --check`: `Dependencies are up to date`، exit 0.
- PASS - `git diff --check`: exit 0.
- فحص expo-doctor السابق 20/20 يخص Phase 1؛ لم يُعد في Phase 2 لعدم تغيير الاعتماديات أو إعدادات Expo.
- لم يُستخدم Computer Use أو متصفح فعلي في هذه المرحلة. لا اختبار هاتف أو محاكي أو APK، ولا اختبار لوحة مفاتيح native أو اللمس أو الرجوع النظامي.

### ما يجربه الطالب على الهاتف

1. تشغيل `npx expo start` وفتح التطبيق في Expo Go المتوافق مع SDK 58.
2. انتظار تحميل القائمة والتمرير حتى نهايتها؛ تحقق من ترتيب السنوات، وابحث عن `aziz` و`AZIZ` ثم بحث بلا نتائج ثم امسحه.
3. فتح Aziz Sancar من صفه ثم الرجوع؛ ينبغي بقاء البحث، وتجربة التنقل إلى Kaydedilenler والعودة.
4. إعادة فتح التطبيق مع إنترنت مقطوع، ثم إعادة الاتصال وضغط `Tekrar dene`؛ لا اختبار حفظ أو ثيمات الآن لأنهما غير منفذين.

تمرين صغير: غيّر المقارنة في `sort` من `yilGetir(b) - yilGetir(a)` إلى `yilGetir(a) - yilGetir(b)`، وتوقع النتيجة ثم تحقق منها، وأعد الترتيب التنازلي بعد التدريب.

اقتراح commit: `Nobel kimya verilerini listeleyip arama ve sıralama ekledim`. لم يُنفذ commit أو push. التاريخ المحلي ما زال يحتوي commit واحداً في يوم واحد، والفرع `master` بلا remote. المرحلة التالية Phase 3 (التفاصيل وحساب العمر) تنتظر مراجعة الطالب.
