import test from 'node:test';
import assert from 'node:assert/strict';
import { TEMA_ANAHTARI, acikRenkler, koyuRenkler, temaTercihiniCoz } from '../src/utils/tema.js';
import { KAYIT_ANAHTARI } from '../src/utils/kayitlar.js';

test('Tema tercihi kaydedilenlerden ayrı bir anahtar kullanır', () => {
  assert.notEqual(TEMA_ANAHTARI, KAYIT_ANAHTARI);
});

test('İlk açılış ve light tercihi aydınlık temayı seçer', () => {
  assert.equal(temaTercihiniCoz(null), false);
  assert.equal(temaTercihiniCoz('light'), false);
});

test('Saklanan dark tercihi karanlık temayı seçer', () => {
  assert.equal(temaTercihiniCoz('dark'), true);
});

for (const deger of ['', 'DARK', 'true', 'false', 'null', '{}', undefined, true, 1]) {
  test(`Bozuk tema tercihi sessizce değiştirilmez: ${String(deger)}`, () => {
    assert.throws(() => temaTercihiniCoz(deger));
  });
}

// WCAG bağıl parlaklık formülü: normal metin için en az 4.5:1 kontrast.
function parlaklik(hex) {
  const rgb = hex.slice(1).match(/../g).map((kanal) => {
    const s = parseInt(kanal, 16) / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

for (const [ad, renkler] of [['Aydınlık', acikRenkler], ['Karanlık', koyuRenkler]]) {
  for (const [yazi, zemin] of [
    ['text', 'background'], ['secondaryText', 'background'], ['text', 'card'],
    ['primary', 'card'], ['error', 'background'], ['placeholder', 'inputBackground'],
    ['buttonText', 'buttonBackground'], ['disabledText', 'disabledBackground'],
  ]) {
    test(`${ad}: ${yazi}/${zemin} metni okunabilir kontrasta sahiptir`, () => {
      const a = parlaklik(renkler[yazi]);
      const b = parlaklik(renkler[zemin]);
      const oran = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      assert.ok(oran >= 4.5, `Kontrast oranı: ${oran.toFixed(2)}`);
    });
  }
}
