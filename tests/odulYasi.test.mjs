import test from 'node:test';
import assert from 'node:assert/strict';
import { dogumBilgisiGetir, odulYasiniHesapla } from '../src/utils/odulYasi.js';

const dogumOrnekleri = [
  ['1946-09-08', 1946, '1946-09-08'],
  ['1962-00-00', 1962, '1962 (ay ve gün bilinmiyor)'],
  ['1945-00-00', 1945, '1945 (ay ve gün bilinmiyor)'],
  ['1980', 1980, '1980 (ay ve gün bilinmiyor)'],
  ['1980-05', 1980, '1980-05 (gün bilinmiyor)'],
  ['1980-05-00', 1980, '1980-05 (gün bilinmiyor)'],
  ['2000-02-29', 2000, '2000-02-29'],
  [' 1946-09-08 ', 1946, '1946-09-08'],
];

for (const [tarih, yil, metin] of dogumOrnekleri) {
  test(`Doğum tarihi: ${tarih}`, () => {
    assert.deepEqual(dogumBilgisiGetir(tarih), { yil, metin });
  });
}

const gecersizTarihler = [
  undefined, null, '', 'bilinmiyor', 1946, '0000-01-01',
  '2001-02-29', '1900-02-29', '2000-13-01', '2000-04-31',
  '2000-00-12', '2000-01-32', '1999-xx-01',
];

for (const tarih of gecersizTarihler) {
  test(`Eksik veya geçersiz tarih: ${String(tarih)}`, () => {
    assert.deepEqual(dogumBilgisiGetir(tarih), { yil: null, metin: 'Bilinmiyor' });
  });
}

const yasOrnekleri = [
  ['1946-09-08', '2015', 69],
  ['1962-00-00', '2024', 62],
  ['1945-00-00', '2023', 78],
  ['1970-05-00', '1990', 20],
  ['1962', '2024', 62],
  ['2000-01-01', '2000', 0],
  ['1946-09-08', 2015, 69],
  ['1966-10-10', '2022', 56],
];

for (const [dogum, odul, beklenen] of yasOrnekleri) {
  test(`Yaklaşık yaş: ${dogum}, ödül yılı ${odul}`, () => {
    assert.equal(odulYasiniHesapla(dogum, odul), beklenen);
  });
}

const hesaplanamayanYaslar = [
  [undefined, '2015'], ['bilinmiyor', '2015'], ['2001-02-29', '2024'],
  ['1946-09-08', undefined], ['1946-09-08', null], ['1946-09-08', '2015x'],
  ['1946-09-08', '0000'], ['2025-01-01', '2024'], ['1946-09-08', '123'],
];

for (const [dogum, odul] of hesaplanamayanYaslar) {
  test(`Yaş hesaplanamaz: ${String(dogum)}, ${String(odul)}`, () => {
    assert.equal(odulYasiniHesapla(dogum, odul), null);
  });
}
