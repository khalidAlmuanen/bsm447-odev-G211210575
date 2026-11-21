export const KAYIT_ANAHTARI = '@nobel-chemistry/kaydedilenler/v1';

export function kayitGecerliMi(kayit) {
  if (!kayit || typeof kayit !== 'object' || Array.isArray(kayit)) {
    return false;
  }
  const id = kayit.id;
  if ((typeof id !== 'string' && typeof id !== 'number')
    || String(id).trim() === ''
    || (typeof id === 'number' && !Number.isFinite(id))) {
    return false;
  }
  return kayit.nobelPrizes?.[0]?.category?.en === 'Chemistry';
}

export function kayitlariCoz(json) {
  if (json === null) {
    return [];
  }
  const liste = JSON.parse(json);
  if (!Array.isArray(liste) || !liste.every(kayitGecerliMi)) {
    throw new Error('Kaydedilenler verisi okunamadı.');
  }

  // Aynı kimlik iki kez saklanmışsa ilk kaydı kullan.
  return liste.filter((kayit, index) =>
    liste.findIndex((aday) => String(aday.id) === String(kayit.id)) === index
  );
}
