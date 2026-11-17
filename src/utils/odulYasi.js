export function dogumBilgisiGetir(tarih) {
  const bilinmiyor = { yil: null, metin: 'Bilinmiyor' };
  if (typeof tarih !== 'string') {
    return bilinmiyor;
  }

  // API, bilinmeyen ay ve gün için 00 kullanabiliyor.
  const parcalar = tarih.trim().match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/);
  if (!parcalar) {
    return bilinmiyor;
  }

  const yil = Number(parcalar[1]);
  const ay = Number(parcalar[2] || 0);
  const gun = Number(parcalar[3] || 0);
  if (yil === 0 || ay > 12 || gun > 31 || (ay === 0 && gun > 0)) {
    return bilinmiyor;
  }
  if (ay > 0 && gun > 0) {
    const aydakiGunSayisi = new Date(Date.UTC(yil, ay, 0)).getUTCDate();
    if (gun > aydakiGunSayisi) {
      return bilinmiyor;
    }
  }

  if (ay === 0) {
    return { yil, metin: `${yil} (ay ve gün bilinmiyor)` };
  }
  if (gun === 0) {
    return { yil, metin: `${parcalar[1]}-${parcalar[2]} (gün bilinmiyor)` };
  }
  return { yil, metin: parcalar[0] };
}

export function odulYasiniHesapla(dogumTarihi, odulYili) {
  const dogum = dogumBilgisiGetir(dogumTarihi);
  const yilMetni = String(odulYili ?? '');
  if (dogum.yil === null || !/^\d{4}$/.test(yilMetni)) {
    return null;
  }

  const yas = Number(yilMetni) - dogum.yil;
  // Yalnızca iki yılın farkı: ödül günündeki kesin yaş değildir.
  return yas >= 0 ? yas : null;
}
