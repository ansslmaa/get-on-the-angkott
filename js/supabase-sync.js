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

let isCloudReady = false;

// 1. Tarik data dari Supabase saat dibuka; JANGAN push sebelum tarik data selesai
async function syncFromCloud() {
    const { data, error } = await sb.from('app_backup').select('payload').eq('id', 'main_state').single();
    if (error && error.code !== 'PGRST116') {
        console.error('Gagal tarik data dari Supabase:', error);
        return; // Berhenti jika internet/koneksi gagal agar data cloud tidak tertimpa
    }

    if (data && data.payload) {
        let changed = false;
        BACKUP_KEYS.forEach(k => {
            if (data.payload[k] && origGetItem(k) !== data.payload[k]) {
                origSetItem(k, data.payload[k]);
                changed = true;
            }
        });
        isCloudReady = true;
        if (changed) location.reload();
    } else {
        isCloudReady = true;
        await pushToCloud();
    }
}

// 2. Simpan otomatis ke Supabase HANYA setelah sinkronisasi awal selesai
const origSetItem = localStorage.setItem.bind(localStorage);
const origGetItem = localStorage.getItem.bind(localStorage);
localStorage.setItem = function(key, value) {
    origSetItem(key, value);
    if (isCloudReady && BACKUP_KEYS.includes(key)) {
        pushToCloud();
    }
};

window.addEventListener('DOMContentLoaded', syncFromCloud);
