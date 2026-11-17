// INITIAL DEFAULT DATA (Referencing Visual Moodboard & Theme)
        const INITIAL_PRODUCTS = [
            { id: 'p1', name: 'Off Yer Trolley', category: 'Minuman', price: 20000, stock: 45, allocated: 0, sold: 12, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=200&q=80' },
            { id: 'p2', name: 'Jingleberry', category: 'Minuman', price: 10000, stock: 30, allocated: 0, sold: 25, image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=200&q=80' },
            { id: 'p3', name: 'Candy Trap', category: 'Dessert', price: 12500, stock: 25, allocated: 0, sold: 8, image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=200&q=80' },
            { id: 'p4', name: 'Snow Pop', category: 'Dessert', price: 15000, stock: 40, allocated: 0, sold: 19, image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=200&q=80' },
            { id: 'p5', name: 'Scrawp', category: 'Merchandise', price: 18000, stock: 20, allocated: 0, sold: 5, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80' },
            { id: 'p6', name: 'Clap Trap', category: 'Merchandise', price: 22000, stock: 15, allocated: 0, sold: 10, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=200&q=80' }
        ];

        const INITIAL_POS = [
            {
                id: 'po-101',
                customerName: 'ANISA',
                phone: '081299887766',
                orderDate: '2026-11-10',
                pickupDate: '2026-11-15',
                items: [
                    { productId: 'p1', name: 'Off Yer Trolley', price: 20000, qtyTotal: 2, qtyPicked: 0 },
                    { productId: 'p2', name: 'Jingleberry', price: 10000, qtyTotal: 1, qtyPicked: 0 }
                ],
                totalAmount: 50000,
                totalPaid: 20000,
                balanceRemaining: 30000,
                paymentStatus: 'Sudah DP', // 'Belum Bayar', 'Sudah DP', 'Lunas'
                pickupStatus: 'Belum Diambil',  // 'Belum Diambil', 'Sebagian Diambil', 'Selesai'
                paymentHistory: [
                    { id: 'pay-1', date: '2026-11-10T10:00:00', amount: 20000, method: 'QRIS', remark: 'DP Pertama' }
                ]
            },
            {
                id: 'po-102',
                customerName: 'SALMA',
                phone: '085711223344',
                orderDate: '2026-11-12',
                pickupDate: '2026-11-15',
                items: [
                    { productId: 'p3', name: 'Candy Trap', price: 12500, qtyTotal: 2, qtyPicked: 0 }
                ],
                totalAmount: 25000,
                totalPaid: 25000,
                balanceRemaining: 0,
                paymentStatus: 'Lunas',
                pickupStatus: 'Belum Diambil',
                paymentHistory: [
                    { id: 'pay-2', date: '2026-11-12T14:30:00', amount: 25000, method: 'CASH', remark: 'Pembayaran Lunas Pre-Order' }
                ]
            },
            {
                id: 'po-103',
                customerName: 'PUTRI',
                phone: '',
                orderDate: '2026-11-14',
                pickupDate: '2026-11-15',
                items: [
                    { productId: 'p4', name: 'Snow Pop', price: 15000, qtyTotal: 1, qtyPicked: 0 }
                ],
                totalAmount: 15000,
                totalPaid: 0,
                balanceRemaining: 15000,
                paymentStatus: 'Belum Bayar',
                pickupStatus: 'Belum Diambil',
                paymentHistory: []
            }
        ];

        const DEFAULT_QRIS = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=GETONTHEANGKOT_OFFICIAL_QRIS';

        // APPLICATION LOCAL STATE
        let products = JSON.parse(localStorage.getItem('got_products_v2')) || INITIAL_PRODUCTS;

// TAMBAHAN 4 VARIAN MOCHI
const mochiVariants = [
    {
        id: 'mochi-lotus',
        name: 'Mochi Lotus'
    },
    {
        id: 'mochi-strawberry',
        name: 'Mochi Strawberry'
    },
    {
        id: 'mochi-mangga',
        name: 'Mochi Mangga'
    },
    {
        id: 'mochi-cookies',
        name: 'Mochi Cookies'
    }
];

let mochiAdded = false;

mochiVariants.forEach(variant => {
    const alreadyExists = products.some(
        p => p.id === variant.id
    );

    if (!alreadyExists) {
        products.push({
            id: variant.id,
            name: variant.name,
            category: 'Dessert',
            price: 6000,
            stock: 15,
            allocated: 0,
            sold: 0,
            image: 'images/Mochichaser.jpeg'
        });

        mochiAdded = true;
    }
});

if (mochiAdded) {
    localStorage.setItem(
        'got_products_v2',
        JSON.stringify(products)
    );
}

        let preOrders = JSON.parse(localStorage.getItem('got_preorders_v2')) || INITIAL_POS;
        let historyLogs = JSON.parse(localStorage.getItem('got_history_v2')) || [
            { id: 'tx-1001', date: '2026-11-10T10:00:00', orderId: 'po-101', customer: 'ANISA', type: 'DP Pre-Order', method: 'QRIS', amount: 20000 },
            { id: 'tx-1002', date: '2026-11-12T14:30:00', orderId: 'po-102', customer: 'SALMA', type: 'Pembayaran Lunas Pre-Order', method: 'CASH', amount: 25000 }
        ];
        let qrisImgUrl = localStorage.getItem('got_qris_url') || DEFAULT_QRIS;

        let cart = JSON.parse(localStorage.getItem('got_cart_v1') || '[]');
        let posPaymentMethod = 'CASH';
        let activePoForPayment = null;
        let activePoForPickup = null;
        let editingPoId = null;
        let currentQrisProof = {
    pos: null,
    po: null,
    'po-pay': null
};

        // ALLOCATIONS & STATE PERSISTENCE
        function syncAllocations() {
            products.forEach(p => p.allocated = 0);
            preOrders.forEach(po => {
                if (po.pickupStatus !== 'Selesai') {
                    po.items.forEach(item => {
                        const remainingToPick = item.qtyTotal - item.qtyPicked;
                        const prod = products.find(p => p.id === item.productId);
                        if (prod && remainingToPick > 0) {
                            prod.allocated += remainingToPick;
                        }
                    });
                }
            });
            saveState();
        }

        function saveState() {
            localStorage.setItem('got_products_v2', JSON.stringify(products));
            localStorage.setItem('got_preorders_v2', JSON.stringify(preOrders));
            localStorage.setItem('got_history_v2', JSON.stringify(historyLogs));
            localStorage.setItem('got_qris_url', qrisImgUrl);
            updatePoBadge();
        }

        function updatePoBadge() {
            const pendingCount = preOrders.filter(p => p.pickupStatus !== 'Selesai').length;
            document.getElementById('po-badge').innerText = pendingCount;
        }

        // SWITCH TAB NAVIGATION
        function switchTab(tabId) {
            ['dashboard', 'pos', 'po', 'history', 'income', 'products', 'settings'].forEach(tab => {
                const navBtn = document.getElementById(`nav-${tab}`);
                const tabSec = document.getElementById(`tab-${tab}`);
                if (tab === tabId) {
                    navBtn.className = "w-full text-left font-pop flex items-center gap-3 px-4 py-3 rounded-xl neo-border font-semibold text-base transition-all bg-brand-pink text-white neo-shadow translate-y-[-2px]";
                    tabSec.classList.remove('hidden');
                } else {
                    navBtn.className = "w-full text-left font-pop flex items-center gap-3 px-4 py-3 rounded-xl neo-border font-semibold text-base transition-all bg-slate-800 text-slate-300 hover:bg-slate-700";
                    tabSec.classList.add('hidden');
                }
            });

            if (tabId === 'dashboard') renderDashboard();
            if (tabId === 'pos') renderPosProducts();
            if (tabId === 'po') renderPoList();
            if (tabId === 'history') renderHistoryTable();
            if (tabId === 'income') renderIncomeStats();
            if (tabId === 'products') renderProductTable();
            if (tabId === 'settings') renderSettings();
        }

        // UTILITY FORMATTERS
        function formatRp(val) {
            return 'Rp' + Number(val || 0).toLocaleString('id-ID');
        }

        function showToast(msg, icon = 'fa-circle-check') {
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').innerText = msg;
            document.getElementById('toast-icon').className = `fa-solid ${icon} text-brand-yellow`;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        // ================= 1. DASHBOARD =================
        function renderDashboard() {
            const totalIncome = historyLogs.reduce((sum, h) => sum + h.amount, 0);
            const totalTx = historyLogs.length;

            document.getElementById('dash-total-income').innerText = formatRp(totalIncome);
            document.getElementById('dash-total-tx').innerText = totalTx;
            document.getElementById('dash-total-products').innerText = products.length;

            const lowStockCount = products.filter(p => (p.stock - p.allocated) <= 5).length;
            document.getElementById('dash-low-stock-alert').innerText = `${lowStockCount} Stok Menipis (<= 5)`;

            // PO breakdown
            document.getElementById('dash-total-po').innerText = preOrders.length;
            document.getElementById('dash-po-unpaid').innerText = preOrders.filter(p => p.paymentStatus === 'Belum Bayar').length;
            document.getElementById('dash-po-dp').innerText = preOrders.filter(p => p.paymentStatus === 'Sudah DP').length;
            document.getElementById('dash-po-paid').innerText = preOrders.filter(p => p.paymentStatus === 'Lunas').length;
            document.getElementById('dash-po-pending-pickup').innerText = preOrders.filter(p => p.pickupStatus !== 'Selesai').length;

            // Payment Methods breakdown
            const cashLogs = historyLogs.filter(h => (h.method || '').toUpperCase() === 'CASH');
const qrisLogs = historyLogs.filter(h => (h.method || '').toUpperCase() === 'QRIS');

            document.getElementById('dash-cash-income').innerText = formatRp(cashLogs.reduce((sum, h) => sum + h.amount, 0));
            document.getElementById('dash-cash-tx-count').innerText = `${cashLogs.length} Transaksi`;

            document.getElementById('dash-qris-income').innerText = formatRp(qrisLogs.reduce((sum, h) => sum + h.amount, 0));
            document.getElementById('dash-qris-tx-count').innerText = `${qrisLogs.length} Transaksi`;
        }

        // ================= 2. KASIR (POS) =================
        function populatePosCategories() {
            const select = document.getElementById('pos-category-filter');
            const categories = [...new Set(products.map(p => p.category || 'Umum'))];
            select.innerHTML = `<option value="">Semua Kategori</option>`;
            categories.forEach(c => {
                select.innerHTML += `<option value="${c}">${c}</option>`;
            });
        }

        function renderPosProducts() {
    populatePosCategories();

    const grid = document.getElementById('pos-product-grid');
    const search = document.getElementById('pos-search').value.trim().toLowerCase();
    const cat = document.getElementById('pos-category-filter').value;

    grid.innerHTML = '';

    const filteredProducts = products.filter(p => {
        const matchSearch = (p.name || '').toLowerCase().includes(search);
        const matchCat = !cat || p.category === cat;

        return matchSearch && matchCat;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="sm:col-span-2 md:col-span-3 bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
                <i class="fa-solid fa-magnifying-glass text-2xl mb-2"></i>
                <p class="font-bold">Produk tidak ditemukan</p>
                <p class="text-xs mt-1">Coba kata kunci lain.</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(p => {
        const available = p.stock - p.allocated;

        const card = document.createElement('div');

        card.className = `
            bg-white rounded-xl neo-border neo-shadow
            overflow-hidden flex flex-col justify-between
        `;

        card.innerHTML = `
            <div>
                <div class="h-28 bg-slate-100 overflow-hidden">
                    <img
                        src="${p.image || 'https://placehold.co/200x200?text=Produk'}"
                        alt="${p.name}"
                        class="w-full h-full object-cover"
                    >
                </div>

                <div class="p-3">
                    <h4 class="font-pop text-base font-bold">
                        ${p.name}
                    </h4>

                    <p class="text-xs text-slate-500">
                        ${p.category}
                    </p>

                    <div class="text-brand-blue font-bold mt-1">
                        ${formatRp(p.price)}
                    </div>

                    <span class="inline-block mt-2 px-2 py-1 rounded text-xs font-bold
                        ${available > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'}">
                        Stok: ${available}
                    </span>
                </div>
            </div>

            <div class="p-3 pt-0">
                <button
                    onclick="addToCart('${p.id}')"
                    ${available <= 0 ? 'disabled' : ''}
                    class="w-full py-2 bg-brand-yellow text-black font-bold rounded-lg neo-border neo-shadow-sm disabled:opacity-50"
                >
                    <i class="fa-solid fa-plus mr-1"></i>
                    ${available > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                </button>
            </div>
        `;

        grid.appendChild(card);
    });

    document.getElementById('pos-qris-img').src = qrisImgUrl;
}

        function addToCart(productId) {
    const prod = products.find(p => p.id === productId);

    if (!prod) return;

    const available = prod.stock - prod.allocated;

    const item = cart.find(c => c.productId === productId);

    if (item) {
        if (item.qty + 1 > available) {
            showToast(
                'Jumlah melebihi stok tersedia!',
                'fa-circle-exclamation'
            );
            return;
        }

        item.qty++;
    } else {
        if (available <= 0) {
            showToast(
                'Stok produk habis!',
                'fa-circle-exclamation'
            );
            return;
        }

        cart.push({
            productId: prod.id,
            name: prod.name,
            price: prod.price,
            qty: 1
        });
    }

    renderCart();

    showToast(prod.name + ' berhasil ditambahkan!');
}

        function updateCartQty(productId, delta) {
    const item = cart.find(c => c.productId === productId);
    const prod = products.find(p => p.id === productId);

    if (!item || !prod) return;

    const available = prod.stock - prod.allocated;

    if (delta > 0 && item.qty + delta > available) {
        showToast(
            'Stok tidak mencukupi!',
            'fa-circle-exclamation'
        );
        return;
    }

    item.qty += delta;

    if (item.qty <= 0) {
        cart = cart.filter(c => c.productId !== productId);
    }

    renderCart();
}

       function renderCart() {
    const container = document.getElementById('cart-items');

    container.innerHTML = '';

    // Simpan isi keranjang agar tidak hilang saat reload
    localStorage.setItem('got_cart_v1', JSON.stringify(cart));

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center text-slate-400 py-8 text-xs">
                Keranjang masih kosong
            </div>
        `;
    } else {
        cart.forEach(item => {
            const subtotal = item.price * item.qty;

            total += subtotal;

            const el = document.createElement('div');

            el.className = `
                flex justify-between items-center
                p-2 bg-slate-50 border border-black
                rounded-lg text-xs
            `;

            el.innerHTML = `
                <div>
                    <div class="font-bold text-slate-900">
                        ${item.name}
                    </div>

                    <div class="text-slate-500">
                        ${formatRp(item.price)}
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        onclick="updateCartQty('${item.productId}', -1)"
                        class="w-6 h-6 bg-slate-200 border border-black rounded font-bold"
                    >-</button>

                    <span class="font-bold">
                        ${item.qty}
                    </span>

                    <button
                        onclick="updateCartQty('${item.productId}', 1)"
                        class="w-6 h-6 bg-slate-200 border border-black rounded font-bold"
                    >+</button>

                    <span class="font-bold w-16 text-right">
                        ${formatRp(subtotal)}
                    </span>
                </div>
            `;

            container.appendChild(el);
        });
    }

    document.getElementById('cart-total').innerText = formatRp(total);

    calculatePosChange();
    updatePosDynamicQris();
}

// PILIH METODE PEMBAYARAN POS
function setPosPaymentMethod(method) {
    if (method !== 'CASH' && method !== 'QRIS') return;
    posPaymentMethod = method;

    const cashBtn = document.getElementById('pay-method-cash');
    const qrisBtn = document.getElementById('pay-method-qris');
    const cashContainer = document.getElementById('pos-cash-container');
    const qrisContainer = document.getElementById('pos-qris-container');

    if (!cashBtn || !qrisBtn || !cashContainer || !qrisContainer) return;

    const activeClass = 'py-2 px-3 border-2 border-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-brand-yellow text-slate-900 neo-shadow-sm';
    const inactiveClass = 'py-2 px-3 border-2 border-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-slate-100 text-slate-700';

    cashBtn.className = method === 'CASH' ? activeClass : inactiveClass;
    qrisBtn.className = method === 'QRIS' ? activeClass : inactiveClass;
    cashContainer.classList.toggle('hidden', method !== 'CASH');
    qrisContainer.classList.toggle('hidden', method !== 'QRIS');

    if (method === 'QRIS') {
        const qrisImage = document.getElementById('pos-qris-img');
        updatePosDynamicQris();
    }
}

// KOSONGKAN KERANJANG POS
function clearCart() {
    cart = [];
    const cashInput = document.getElementById('pos-cash-input');
    const customerInput = document.getElementById('cart-customer-name');
    if (cashInput) cashInput.value = '';
    if (customerInput) customerInput.value = '';
    renderCart();
}

        function calculatePosChange() {
            const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const cashInput = parseFloat(document.getElementById('pos-cash-input').value) || 0;
            const change = cashInput - total;
            document.getElementById('pos-cash-change').innerText = formatRp(Math.max(0, change));
        }

        function processPosCheckout() {
            if (cart.length === 0) {
                showToast('Keranjang belanja masih kosong!', 'fa-circle-exclamation');
                return;
            }

            const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);
            const custName = document.getElementById('cart-customer-name').value.trim() || 'Pelanggan Umum';
            let cashPaid = total;
            let change = 0;

            if (posPaymentMethod === 'CASH') {
                cashPaid = parseFloat(document.getElementById('pos-cash-input').value) || 0;
                if (cashPaid < total) {
                    showToast(`Uang Tunai Kurang! Dibutuhkan ${formatRp(total)}`, 'fa-circle-exclamation');
                    return;
                }
                change = cashPaid - total;
            } else if (posPaymentMethod === 'QRIS') {
            if (!currentQrisProof.pos) {
    showToast('Harap foto bukti pembayaran QRIS terlebih dahulu!', 'fa-camera');
    return;
}
                if (!confirm(`Pastikan pembayaran QRIS sebesar ${formatRp(total)} dari ${custName} sudah benar-benar diterima. Lanjutkan?`)) return;
            } else {
                showToast('Pilih metode pembayaran terlebih dahulu!', 'fa-circle-exclamation');
                return;
            }

            // Salin item transaksi sebelum keranjang dikosongkan.
            const purchasedItems = cart.map(item => ({
                productId: item.productId, name: item.name, price: Number(item.price),
                qty: Number(item.qty), subtotal: Number(item.price) * Number(item.qty)
            }));

            // Validasi semua stok sebelum mengubah stok mana pun.
            for (const item of purchasedItems) {
                const prod = products.find(p => p.id === item.productId);
                if (!prod || (Number(prod.stock) - Number(prod.allocated || 0)) < item.qty) {
                    showToast(`Stok ${item.name} tidak mencukupi!`, 'fa-circle-exclamation');
                    return;
                }
            }

            purchasedItems.forEach(item => {
                const prod = products.find(p => p.id === item.productId);
                prod.stock -= item.qty;
                prod.sold = (prod.sold || 0) + item.qty;
            });

            const txId = 'POS-' + Date.now();
            const transactionDate = new Date();
            historyLogs.unshift({
                id: txId, date: transactionDate.toISOString(), orderId: txId,
                customer: custName.toUpperCase(), type: 'Pembelian Langsung (POS)',
                method: posPaymentMethod, amount: total, items: purchasedItems,
                proofImage: posPaymentMethod === 'QRIS' ? currentQrisProof.pos : null
            });
            currentQrisProof.pos = null;
const posPrev = document.getElementById('pos-qris-proof-preview');
const posInp = document.getElementById('pos-qris-proof-input');
if (posPrev) posPrev.classList.add('hidden');
if (posInp) posInp.value = '';

            saveState();

            // Tampilkan struk dahulu dengan data transaksi yang sudah disalin.
            showReceiptModal({
                txId, date: transactionDate.toLocaleString('id-ID'),
                customer: custName, method: posPaymentMethod,
                items: purchasedItems, total, paid: cashPaid, change
            });

            clearCart();
            renderPosProducts();
            renderDashboard();
            renderHistoryTable();
            renderIncomeStats();
            showToast('Transaksi berhasil! Struk siap dicetak.');
        }

        function showReceiptModal(data) {
            document.getElementById('receipt-tx-id').innerText = data.txId;
            document.getElementById('receipt-date').innerText = data.date;
            document.getElementById('receipt-cust').innerText = data.customer;
            document.getElementById('receipt-method').innerText = data.method;
            
            const itemsCont = document.getElementById('receipt-items');
            itemsCont.innerHTML = data.items.map(i => `
                <div class="flex justify-between">
                    <span>${i.name} x${i.qty}</span>
                    <span>${formatRp(i.price * i.qty)}</span>
                </div>
            `).join('');

            document.getElementById('receipt-total').innerText = formatRp(data.total);
            document.getElementById('receipt-paid').innerText = formatRp(data.paid);
            document.getElementById('receipt-change').innerText = formatRp(data.change);

            document.getElementById('receipt-modal').classList.remove('hidden');
        }

        function closeReceiptModal() {
            document.getElementById('receipt-modal').classList.add('hidden');
        }


        // ================= 3. PRE-ORDER (PO) =================
        function renderPoList() {
            const container = document.getElementById('po-checklist-container');
            const selectedDate = document.getElementById('po-date-filter').value;
            const payFilter = document.getElementById('po-payment-filter').value;
            const pickupFilter = document.getElementById('po-pickup-filter').value;
            const search = document.getElementById('po-search').value.toLowerCase();
            container.innerHTML = '';

            let filtered = preOrders.filter(po => {
                const matchDate = !selectedDate || po.pickupDate === selectedDate;
                const matchPay = !payFilter || po.paymentStatus === payFilter;
                const matchPickup = !pickupFilter || po.pickupStatus === pickupFilter;
                const matchSearch = po.customerName.toLowerCase().includes(search) || (po.phone && po.phone.includes(search));
                return matchDate && matchPay && matchPickup && matchSearch;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="bg-white p-8 rounded-2xl neo-border neo-shadow text-center text-slate-400 font-bold">
                        <i class="fa-solid fa-folder-open text-4xl mb-2"></i>
                        <p>Tidak ada data Pre-Order yang sesuai filter.</p>
                    </div>
                `;
                return;
            }

            // Grouping by pickup date
            const grouped = {};
            filtered.forEach(po => {
                if (!grouped[po.pickupDate]) grouped[po.pickupDate] = [];
                grouped[po.pickupDate].push(po);
            });

            Object.keys(grouped).sort().reverse().forEach(date => {
                const dateObj = new Date(date);
                const formattedDate = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();

                const groupCard = document.createElement('div');
                groupCard.className = "bg-white rounded-2xl neo-border neo-shadow overflow-hidden";

                let poCardsHtml = grouped[date].map(po => {
                    const isFullyPicked = po.pickupStatus === 'Selesai';

                    const itemsList = po.items.map(i => {
                        const isItemDone = i.qtyPicked >= i.qtyTotal;
                        return `
                            <li class="flex justify-between items-center py-0.5 text-xs">
                                <span class="${isItemDone ? 'line-through text-slate-400' : 'text-slate-800 font-bold'}">
                                    • ${i.name} — <strong class="text-brand-blue">${i.qtyPicked}/${i.qtyTotal} pcs</strong> diambil
                                </span>
                                <span class="font-mono text-slate-500">${formatRp(i.price * i.qtyTotal)}</span>
                            </li>
                        `;
                    }).join('');

                    return `
                        <div class="p-4 border-b-2 border-slate-200 last:border-b-0 hover:bg-slate-50 flex flex-col md:flex-row items-start justify-between gap-4">
                            <div class="flex-1">
                                <div class="flex flex-wrap items-center gap-2">
                                   ${(() => {
    const qrisTx = historyLogs.find(h => h.orderId === po.id && h.method === 'QRIS' && h.proofImage);
    return qrisTx
        ? `<button onclick="openQrisProofViewer('${qrisTx.id}')" class="text-left text-brand-blue underline hover:text-blue-800" title="Klik untuk lihat bukti QRIS">${po.customerName} <i class="fa-solid fa-camera text-xs ml-1"></i></button>`
        : po.customerName;
})()}
                                    ${po.phone ? `<span class="text-xs text-slate-500 font-semibold"><i class="fa-brands fa-whatsapp text-green-600"></i> ${po.phone}</span>` : ''}
                                    
                                    <!-- Payment Status Badge -->
                                    <span class="text-xs font-bold px-2 py-0.5 rounded-full border border-black ${
                                        po.paymentStatus === 'Lunas' ? 'bg-green-100 text-green-800' : 
                                        po.paymentStatus === 'Sudah DP' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                    }">
                                        ${po.paymentStatus}
                                    </span>

                                    <!-- Pickup Status Badge -->
                                    <span class="text-xs font-bold px-2 py-0.5 rounded-full border border-black ${
                                        po.pickupStatus === 'Selesai' ? 'bg-slate-200 text-slate-700' : 
                                        po.pickupStatus === 'Sebagian Diambil' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                                    }">
                                        ${po.pickupStatus}
                                    </span>
                                </div>

                                <!-- Item List -->
                                <ul class="my-2 p-2 bg-slate-50 rounded-lg border border-slate-300 space-y-1">
                                    ${itemsList}
                                </ul>

                                <!-- Calculation Info -->
                                <div class="text-xs font-bold text-slate-600 flex flex-wrap gap-4 pt-1">
                                    <span>Total: <strong class="text-slate-900">${formatRp(po.totalAmount)}</strong></span>
                                    <span>Dibayar: <strong class="text-brand-green">${formatRp(po.totalPaid)}</strong></span>
                                    <span>Sisa Tagihan: <strong class="${po.balanceRemaining > 0 ? 'text-red-600' : 'text-slate-700'}">${formatRp(po.balanceRemaining)}</strong></span>
                                </div>
                            </div>

                            <!-- Actions Control Panel -->
                            <div class="flex flex-wrap md:flex-col items-end gap-2 w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-slate-200">
                                <button onclick="openPoPickupModal('${po.id}')" class="px-3 py-1.5 bg-brand-yellow text-slate-900 font-pop font-bold text-xs rounded-lg neo-border neo-shadow-sm hover:bg-yellow-400 neo-button">
                                    <i class="fa-solid fa-list-check mr-1"></i> Checklist Barang
                                </button>
                                <button onclick="openEditPoModal('${po.id}')" class="px-3 py-1.5 bg-blue-100 text-blue-800 font-pop font-bold text-xs rounded-lg neo-border neo-shadow-sm hover:bg-blue-200 neo-button">
    <i class="fa-solid fa-pen-to-square mr-1"></i> Edit PO
</button>
                                
                                ${po.balanceRemaining > 0 ? `
                                    <button onclick="openPoPayModal('${po.id}')" class="px-3 py-1.5 bg-brand-green text-white font-pop font-bold text-xs rounded-lg neo-border neo-shadow-sm hover:bg-brand-darkGreen neo-button">
                                        <i class="fa-solid fa-money-bill-transfer mr-1"></i> Catat Pelunasan
                                    </button>
                                ` : ''}

                                <button onclick="openPoHistoryModal('${po.id}')" class="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-[11px] rounded border border-slate-400 hover:bg-slate-200">
                                    Log Bayar (${po.paymentHistory ? po.paymentHistory.length : 0})
                                </button>

                                ${!isFullyPicked ? `
                                    <button onclick="cancelPreOrder('${po.id}')" class="px-2.5 py-1 text-red-600 hover:text-red-800 font-bold text-[11px] border border-red-300 rounded bg-red-50">
                                        Batalkan PO
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `;
                }).join('');

                groupCard.innerHTML = `
                    <div class="bg-brand-blue p-3 font-pop font-bold text-white text-base border-b-2 border-black flex justify-between items-center">
                        <span><i class="fa-solid fa-calendar-day mr-2"></i> DAFTAR PRE-ORDER — ${formattedDate}</span>
                        <span class="text-xs bg-black text-brand-yellow px-3 py-1 rounded-full border border-brand-yellow font-body">${grouped[date].length} Pesanan</span>
                    </div>
                    <div>${poCardsHtml}</div>
                `;

                container.appendChild(groupCard);
            });
        }
function openPoModal() {
            editingPoId = null;
           const poModalTitle = document.getElementById('po-modal-title');
if (poModalTitle) poModalTitle.innerText = 'Buat Pesanan PO Baru';
            document.getElementById('po-input-name').value = '';
            document.getElementById('po-input-phone').value = '';
            document.getElementById('po-input-order-date').value = new Date().toISOString().split('T')[0];
            document.getElementById('po-input-pickup-date').value = '';
            document.getElementById('po-input-dp').disabled = false;
            document.getElementById('po-dp-method').disabled = false;
            document.getElementById('po-input-dp').value = 0;
            document.getElementById('po-dp-method').value = 'Cash';

            // Reset kamera bukti QRIS PO
            currentQrisProof.po = null;
            const poQrisBox = document.getElementById('po-qris-proof-box');
            const poQrisPrev = document.getElementById('po-qris-proof-preview');
            const poQrisInp = document.getElementById('po-qris-proof-input');
            if (poQrisBox) poQrisBox.classList.add('hidden');
            if (poQrisPrev) poQrisPrev.classList.add('hidden');
            if (poQrisInp) poQrisInp.value = '';

            // Render daftar item produk PO dengan qty 0
            const selector = document.getElementById('po-product-selector');
            selector.innerHTML = '';
            products.forEach(p => {
                const avail = Math.max(0, Number(p.stock) - Number(p.allocated || 0));
                const row = document.createElement('div');
                row.className = 'flex items-center justify-between bg-slate-50 p-2 rounded border';
                row.innerHTML = `
                    <div>
                        <p class="font-bold text-xs text-slate-800">${p.name}</p>
                        <p class="text-[11px] text-slate-500">${formatRp(p.price)} • Sisa: ${avail}</p>
                    </div>
                    <input type="number" min="0" max="${avail}" value="0" data-id="${p.id}" data-price="${p.price}" oninput="calculatePoBalance()" class="po-item-qty w-16 border-2 border-black rounded px-2 py-1 text-center font-bold text-xs">
                `;
                selector.appendChild(row);
            });

            calculatePoBalance();
            document.getElementById('po-modal').classList.remove('hidden');
        }
       function openEditPoModal(poId) {
            const po = preOrders.find(p => p.id === poId);
            if (!po) return;

            editingPoId = poId;
            document.getElementById('po-input-name').value = po.customerName;
            document.getElementById('po-input-phone').value = po.phone || '';
            document.getElementById('po-input-order-date').value = po.orderDate;
            document.getElementById('po-input-pickup-date').value = po.pickupDate;

            // Buka kunci input pembayaran agar DP / Pelunasan & Metode Bayar bisa diedit
            document.getElementById('po-input-dp').disabled = false;
            document.getElementById('po-dp-method').disabled = false;
            document.getElementById('po-input-dp').value = po.totalPaid || 0;

            if (po.paymentHistory && po.paymentHistory.length > 0) {
                document.getElementById('po-dp-method').value = po.paymentHistory[0].method || 'Cash';
            } else {
                document.getElementById('po-dp-method').value = 'Cash';
            }

            const selector = document.getElementById('po-product-selector');
            selector.innerHTML = '';

            products.forEach(p => {
                const existingItem = po.items.find(i => i.productId === p.id);
                const currentQty = existingItem ? existingItem.qtyTotal : 0;
                const minQty = existingItem ? existingItem.qtyPicked : 0;
                const available = (p.stock - p.allocated) + (currentQty - minQty);

                const row = document.createElement('div');
                row.className = "flex items-center justify-between p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs";
                row.innerHTML = `
                    <div>
                        <span class="font-bold text-slate-900">${p.name}</span>
                        <span class="text-[11px] text-slate-500 block">${formatRp(p.price)} (Maks: ${available}${minQty > 0 ? `, Sudah diambil: ${minQty}` : ''})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="number" min="${minQty}" max="${available}" data-id="${p.id}" data-price="${p.price}" value="${currentQty}" oninput="calculatePoBalance()" class="po-item-qty w-16 p-1 border-2 border-black rounded text-center font-bold">
                    </div>
                `;
                selector.appendChild(row);
            });
togglePoQrisProof();
const existingPoTx = historyLogs.find(h => h.orderId === poId && h.method === 'QRIS' && h.proofImage);
if (existingPoTx) {
    currentQrisProof.po = existingPoTx.proofImage;
    document.getElementById('po-qris-proof-img').src = existingPoTx.proofImage;
    document.getElementById('po-qris-proof-preview').classList.remove('hidden');
} else {
    currentQrisProof.po = null;
    document.getElementById('po-qris-proof-preview').classList.add('hidden');
}
            calculatePoBalance();
            document.getElementById('po-modal').classList.remove('hidden');
        }

        function closePoModal() {
            editingPoId = null;
            document.getElementById('po-input-dp').disabled = false;
            document.getElementById('po-dp-method').disabled = false;
            document.getElementById('po-modal').classList.add('hidden');
        }

       function calculatePoBalance() {
    let total = 0;

    document.querySelectorAll('.po-item-qty').forEach(input => {
        const qty = Math.max(0, Number(input.value) || 0);
        const product = products.find(p => p.id === input.dataset.id);
        const price = Number(input.dataset.price ?? product?.price ?? 0);
        total += qty * price;
    });

    const dp = Math.max(0, Number(document.getElementById('po-input-dp').value) || 0);
    const remaining = Math.max(0, total - dp);

    document.getElementById('po-calc-total').innerText = formatRp(total);
    document.getElementById('po-calc-balance').innerText = formatRp(remaining);
}

        function savePreOrder() {
            const name = document.getElementById('po-input-name').value.trim();
            const phone = document.getElementById('po-input-phone').value.trim();
            const orderDate = document.getElementById('po-input-order-date').value;
            const pickupDate = document.getElementById('po-input-pickup-date').value;
            const dp = parseFloat(document.getElementById('po-input-dp').value) || 0;
            const dpMethod = document.getElementById('po-dp-method').value;

            if (!name) {
                showToast('Nama pelanggan wajib diisi!', 'fa-circle-exclamation');
                return;
            }

            if (!pickupDate) {
                showToast('Tanggal pengambilan wajib diisi!', 'fa-circle-exclamation');
                return;
            }

            if (pickupDate < orderDate) {
                showToast('Tanggal pengambilan tidak boleh sebelum tanggal pemesanan!', 'fa-circle-exclamation');
                return;
            }
if (dp > 0 && dpMethod === 'QRIS' && !currentQrisProof.po) {
    showToast('Harap foto bukti pembayaran QRIS terlebih dahulu!', 'fa-camera');
    return;
}
            const existingPo = editingPoId ? preOrders.find(p => p.id === editingPoId) : null;
            const items = [];
            let total = 0;
            let stockError = false;

            document.querySelectorAll('.po-item-qty').forEach(input => {
                const qty = parseInt(input.value) || 0;

                if (qty > 0) {
                    const pId = input.getAttribute('data-id');
                    const prod = products.find(p => p.id === pId);

                    if (prod) {
                        const prevItem = existingPo ? existingPo.items.find(i => i.productId === pId) : null;
                        const prevQtyPicked = prevItem ? prevItem.qtyPicked : 0;
                        const prevRemainingAlloc = prevItem ? (prevItem.qtyTotal - prevItem.qtyPicked) : 0;

                        if (qty < prevQtyPicked) {
                            showToast(`Jumlah ${prod.name} tidak boleh kurang dari yang sudah diambil (${prevQtyPicked})!`, 'fa-circle-exclamation');
                            stockError = true;
                            return;
                        }

                        const available = Math.max(0, Number(prod.stock || 0) - Number(prod.allocated || 0) + prevRemainingAlloc);

                        if (qty > available) {
                            showToast(`Stok ${prod.name} tidak cukup. Tersedia: ${available}`, 'fa-circle-exclamation');
                            stockError = true;
                            return;
                        }

                        items.push({
                            productId: prod.id,
                            name: prod.name,
                            price: prod.price,
                            qtyTotal: qty,
                            qtyPicked: prevQtyPicked
                        });

                        total += prod.price * qty;
                    }
                }
            });

            if (stockError) return;

            if (items.length === 0) {
                showToast('Pilih minimal satu produk!', 'fa-circle-exclamation');
                return;
            }

            // MODE EDIT PO YANG SUDAH ADA
            if (existingPo) {
                if (dp < 0) {
                    showToast('Nominal pembayaran tidak boleh negatif!', 'fa-circle-exclamation');
                    return;
                }

                if (dp > total) {
                    showToast('Nominal pembayaran tidak boleh melebihi total pesanan!', 'fa-circle-exclamation');
                    return;
                }

                existingPo.customerName = name.toUpperCase();
                existingPo.phone = phone;
                existingPo.orderDate = orderDate;
                existingPo.pickupDate = pickupDate;
                existingPo.items = items;
                existingPo.totalAmount = total;
                existingPo.totalPaid = dp;
                existingPo.balanceRemaining = Math.max(0, total - dp);

                if (dp === 0) existingPo.paymentStatus = 'Belum Bayar';
                else if (dp < total) existingPo.paymentStatus = 'Sudah DP';
                else existingPo.paymentStatus = 'Lunas';

                const totalQty = items.reduce((s, i) => s + i.qtyTotal, 0);
                const totalPicked = items.reduce((s, i) => s + i.qtyPicked, 0);
                if (totalPicked === 0) existingPo.pickupStatus = 'Belum Diambil';
                else if (totalPicked < totalQty) existingPo.pickupStatus = 'Sebagian Diambil';
                else existingPo.pickupStatus = 'Selesai';

                const payTypeLabel = dp >= total ? 'Pembayaran Lunas PO' : 'DP Pre-Order';

                // Sinkronkan Log Pembayaran di dalam data PO
                if (dp === 0) {
                    existingPo.paymentHistory = [];
                } else {
                    existingPo.paymentHistory = [{
                        id: (existingPo.paymentHistory && existingPo.paymentHistory[0]) ? existingPo.paymentHistory[0].id : 'PAY-' + Date.now().toString().slice(-6),
                        date: (existingPo.paymentHistory && existingPo.paymentHistory[0]) ? existingPo.paymentHistory[0].date : new Date().toISOString(),
                        amount: dp,
                        method: dpMethod,
                        remark: payTypeLabel,
                        proofImage: dpMethod === 'QRIS' ? currentQrisProof.po : null
                    }];
                }

                // Sinkronkan ke Riwayat Transaksi (historyLogs) agar Dashboard & Excel tetap akurat
                historyLogs = historyLogs.filter(h => h.orderId !== existingPo.id);
                if (dp > 0) {
                    historyLogs.unshift({
                        id: 'TX-' + Math.floor(100000 + Math.random() * 900000),
                        date: new Date().toISOString(),
                        orderId: existingPo.id,
                        customer: existingPo.customerName,
                        type: payTypeLabel,
                        method: dpMethod,
                        amount: dp,
                        proofImage: dpMethod === 'QRIS' ? currentQrisProof.po : null
                    });
                }
                currentQrisProof.po = null;
                
                syncAllocations();
                closePoModal();
                renderPoList();
                renderDashboard();
                renderHistoryTable();
                renderIncomeStats();
                showToast('Perubahan Pre-Order & Pembayaran berhasil disimpan!');
                return;
            }

            // MODE TAMBAH PO BARU
            if (dp < 0) {
                showToast('DP tidak boleh bernilai negatif!', 'fa-circle-exclamation');
                return;
            }

            if (dp > total) {
                showToast('DP tidak boleh melebihi total pesanan!', 'fa-circle-exclamation');
                return;
            }

            const poId = 'PO-' + Date.now().toString().slice(-6);
            const remaining = total - dp;
            let paymentStatus = 'Belum Bayar';
            if (dp > 0 && dp < total) paymentStatus = 'Sudah DP';
            if (dp >= total) paymentStatus = 'Lunas';

            const newPo = {
                id: poId,
                customerName: name.toUpperCase(),
                phone: phone,
                orderDate: orderDate,
                pickupDate: pickupDate,
                items: items,
                totalAmount: total,
                totalPaid: dp,
                balanceRemaining: remaining,
                paymentStatus: paymentStatus,
                pickupStatus: 'Belum Diambil',
                paymentHistory: dp > 0 ? [{
                    id: 'PAY-' + Date.now().toString().slice(-6),
                    date: new Date().toISOString(),
                    amount: dp,
                    method: dpMethod,
                    remark: dp >= total ? 'Pembayaran Lunas Awal' : 'Pembayaran DP',
                    proofImage: dpMethod === 'QRIS' ? currentQrisProof.po : null
                }] : []
            };

            preOrders.unshift(newPo);

            if (dp > 0) {
                historyLogs.unshift({
                    id: 'TX-' + Math.floor(100000 + Math.random() * 900000),
                    date: new Date().toISOString(),
                    orderId: poId,
                    customer: name.toUpperCase(),
                    type: dp >= total ? 'Pembayaran Lunas PO' : 'DP Pre-Order',
                    method: dpMethod,
                    amount: dp,
                    proofImage: dpMethod === 'QRIS' ? currentQrisProof.po : null
                });
            }
            currentQrisProof.po = null;
            syncAllocations();
            document.getElementById('po-date-filter').value = '';
            document.getElementById('po-payment-filter').value = '';
            document.getElementById('po-pickup-filter').value = '';
            document.getElementById('po-search').value = '';

            closePoModal();
            renderPoList();
            renderDashboard();
            showToast('Pre-Order Berhasil Dibuat dan Disimpan!');
        }

        function cancelPreOrder(poId) {
            if (!confirm('Batalkan pesanan PO ini? Alokasi stok produk akan dikembalikan.')) return;
            preOrders = preOrders.filter(p => p.id !== poId);
            syncAllocations();
            renderPoList();
            showToast('Pre-Order dibatalkan.');
        }


        // ================= 4. PEMBAYARAN PARSIAL / PELUNASAN PO =================
        function openPoPayModal(poId) {
            const po = preOrders.find(p => p.id === poId);
            if (!po) return;
            activePoForPayment = po;

            document.getElementById('popay-cust-name').innerText = po.customerName;
            document.getElementById('popay-total').innerText = formatRp(po.totalAmount);
            document.getElementById('popay-remaining').innerText = formatRp(po.balanceRemaining);
            document.getElementById('popay-amount-input').value = po.balanceRemaining;
            document.getElementById('popay-qris-img').src = qrisImgUrl;

            togglePoPayQrisDisplay();
            document.getElementById('po-pay-modal').classList.remove('hidden');
        }

        function closePoPayModal() {
    activePoForPayment = null;
    const modal = document.getElementById('po-pay-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none'; // Memastikan latar belakang gelap ikut hilang
    }
}
        function togglePoPayQrisDisplay() {
            const method = document.getElementById('popay-method-select').value;
            const qrisBox = document.getElementById('popay-qris-box');
            if (method === 'QRIS') qrisBox.classList.remove('hidden');
            else qrisBox.classList.add('hidden');
        }

        function submitPoPayment() {
            if (!activePoForPayment) return;
            const po = preOrders.find(p => p.id === activePoForPayment.id);
            if (!po) return;

            const amount = parseFloat(document.getElementById('popay-amount-input').value) || 0;
            const method = document.getElementById('popay-method-select').value;

            if (amount <= 0) {
                showToast('Nominal pembayaran harus lebih besar dari 0!', 'fa-circle-exclamation');
                return;
            }

            if (amount > po.balanceRemaining) {
                showToast(`Nominal melebihi sisa tagihan (${formatRp(po.balanceRemaining)})`, 'fa-circle-exclamation');
                return;
            }

            if (method === 'QRIS') {
                if (!currentQrisProof['po-pay']) {
    showToast('Harap foto bukti pelunasan QRIS terlebih dahulu!', 'fa-camera');
    return;
}
                if (!confirm(`Konfirmasi penerimaan pembayaran QRIS sebesar ${formatRp(amount)}?`)) {
                    return;
                }
            }

            po.totalPaid += amount;
            po.balanceRemaining = Math.max(0, po.totalAmount - po.totalPaid);

            if (po.balanceRemaining === 0) {
                po.paymentStatus = 'Lunas';
            } else {
                po.paymentStatus = 'Sudah DP';
            }

            const remark = po.balanceRemaining === 0 ? 'Pelunasan Akhir' : 'Pembayaran Cicilan/DP Tambahan';

            po.paymentHistory.unshift({
                id: 'PAY-' + Date.now().toString().slice(-6),
                date: new Date().toISOString(),
                amount: amount,
                method: method,
                remark: remark,
                proofImage: method === 'QRIS' ? currentQrisProof['po-pay'] : null
            });

            // Log Income immediately
            historyLogs.unshift({
                id: 'TX-' + Math.floor(100000 + Math.random() * 900000),
                date: new Date().toISOString(),
                orderId: po.id,
                customer: po.customerName,
                type: remark,
                method: method,
                amount: amount,
                proofImage: method === 'QRIS' ? currentQrisProof['po-pay'] : null
            });
currentQrisProof['po-pay'] = null;
const poPayPrev = document.getElementById('po-pay-qris-proof-preview');
const poPayInp = document.getElementById('po-pay-qris-proof-input');
if (poPayPrev) poPayPrev.classList.add('hidden');
if (poPayInp) poPayInp.value = '';
            saveState();

closePoPayModal();

// Perbarui semua tampilan setelah pembayaran
renderPoList();
renderDashboard();
renderHistoryTable();
renderIncomeStats();

showToast('Pembayaran PO Berhasil Dicatat!');
        }

        function openPoHistoryModal(poId) {
            const po = preOrders.find(p => p.id === poId);
            if (!po) return;

            const list = document.getElementById('po-history-list');
            if (!po.paymentHistory || po.paymentHistory.length === 0) {
                list.innerHTML = `<div class="text-center text-slate-400 py-4 text-xs font-medium">Belum ada riwayat pembayaran</div>`;
            } else {
                list.innerHTML = po.paymentHistory.map(pay => `
                    <div class="p-3 bg-slate-50 rounded-lg border border-slate-300 text-xs font-semibold flex justify-between items-center">
                        <div>
                            <span class="text-slate-900 block font-bold">${pay.remark}</span>
                            <span class="text-[10px] text-slate-500">${new Date(pay.date).toLocaleString('id-ID')} (${pay.method})</span>
                        </div>
                        <span class="text-brand-green font-bold text-sm">${formatRp(pay.amount)}</span>
                    </div>
                `).join('');
            }

            document.getElementById('po-history-modal').classList.remove('hidden');
        }

        function closePoHistoryModal() {
            document.getElementById('po-history-modal').classList.add('hidden');
        }


        // ================= 5. CHECKLIST PENGAMBILAN BARANG =================
        function openPoPickupModal(poId) {
            const po = preOrders.find(p => p.id === poId);
            if (!po) return;
            activePoForPickup = po;

            document.getElementById('pickup-modal-cust').innerText = po.customerName;
            document.getElementById('pickup-modal-status').innerText = `Status Ambil: ${po.pickupStatus}`;

            const container = document.getElementById('pickup-modal-items-list');
            container.innerHTML = '';

            po.items.forEach((item, index) => {
                const el = document.createElement('div');
                el.className = "p-3 bg-slate-50 rounded-xl border border-black space-y-2";
                
                let qtyOptions = '';
                for (let q = item.qtyPicked; q <= item.qtyTotal; q++) {
                    qtyOptions += `<option value="${q}" ${q === item.qtyPicked ? 'selected' : ''}>${q} pcs</option>`;
                }

                el.innerHTML = `
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="font-bold text-slate-900 text-sm block">${item.name}</span>
                            <span class="text-xs text-slate-500">Total Pesan: ${item.qtyTotal} pcs | Sudah Diambil: ${item.qtyPicked} pcs</span>
                        </div>
                        <div>
                            <select data-index="${index}" class="pickup-qty-select p-1 border-2 border-black rounded text-xs font-bold bg-white">
                                ${qtyOptions}
                            </select>
                        </div>
                    </div>
                `;
                container.appendChild(el);
            });

            document.getElementById('po-pickup-modal').classList.remove('hidden');
        }

        function closePoPickupModal() {
            activePoForPickup = null;
            document.getElementById('po-pickup-modal').classList.add('hidden');
        }

        function savePoPickupChecklist() {
            if (!activePoForPickup) return;
            const po = preOrders.find(p => p.id === activePoForPickup.id);
            if (!po) return;

            const selects = document.querySelectorAll('.pickup-qty-select');
            let newlyHandedOut = [];

            selects.forEach(select => {
                const idx = parseInt(select.getAttribute('data-index'));
                const newQtyPicked = parseInt(select.value) || 0;
                const oldQtyPicked = po.items[idx].qtyPicked;
                const delta = newQtyPicked - oldQtyPicked;

                if (delta > 0) {
                    newlyHandedOut.push({ productId: po.items[idx].productId, delta: delta });
                }
                po.items[idx].qtyPicked = newQtyPicked;
            });

            // Update Physical Stock & Release Allocation for handed out products
            newlyHandedOut.forEach(h => {
                const prod = products.find(p => p.id === h.productId);
                if (prod) {
                    prod.stock = Math.max(0, prod.stock - h.delta);
                    prod.allocated = Math.max(0, prod.allocated - h.delta);
                    prod.sold = (prod.sold || 0) + h.delta;
                }
            });

            // Update Pickup Status
            const totalQty = po.items.reduce((s, i) => s + i.qtyTotal, 0);
            const totalPicked = po.items.reduce((s, i) => s + i.qtyPicked, 0);

            if (totalPicked === 0) {
                po.pickupStatus = 'Belum Diambil';
            } else if (totalPicked < totalQty) {
                po.pickupStatus = 'Sebagian Diambil';
            } else {
                po.pickupStatus = 'Selesai';
            }

            syncAllocations();
            closePoPickupModal();
            renderPoList();
            showToast('Status Pengambilan Disimpan!');
        }


        // ================= 6. RIWAYAT TRANSAKSI =================
        function renderHistoryTable() {
            const tbody = document.getElementById('history-table-body');
            if (!tbody) return;

            const dateFilter = document.getElementById('history-date-filter')?.value || '';
            const methodFilter = document.getElementById('history-method-filter')?.value || '';
            const searchFilter = (document.getElementById('history-search')?.value || '').toLowerCase();

            const filtered = historyLogs.filter(h => {
                const txDate = (h.date || '').split('T')[0];
                const matchDate = !dateFilter || txDate === dateFilter;
                const matchMethod = !methodFilter || h.method === methodFilter;
                const matchSearch = (h.customer || '').toLowerCase().includes(searchFilter) ||
                                    (h.id || '').toLowerCase().includes(searchFilter) ||
                                    (h.orderId || '').toLowerCase().includes(searchFilter);
                return matchDate && matchMethod && matchSearch;
            });

            if (filtered.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="p-8 text-center text-slate-400 font-bold">
                            Tidak ada riwayat transaksi ditemukan.
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = filtered.map(h => {
                const itemsText = (h.items && h.items.length > 0)
                    ? h.items.map(i => `${i.name} (${i.qty}x)`).join(', ')
                    : (h.orderId || '-');

                return `
                    <tr class="hover:bg-slate-50 border-b text-xs">
                        <td class="p-3 font-semibold text-slate-600">${new Date(h.date).toLocaleString('id-ID')}</td>
                        <td class="p-3 font-mono font-bold text-slate-800">${h.id}</td>
                        <td class="p-3 font-bold text-slate-900">
    ${(h.method === 'QRIS' && h.proofImage)
        ? `<button onclick="openQrisProofViewer('${h.id}')" class="text-left font-bold text-brand-blue underline hover:text-blue-800 inline-flex items-center gap-1" title="Klik untuk lihat foto bukti QRIS"><i class="fa-solid fa-camera text-xs"></i> ${h.customer}</button>`
        : h.customer}
</td>
                        <td class="p-3 font-semibold text-slate-700">${h.type}</td>
                        <td class="p-3 text-slate-600">${itemsText}</td>
                        <td class="p-3">
                            <span class="px-2 py-0.5 rounded border border-black font-bold ${h.method === 'QRIS' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                                ${h.method}
                            </span>
                        </td>
                        <td class="p-3 font-bold text-brand-blue text-right">
                            ${formatRp(h.amount)}
                            <button onclick="deleteHistoryTransaction('${h.id}')" title="Hapus Transaksi" class="ml-2 px-2 py-0.5 bg-red-100 text-red-700 border border-red-400 rounded hover:bg-red-200">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
        function deleteHistoryTransaction(transactionId) {

    const transaction = historyLogs.find(
        h => h.id === transactionId
    );

    if (!transaction) {
        showToast('Transaksi tidak ditemukan!', 'fa-circle-exclamation');
        return;
    }

    const confirmation = confirm(
        `Yakin ingin menghapus transaksi ini?\n\n` +
        `Pelanggan: ${transaction.customer}\n` +
        `Jenis: ${transaction.type}\n` +
        `Nominal: ${formatRp(transaction.amount)}\n\n` +
        `Data yang dihapus hanya riwayat transaksi.`
    );

    if (!confirmation) return;

    historyLogs = historyLogs.filter(
        h => h.id !== transactionId
    );

    saveState();

    renderHistoryTable();
    renderDashboard();
    renderIncomeStats();

    showToast('Riwayat transaksi berhasil dihapus!');
}


        // ================= 7. LAPORAN PEMASUKAN =================
        function renderIncomeStats() {
            let daily = 0;
            let weekly = 0;
            let monthly = 0;

            const now = new Date();
            const todayStr = now.toISOString().split('T')[0];

            let dpTotal = 0;
            let pelunasanTotal = 0;
            let posTotal = 0;
            let cashGrand = 0;
            let qrisGrand = 0;

            historyLogs.forEach(h => {
                const hDate = new Date(h.date);
                const hDateStr = h.date.split('T')[0];

                if (hDateStr === todayStr) daily += h.amount;

                const diffDays = Math.ceil(Math.abs(now - hDate) / (1000 * 60 * 60 * 24));
                if (diffDays <= 7) weekly += h.amount;

                if (hDate.getMonth() === now.getMonth() && hDate.getFullYear() === now.getFullYear()) {
                    monthly += h.amount;
                }

                if (h.type.includes('DP')) dpTotal += h.amount;
                else if (h.type.includes('Pelunasan') || h.type.includes('Cicilan')) pelunasanTotal += h.amount;
                else posTotal += h.amount;

                if (h.method === 'CASH') cashGrand += h.amount;
                if (h.method === 'QRIS') qrisGrand += h.amount;
            });

            document.getElementById('stat-daily').innerText = formatRp(daily);
            document.getElementById('stat-weekly').innerText = formatRp(weekly);
            document.getElementById('stat-monthly').innerText = formatRp(monthly);

            document.getElementById('stat-dp-total').innerText = formatRp(dpTotal);
            document.getElementById('stat-pelunasan-total').innerText = formatRp(pelunasanTotal);
            document.getElementById('stat-pos-total').innerText = formatRp(posTotal);
            document.getElementById('stat-cash-grand').innerText = formatRp(cashGrand);
            document.getElementById('stat-qris-grand').innerText = formatRp(qrisGrand);

            // Top Products
            const topList = document.getElementById('top-products-list');
            const sortedProducts = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0));
            topList.innerHTML = sortedProducts.slice(0, 5).map((p, idx) => `
                <div class="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-black text-xs font-semibold">
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-brand-yellow border border-black flex items-center justify-center font-bold font-pop">${idx + 1}</span>
                        <span>${p.name}</span>
                    </div>
                    <span class="font-bold text-brand-blue">${p.sold || 0} Terjual</span>
                </div>
            `).join('');
        }


        // ================= 8. MANAJEMEN PRODUK =================
        function renderProductTable() {
            const body = document.getElementById('product-table-body');
            if (!body) return;
            body.innerHTML = '';

            products.forEach(p => {
                const available = Number(p.stock) - Number(p.allocated || 0);
                const row = document.createElement('tr');
                row.className = "hover:bg-slate-50 text-xs";
                row.innerHTML = `
                    <td class="p-3 border-b">
                        <img src="${p.image || 'https://placehold.co/100x100?text=Foto'}" class="w-10 h-10 object-cover rounded-lg border border-black">
                    </td>
                    <td class="p-3 border-b font-bold text-slate-900">${p.name}</td>
                    <td class="p-3 border-b"><span class="px-2 py-0.5 rounded border border-black text-xs bg-slate-100 font-bold">${p.category || 'Umum'}</span></td>
                    <td class="p-3 border-b font-bold text-brand-blue">${formatRp(p.price)}</td>
                    <td class="p-3 border-b font-bold text-slate-700">${p.stock}</td>
                    <td class="p-3 border-b font-bold text-yellow-600">${p.allocated || 0}</td>
                    <td class="p-3 border-b font-bold ${available <= 5 ? 'text-red-600' : 'text-green-600'}">${available}</td>
                    <td class="p-3 border-b font-bold text-slate-800">${p.sold || 0}</td>
                    <td class="p-3 border-b text-center space-x-1 relative z-10">
                        <button type="button" onclick="openProductModal('${p.id}')" class="px-2 py-1 bg-blue-100 text-blue-700 font-bold text-xs border border-blue-400 rounded hover:bg-blue-200 cursor-pointer">Edit</button>
                        <button type="button" onclick="deleteProduct('${p.id}')" class="px-2 py-1 bg-red-100 text-red-700 font-bold text-xs border border-red-400 rounded hover:bg-red-200 cursor-pointer">Hapus</button>
                    </td>
                `;
                body.appendChild(row);
            });
        }

        function openProductModal(productId = null) {
            const modal = document.getElementById('product-modal');
            const title = document.getElementById('product-modal-title');
            const form = document.getElementById('product-form');

            if (!modal) return;

            if (productId) {
                const p = products.find(prod => String(prod.id) === String(productId));
                if (p) {
                    if (title) title.innerText = 'Edit Produk';
                    document.getElementById('prod-id').value = p.id;
                    document.getElementById('prod-name').value = p.name;
                    document.getElementById('prod-category').value = p.category || '';
                    document.getElementById('prod-image').value = p.image || '';
                    document.getElementById('prod-price').value = p.price;
                    document.getElementById('prod-stock').value = p.stock;
                }
            } else {
                if (title) title.innerText = 'Tambah Produk';
                if (form) form.reset();
                document.getElementById('prod-id').value = '';
            }

            modal.classList.remove('hidden');
        }

        function closeProductModal() {
            const modal = document.getElementById('product-modal');
            if (modal) modal.classList.add('hidden');
        }

        function saveProduct(e) {
            if (e) e.preventDefault();
            
            const id = document.getElementById('prod-id').value.trim();
            const name = document.getElementById('prod-name').value.trim();
            const category = document.getElementById('prod-category').value.trim();
            const image = document.getElementById('prod-image').value.trim();
            const price = parseFloat(document.getElementById('prod-price').value) || 0;
            const stock = parseInt(document.getElementById('prod-stock').value) || 0;

            if (!name) {
                showToast('Nama produk wajib diisi!', 'fa-circle-exclamation');
                return;
            }

            if (id) {
                // Proses Edit Produk
                const p = products.find(prod => String(prod.id) === String(id));
                if (p) {
                    p.name = name;
                    p.category = category;
                    p.image = image;
                    p.price = price;
                    p.stock = stock;
                }
            } else {
                // Proses Tambah Produk Baru
                const newProd = {
                    id: 'p-' + Date.now(),
                    name: name,
                    category: category || 'Umum',
                    image: image,
                    price: price,
                    stock: stock,
                    allocated: 0,
                    sold: 0
                };
                products.push(newProd);
            }

            // Simpan perubahan secara permanen ke localStorage
            saveState();
            closeProductModal();
            renderProductTable();
            renderDashboard();
            showToast('Data produk berhasil disimpan!');
        }

        function deleteProduct(productId) {
            const p = products.find(prod => String(prod.id) === String(productId));
            if (!p) return;

            if (Number(p.allocated || 0) > 0) {
                showToast('Tidak bisa menghapus produk yang sedang dialokasikan PO!', 'fa-circle-exclamation');
                return;
            }

            if (confirm(`Yakin ingin menghapus produk "${p.name}"?`)) {
                products = products.filter(prod => String(prod.id) === String(productId));
                saveState();
                renderProductTable();
                renderDashboard();
                showToast('Produk berhasil dihapus.');
            }
        }


        // ================= 9. PENGATURAN QRIS =================
        function renderSettings() {
            document.getElementById('settings-qris-preview').src = qrisImgUrl;
        }

        function handleQrisUpload(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(event) {
                qrisImgUrl = event.target.result;
                saveState();
                renderSettings();
                showToast('Gambar QRIS Berhasil Diperbarui!');
            };
            reader.readAsDataURL(file);
        }


        // INITIALIZATION
       window.onload = function() {
    syncAllocations();

    const now = new Date();

    document.getElementById('dashboard-clock').innerText =
        now.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

    // Tampilkan semua pesanan dari berbagai tanggal
    document.getElementById('po-date-filter').value = '';

    renderDashboard();
    setPosPaymentMethod('CASH');
    renderCart();
};
// ================= 10. GENERATOR QRIS DINAMIS OTOMATIS =================
        let STATIC_QRIS_RAW = localStorage.getItem('got_qris_raw') || '';

        // Otomatis baca teks QRIS dari gambar QRIS yang tersimpan di pengaturan
        function extractQrisFromImage(imgUrl, callback) {
            if (!imgUrl || imgUrl.includes('api.qrserver.com')) return;
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                if (window.jsQR) {
                    const code = window.jsQR(imgData.data, imgData.width, imgData.height);
                    if (code && code.data && code.data.startsWith('000201')) {
                        STATIC_QRIS_RAW = code.data;
                        localStorage.setItem('got_qris_raw', code.data);
                        if (callback) callback();
                    }
                }
            };
            img.src = imgUrl;
        }

        function crc16Qris(str) {
            let crc = 0xFFFF;
            for (let i = 0; i < str.length; i++) {
                crc ^= str.charCodeAt(i) << 8;
                for (let j = 0; j < 8; j++) {
                    crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
                }
            }
            return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
        }

        function getDynamicQrisUrl(amount) {
            const nominal = Math.round(Number(amount) || 0);
            if (!STATIC_QRIS_RAW || nominal <= 0) {
                return qrisImgUrl || DEFAULT_QRIS;
            }
            let qrisBase = STATIC_QRIS_RAW.slice(0, -4).replace('010211', '010212');
            const amtStr = String(nominal);
            const tag54 = '54' + String(amtStr.length).padStart(2, '0') + amtStr;

            const idx58 = qrisBase.indexOf('5802ID');
            if (idx58 === -1) return qrisImgUrl || DEFAULT_QRIS;

            const payloadWithoutCrc = qrisBase.slice(0, idx58) + tag54 + qrisBase.slice(idx58);
            const dynamicPayload = payloadWithoutCrc + crc16Qris(payloadWithoutCrc);

            return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(dynamicPayload)}`;
        }

        function updatePosDynamicQris() {
            const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const qrisImage = document.getElementById('pos-qris-img');
            if (!STATIC_QRIS_RAW && qrisImgUrl) {
                extractQrisFromImage(qrisImgUrl, updatePosDynamicQris);
            }
            if (qrisImage) qrisImage.src = getDynamicQrisUrl(total);
        }

        // Jalankan pembacaan gambar QRIS saat halaman dibuka
        if (!STATIC_QRIS_RAW && qrisImgUrl) {
            extractQrisFromImage(qrisImgUrl);
        }
        
        // ================= 11. EXPORT LAPORAN KEUANGAN KE EXCEL (.XLSX) =================
        function exportToExcel() {
            if (typeof XLSX === 'undefined') {
                showToast('Library Excel belum termuat, coba refresh halaman!', 'fa-circle-exclamation');
                return;
            }

            const wb = XLSX.utils.book_new();

            // Helper untuk mengambil daftar kategori & rincian menu (baik dari POS maupun Pre-Order)
            function getTransactionDetails(h) {
                let itemList = [];

                if (h.items && h.items.length > 0) {
                    itemList = h.items;
                } else if (h.orderId) {
                    const relatedPo = preOrders.find(po => po.id === h.orderId);
                    if (relatedPo && relatedPo.items) {
                        itemList = relatedPo.items.map(i => ({
                            productId: i.productId,
                            name: i.name,
                            qty: i.qtyTotal
                        }));
                    }
                }

                if (itemList.length === 0) {
                    return {
                        categories: h.type || '-',
                        menus: '-'
                    };
                }

                const categorySet = new Set();
                const menuStrings = itemList.map(item => {
                    const prod = products.find(p => p.id === item.productId || p.name === item.name);
                    if (prod && prod.category) {
                        categorySet.add(prod.category);
                    }
                    return `${item.name} (${item.qty}x)`;
                });

                return {
                    categories: categorySet.size > 0 ? Array.from(categorySet).join(', ') : 'Umum',
                    menus: menuStrings.join(', ')
                };
            }

            // Susun baris laporan dalam 1 sheet utama
            const rows = [
                ['LAPORAN RIWAYAT TRANSAKSI & PENDAPATAN — GET ON THE ANGKOT'],
                ['Dicetak pada: ' + new Date().toLocaleString('id-ID')],
                [''],
                [
                    'No',
                    'Waktu Transaksi',
                    'Nama Pelanggan',
                    'Kategori Makanan',
                    'Menu yang Dipesan',
                    'Metode Pembayaran',
                    'Nominal (Rp)'
                ]
            ];

            // Urutkan transaksi dari yang paling awal ke terbaru agar kronologis rapi
            const sortedLogs = [...historyLogs].reverse();

            sortedLogs.forEach((h, idx) => {
                const details = getTransactionDetails(h);
                rows.push([
                    idx + 1,
                    new Date(h.date).toLocaleString('id-ID'),
                    h.customer || 'Pelanggan Umum',
                    details.categories,
                    details.menus,
                    (h.method || '').toUpperCase(),
                    Number(h.amount || 0)
                ]);
            });

            const firstDataRow = 5;
            const lastDataRow = 4 + sortedLogs.length;

            const cashTotal = sortedLogs
                .filter(h => (h.method || '').toUpperCase() === 'CASH')
                .reduce((sum, h) => sum + Number(h.amount || 0), 0);

            const qrisTotal = sortedLogs
                .filter(h => (h.method || '').toUpperCase() === 'QRIS')
                .reduce((sum, h) => sum + Number(h.amount || 0), 0);

            const grandTotal = cashTotal + qrisTotal;

            // Baris kosong pemisah sebelum ringkasan total
            rows.push(['']);

            if (sortedLogs.length > 0) {
                rows.push([
                    '', '', '', '', '',
                    'TOTAL PENDAPATAN CASH (TUNAI)',
                    { t: 'n', v: cashTotal, f: `SUMIF(F${firstDataRow}:F${lastDataRow},"CASH",G${firstDataRow}:G${lastDataRow})` }
                ]);
                rows.push([
                    '', '', '', '', '',
                    'TOTAL PENDAPATAN QRIS',
                    { t: 'n', v: qrisTotal, f: `SUMIF(F${firstDataRow}:F${lastDataRow},"QRIS",G${firstDataRow}:G${lastDataRow})` }
                ]);
                rows.push([
                    '', '', '', '', '',
                    'TOTAL PENDAPATAN KESELURUHAN',
                    { t: 'n', v: grandTotal, f: `SUM(G${lastDataRow + 2}:G${lastDataRow + 3})` }
                ]);
            } else {
                rows.push(['', '', '', '', '', 'TOTAL PENDAPATAN CASH (TUNAI)', 0]);
                rows.push(['', '', '', '', '', 'TOTAL PENDAPATAN QRIS', 0]);
                rows.push(['', '', '', '', '', 'TOTAL PENDAPATAN KESELURUHAN', 0]);
            }

            const ws = XLSX.utils.aoa_to_sheet(rows);

            // Atur lebar setiap kolom agar rapi dan tidak terpotong
            ws['!cols'] = [
                { wch: 6 },   // No
                { wch: 22 },  // Waktu Transaksi
                { wch: 22 },  // Nama Pelanggan
                { wch: 22 },  // Kategori Makanan
                { wch: 38 },  // Menu yang Dipesan
                { wch: 32 },  // Metode Pembayaran & Label Total
                { wch: 18 }   // Nominal (Rp)
            ];

            // Format angka ribuan pada seluruh kolom Nominal (kolom G)
            for (let r = firstDataRow; r <= lastDataRow + 4; r++) {
                const cellRef = 'G' + r;
                if (ws[cellRef] && typeof ws[cellRef].v === 'number') {
                    ws[cellRef].z = '#,##0';
                }
            }

            XLSX.utils.book_append_sheet(wb, ws, 'Laporan Keuangan');

            const dateStamp = new Date().toISOString().split('T')[0];
            XLSX.writeFile(wb, `Laporan_Keuangan_GetOnTheAngkot_${dateStamp}.xlsx`);
            showToast('Laporan Excel berhasil diunduh!');
        }
        // Kompres foto dari kamera HP/tablet otomatis agar ringan disimpan
function handleQrisProofUpload(event, context) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const maxDim = 900;
            let width = img.width;
            let height = img.height;

            if (width > height && width > maxDim) {
                height *= maxDim / width;
                width = maxDim;
            } else if (height > maxDim) {
                width *= maxDim / height;
                height = maxDim;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
            currentQrisProof[context] = compressedDataUrl;

            document.getElementById(`${context}-qris-proof-img`).src = compressedDataUrl;
            document.getElementById(`${context}-qris-proof-preview`).classList.remove('hidden');
            showToast('Foto bukti QRIS berhasil diambil!');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function togglePoQrisProof() {
    const method = document.getElementById('po-dp-method').value;
    const box = document.getElementById('po-qris-proof-box');
    if (box) {
        if (method === 'QRIS') box.classList.remove('hidden');
        else box.classList.add('hidden');
    }
}

function openQrisProofViewer(txId) {
    const tx = historyLogs.find(h => h.id === txId);
    if (!tx || !tx.proofImage) {
        showToast('Belum ada foto bukti QRIS pada transaksi ini.', 'fa-circle-exclamation');
        return;
    }
    document.getElementById('proof-viewer-customer').innerText = tx.customer || 'PELANGGAN';
    document.getElementById('proof-viewer-meta').innerText = `${tx.type} • ${formatRp(tx.amount)} • ${new Date(tx.date).toLocaleString('id-ID')}`;
    document.getElementById('proof-viewer-img').src = tx.proofImage;
    document.getElementById('qris-proof-viewer-modal').classList.remove('hidden');
}
if (typeof savePo === 'undefined' && typeof submitPo === 'function') {
    window.savePo = submitPo;
} else if (typeof submitPo === 'undefined' && typeof savePo === 'function') {
    window.submitPo = savePo;
}
