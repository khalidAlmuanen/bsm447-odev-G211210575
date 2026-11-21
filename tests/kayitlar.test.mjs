import test from 'node:test';
import assert from 'node:assert/strict';
import { KAYIT_ANAHTARI, kayitGecerliMi, kayitlariCoz } from '../src/utils/kayitlar.js';

// Yalnızca depolama testleri için oluşturulmuş örnek kayıt.
const kayit = {
  id: 'test-1',
  knownName: { en: 'Test Kimyacı' },
  birth: { date: '1980-00-00', place: { country: { en: 'Test Country' } } },
  nobelPrizes: [{ category: { en: 'Chemistry' }, awardYear: '2020', motivation: { en: 'Test reason' } }],
  wikipedia: { english: 'https://en.wikipedia.org/wiki/Example' },
};

test('Depolama anahtarı uygulamaya ve veri sürümüne özgüdür', () => {
  assert.equal(KAYIT_ANAHTARI, '@nobel-chemistry/kaydedilenler/v1');
});

test('İlk açılış ve saklanmış boş liste boş dizi döndürür', () => {
  assert.deepEqual(kayitlariCoz(null), []);
  assert.deepEqual(kayitlariCoz('[]'), []);
});

test('Tam kayıt tüm detay alanlarıyla geri yüklenir', () => {
  const json = JSON.stringify([kayit]);
  assert.deepEqual(kayitlariCoz(json), [kayit]);
});

test('Tekrar eden kimlikte ilk tam kayıt korunur', () => {
  const ilk = { ...kayit, id: '923' };
  const tekrar = { ...kayit, id: 923, knownName: { en: 'Tekrar' } };
  const baska = { ...kayit, id: 'test-2' };
  assert.deepEqual(kayitlariCoz(JSON.stringify([ilk, tekrar, baska])), [ilk, baska]);
});

test('Sayısal kimlik ve eksik isteğe bağlı alanlar desteklenir', () => {
  assert.equal(kayitGecerliMi({ id: 1, nobelPrizes: [{ category: { en: 'Chemistry' } }] }), true);
});

const gecersizKayitlar = [
  null, [], 'test', {}, { ...kayit, id: '' }, { ...kayit, id: '  ' },
  { ...kayit, id: null }, { ...kayit, id: true }, { ...kayit, id: Infinity },
  { ...kayit, nobelPrizes: [] },
  { ...kayit, nobelPrizes: [{ category: { en: 'Physics' } }] },
];

for (const [index, ornek] of gecersizKayitlar.entries()) {
  test(`Geçersiz kayıt reddedilir: ${index + 1}`, () => {
    assert.equal(kayitGecerliMi(ornek), false);
  });
}

for (const json of ['{bad-json', 'null', '{}', '42', '[null]', JSON.stringify([kayit, {}])]) {
  test(`Bozuk depolama verisi sessizce boş listeye dönüştürülmez: ${json}`, () => {
    assert.throws(() => kayitlariCoz(json));
  });
}
