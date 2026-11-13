const SUPABASE_URL = 'https://vvvmgudbqljdizegnnub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HmxSie6qWx5cwCGUEYAQLA_DAJDS3Ze';
const BACKUP_KEYS = ['got_products_v2', 'got_preorders_v2', 'got_history_v2', 'got_qris_url'];

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fungsi kirim semua data localStorage ke Supabase
async function pushToCloud() {
  const payload = {};
  let hasData = false;
  BACKUP_KEYS.forEach(k => {
    const val = localStorage.getItem(k);
    if (val) {
      payload[k] = val;
      hasData = true;
    }
  });
  if (!hasData) return;

  const { error } = await sb.from('app_backup').upsert({
    id: 'main_store',
    payload,
    updated_at: new Date().toISOString()
  });
  if (error) console.error('Gagal kirim ke Supabase:', error);
  else console.log('Data berhasil tersinkron ke Supabase!');
}

// 1. Tarik data dari Supabase saat dibuka; jika Supabase masih kosong, langsung unggah data laptop
async function syncFromCloud() {
  const { data } = await sb.from('app_backup').select('payload').eq('id', 'main_store').maybeSingle();
  if (data && data.payload) {
    let changed = false;
    BACKUP_KEYS.forEach(k => {
      if (data.payload[k] && localStorage.getItem(k) !== data.payload[k]) {
        localStorage.setItem(k, data.payload[k]);
        changed = true;
      }
    });
    if (changed) location.reload();
  } else {
    await pushToCloud();
  }
}

// 2. Simpan otomatis ke Supabase setiap kali ada transaksi/perubahan di kasir
const origSetItem = localStorage.setItem.bind(localStorage);
localStorage.setItem = function(key, value) {
  origSetItem(key, value);
  if (BACKUP_KEYS.includes(key)) {
    pushToCloud();
  }
};

window.addEventListener('DOMContentLoaded', syncFromCloud);