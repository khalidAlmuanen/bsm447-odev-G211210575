export const TEMA_ANAHTARI = '@nobel-chemistry/tema/v1';

export function temaTercihiniCoz(deger) {
  if (deger === null || deger === 'light') {
    return false;
  }
  if (deger === 'dark') {
    return true;
  }
  throw new Error('Tema tercihi okunamadı.');
}

export const acikRenkler = {
  primary: '#22577a',
  background: '#ffffff',
  card: '#f8fafc',
  text: '#193549',
  border: '#cbd5e1',
  notification: '#b91c1c',
  secondaryText: '#475569',
  placeholder: '#64748b',
  inputBackground: '#f8fafc',
  error: '#b91c1c',
  buttonBackground: '#22577a',
  buttonText: '#ffffff',
  disabledBackground: '#e2e8f0',
  disabledText: '#475569',
  switchTrackOff: '#94a3b8',
  switchThumb: '#ffffff',
};

export const koyuRenkler = {
  primary: '#93c5fd',
  background: '#0f172a',
  card: '#1e293b',
  text: '#f1f5f9',
  border: '#64748b',
  notification: '#fca5a5',
  secondaryText: '#cbd5e1',
  placeholder: '#94a3b8',
  inputBackground: '#1e293b',
  error: '#fca5a5',
  buttonBackground: '#93c5fd',
  buttonText: '#0f172a',
  disabledBackground: '#334155',
  disabledText: '#cbd5e1',
  switchTrackOff: '#64748b',
  switchThumb: '#f1f5f9',
};
