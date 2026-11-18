
const SUPABASE_URL = 'https://vvvmgudbqljdizegnnub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HmxSie6qWx5cwCGUEYAQLA_DAJDS3Ze';

const BACKUP_KEYS = [
    'got_products_v2',
    'got_preorders_v2',
    'got_history_v2',
    'got_qris_url'
];

const sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Simpan fungsi asli localStorage
const origSetItem = localStorage.setItem.bind(localStorage);
const origGetItem = localStorage.getItem.bind(localStorage);

// Status sinkronisasi
let isCloudReady = false;
let syncTimer = null;
let isPushing = false;
let pushAgain = false;


// ========================================
// 1. JADWALKAN SINKRONISASI
// ========================================

function scheduleCloudSync() {
    if (!isCloudReady) return;

    clearTimeout(syncTimer);

    syncTimer = setTimeout(() => {
        pushToCloud();
    }, 800);
}


// ========================================
// 2. KIRIM DATA KE SUPABASE
// ========================================

async function pushToCloud() {

    if (!isCloudReady) return;

    // Jangan mengirim backup bersamaan
    if (isPushing) {
        pushAgain = true;
        return;
    }

    isPushing = true;

    try {

        do {
            pushAgain = false;

            const payload = {};
            let hasData = false;

            BACKUP_KEYS.forEach(key => {
                const value = origGetItem(key);

                if (value !== null) {
                    payload[key] = value;
                    hasData = true;
                }
            });

            if (!hasData) break;

            const { error } = await sb
                .from('app_backup')
                .upsert({
                    id: 'main_store',
                    payload: payload,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'id'
                });

            if (error) {
                console.error(
                    'Gagal kirim ke Supabase:',
                    error
                );
                break;
            }

            console.log(
                'Data berhasil tersinkron ke Supabase!'
            );

        } while (pushAgain);

    } catch (error) {

        console.error(
            'Kesalahan sinkronisasi:',
            error
        );

    } finally {

        isPushing = false;

        // Jika masih ada perubahan yang menunggu
        if (pushAgain) {
            scheduleCloudSync();
        }
    }
}


// ========================================
// 3. AMBIL DATA DARI SUPABASE
// ========================================

async function syncFromCloud() {

    try {

        const { data, error } = await sb
            .from('app_backup')
            .select('payload')
            .eq('id', 'main_store')
            .single();

        if (error && error.code !== 'PGRST116') {

            console.error(
                'Gagal tarik data dari Supabase:',
                error
            );

            // Jangan timpa data cloud jika gagal mengambil data
            return;
        }

        if (data && data.payload) {

            let changed = false;

            BACKUP_KEYS.forEach(key => {

                const cloudValue = data.payload[key];

                if (
                    cloudValue !== undefined &&
                    cloudValue !== null &&
                    origGetItem(key) !== cloudValue
                ) {

                    origSetItem(key, cloudValue);
                    changed = true;

                }

            });

            isCloudReady = true;

            if (changed) {

                console.log(
                    'Data lokal diperbarui dari Cloud.'
                );

                // Perbarui variabel produk
                if (
                    typeof products !== 'undefined' &&
                    origGetItem('got_products_v2')
                ) {
                    products = JSON.parse(
                        origGetItem('got_products_v2')
                    );
                }

                // Perbarui variabel pre-order
                if (
                    typeof preOrders !== 'undefined' &&
                    origGetItem('got_preorders_v2')
                ) {
                    preOrders = JSON.parse(
                        origGetItem('got_preorders_v2')
                    );
                }

                // Perbarui riwayat transaksi
                if (
                    typeof historyLogs !== 'undefined' &&
                    origGetItem('got_history_v2')
                ) {
                    historyLogs = JSON.parse(
                        origGetItem('got_history_v2')
                    );
                }

                // Render ulang produk jika tab tersedia
                const productTab =
                    document.getElementById('tab-products');

                if (
                    typeof renderProductTable === 'function' &&
                    productTab &&
                    !productTab.classList.contains('hidden')
                ) {
                    renderProductTable();
                }

            }

        } else {

            // Backup pertama jika database masih kosong
            isCloudReady = true;

            await pushToCloud();

        }

    } catch (error) {

        console.error(
            'Kesalahan saat mengambil data Cloud:',
            error
        );

    }
}


// ========================================
// 4. PANTAU PERUBAHAN LOCAL STORAGE
// ========================================

localStorage.setItem = function(key, value) {

    origSetItem(key, value);

    if (
        isCloudReady &&
        BACKUP_KEYS.includes(key)
    ) {
        scheduleCloudSync();
    }

};


// ========================================
// 5. JALANKAN SAAT WEBSITE DIBUKA
// ========================================

window.addEventListener(
    'DOMContentLoaded',
    syncFromCloud
);
