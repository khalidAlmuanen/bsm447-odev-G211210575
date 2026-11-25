export function metinGetir(deger, yedek = 'Bilinmiyor') {
  return typeof deger === 'string' && deger.trim() ? deger.trim() : yedek;
}

export function isimGetir(kayit) {
  return metinGetir(kayit?.knownName?.en, '')
    || metinGetir(kayit?.orgName?.en, 'İsim bilgisi yok');
}

export function yilGetir(kayit) {
  const yil = kayit?.nobelPrizes?.[0]?.awardYear;
  return /^[1-9]\d{3}$/.test(String(yil)) ? Number(yil) : 0;
}
