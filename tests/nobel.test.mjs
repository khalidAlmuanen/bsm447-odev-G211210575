import test from 'node:test';
import assert from 'node:assert/strict';
import { isimGetir, metinGetir, yilGetir } from '../src/utils/nobel.js';

test('knownName önce gelir; boş veya bozuksa orgName kullanılır', () => {
  assert.equal(isimGetir({ knownName: { en: ' Aziz Sancar ' }, orgName: { en: 'Org' } }), 'Aziz Sancar');
  for (const en of ['', '  ', null, 123, {}]) {
    assert.equal(isimGetir({ knownName: { en }, orgName: { en: ' Organization ' } }), 'Organization');
  }
});

test('Eksik isim ve bozuk metin alanları güvenli yedek metin gösterir', () => {
  for (const kayit of [null, undefined, {}, { knownName: {}, orgName: { en: {} } }]) {
    assert.equal(isimGetir(kayit), 'İsim bilgisi yok');
  }
  for (const deger of [null, undefined, '', '  ', false, 23, {}, []]) {
    assert.equal(metinGetir(deger), 'Bilinmiyor');
    assert.equal(metinGetir(deger, 'Gerekçe yok'), 'Gerekçe yok');
  }
  assert.equal(metinGetir(' DNA repair '), 'DNA repair');
});

for (const yil of ['2015', 2024, '1901']) {
  test(`Geçerli ödül yılı sayısal sıralamaya uygundur: ${yil}`, () => {
    assert.equal(yilGetir({ nobelPrizes: [{ awardYear: yil }] }), Number(yil));
  });
}

for (const yil of [null, undefined, '', '2015x', ' 2015 ', -2024, 0, Infinity, '0201', {}, true]) {
  test(`Geçersiz ödül yılı güvenli sıralama değeri kullanır: ${String(yil)}`, () => {
    assert.equal(yilGetir({ nobelPrizes: [{ awardYear: yil }] }), 0);
  });
}

test('Eksik ödül dizisi hata oluşturmaz', () => {
  for (const kayit of [null, undefined, {}, { nobelPrizes: [] }]) {
    assert.equal(yilGetir(kayit), 0);
  }
});
