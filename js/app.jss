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
                paymentStatus: 'Sudah DP',
                pickupStatus: 'Belum Diambil',
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
        let products = JSON.parse(localStorage.getItem('got_products_v2') || 'null') || INITIAL_PRODUCTS;
        if (!Array.isArray(products)) products = INITIAL_PRODUCTS.slice();

const mochiVariants = [
    { id: 'mochi-lotus', name: 'Mochi Lotus' },
    { id: 'mochi-strawberry', name: 'Mochi Strawberry' },
    { id: 'mochi-mangga', name: 'Mochi Mangga' },
    { id: 'mochi-cookies', name: 'Mochi Cookies' }
];

let mochiAdded = false;

mochiVariants.forEach(variant => {
    const alreadyExists = products.some(p => p.id === variant.id);

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
    localStorage.setItem('got_products_v2', JSON.stringify(products));
}

        let preOrders = JSON.parse(localStorage.getItem('got_preorders_v2') || 'null') || INITIAL_POS;
        if (!Array.isArray(preOrders)) preOrders = INITIAL_POS.slice();

        let historyLogs = JSON.parse(localStorage.getItem('got_history_v2') || 'null') || [
            { id: 'tx-1001', date: '2026-11-10T10:00:00', orderId: 'po-101', customer: 'ANISA', type: 'DP Pre-Order', method: 'QRIS', amount: 20000 },
            { id: 'tx-1002', date: '2026-11-12T14:30:00', orderId: 'po-102', customer: 'SALMA', type: 'Pembayaran Lunas Pre-Order', method: 'CASH', amount: 25000 }
        ];
        if (!Array.isArray(historyLogs)) historyLogs = [];

        let qrisImgUrl = localStorage.getItem('got_qris_url') || DEFAULT_QRIS;
        let cart = JSON.parse(localStorage.getItem('got_cart_v1') || '[]');
        if (!Array.isArray(cart)) cart = [];

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
                    (po.items || []).forEach(item => {
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
            const badge = document.getElementById('po-badge');
            if (badge) badge.innerText = pendingCount;
        }

        // SWITCH TAB NAVIGATION
        function switchTab(tabId) {
            ['dashboard', 'pos', 'po', 'history', 'income', 'products', 'settings'].forEach(tab => {
                const navBtn = document.getElementById(`nav-${tab}`);
                const tabSec = document.getElementById(`tab-${tab}`);
                if (!navBtn || !tabSec) return;

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
            const message = document.getElementById('toast-message');
            const iconEl = document.getElementById('toast-icon');
            if (!toast || !message || !iconEl) return;

            message.innerText = msg;
            iconEl.className = `fa-solid ${icon} text-brand-yellow`;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        // ================= 1. DASHBOARD =================
        function renderDashboard() {
            const totalIncome = historyLogs.reduce((sum, h) => sum + Number(h.amount || 0), 0);
            const totalTx = historyLogs.length;

            document.getElementById('dash-total-income').innerText = formatRp(totalIncome);
            document.getElementById('dash-total-tx').innerText = totalTx;
            document.getElementById('dash-total-products').innerText = products.length;

            const lowStockCount = products.filter(p => (p.stock - p.allocated) <= 5).length;
            document.getElementById('dash-low-stock-alert').innerText = `${lowStockCount} Stok Menipis (<= 5)`;

            document.getElementById('dash-total-po').innerText = preOrders.length;
            document.getElementById('dash-po-unpaid').innerText = preOrders.filter(p => p.paymentStatus === 'Belum Bayar').length;
            document.getElementById('dash-po-dp').innerText = preOrders.filter(p => p.paymentStatus === 'Sudah DP').length;
            document.getElementById('dash-po-paid').innerText = preOrders.filter(p => p.paymentStatus === 'Lunas').length;
            document.getElementById('dash-po-pending-pickup').innerText = preOrders.filter(p => p.pickupStatus !== 'Selesai').length;

            const cashLogs = historyLogs.filter(h => (h.method || '').toUpperCase() === 'CASH');
            const qrisLogs = historyLogs.filter(h => (h.method || '').toUpperCase() === 'QRIS');

            document.getElementById('dash-cash-income').innerText = formatRp(cashLogs.reduce((sum, h) => sum + Number(h.amount || 0), 0));
            document.getElementById('dash-cash-tx-count').innerText = `${cashLogs.length} Transaksi`;
            document.getElementById('dash-qris-income').innerText = formatRp(qrisLogs.reduce((sum, h) => sum + Number(h.amount || 0), 0));
            document.getElementById('dash-qris-tx-count').innerText = `${qrisLogs.length} Transaksi`;
        }

        // ================= 2. KASIR (POS) =================
        function populatePosCategories() {
            const select = document.getElementById('pos-category-filter');
            if (!select) return;

            const selectedCategory = select.value;
            const categories = [...new Set(products.map(p => p.category || 'Umum'))];

            select.innerHTML = `<option value="">Semua Kategori</option>`;
            categories.forEach(c => {
                select.innerHTML += `<option value="${c}">${c}</option>`;
            });

            select.value = categories.includes(selectedCategory) ? selectedCategory : '';
        }

        function renderPosProducts() {
            populatePosCategories();

            const grid = document.getElementById('pos-product-grid');
            const searchEl = document.getElementById('pos-search');
            const categoryEl = document.getElementById('pos-category-filter');
            if (!grid || !searchEl || !categoryEl) return;

            const search = searchEl.value.trim().toLowerCase();
            const cat = categoryEl.value;
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

                card.className = 'bg-white rounded-xl neo-border neo-shadow overflow-hidden flex flex-col justify-between';
                card.innerHTML = `
                    <div>
                        <div class="h-28 bg-slate-100 overflow-hidden">
                            <img src="${p.image || 'https://placehold.co/200x200?text=Produk'}" alt="${p.name}" class="w-full h-full object-cover">
                        </div>
                        <div class="p-3">
                            <h4 class="font-pop text-base font-bold">${p.name}</h4>
                            <p class="text-xs text-slate-500">${p.category}</p>
                            <div class="text-brand-blue font-bold mt-1">${formatRp(p.price)}</div>
                            <span class="inline-block mt-2 px-2 py-1 rounded text-xs font-bold ${available > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                                Stok: ${available}
                            </span>
                        </div>
                    </div>
                    <div class="p-3 pt-0">
                        <button onclick="addToCart('${p.id}')" ${available <= 0 ? 'disabled' : ''} class="w-full py-2 bg-brand-yellow text-black font-bold rounded-lg neo-border neo-shadow-sm disabled:opacity-50">
                            <i class="fa-solid fa-plus mr-1"></i>
                            ${available > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                        </button>
                    </div>
                `;
                grid.appendChild(card);
            });

            const qrisImg = document.getElementById('pos-qris-img');
            if (qrisImg) qrisImg.src = qrisImgUrl;
        }

        function addToCart(productId) {
            const prod = products.find(p => p.id === productId);
            if (!prod) return;

            const available = prod.stock - prod.allocated;
            const item = cart.find(c => c.productId === productId);

            if (item) {
                if (item.qty + 1 > available) {
                    showToast('Jumlah melebihi stok tersedia!', 'fa-circle-exclamation');
                    return;
                }
                item.qty++;
            } else {
                if (available <= 0) {
                    showToast('Stok produk habis!', 'fa-circle-exclamation');
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
                showToast('Stok tidak mencukupi!', 'fa-circle-exclamation');
                return;
            }

            item.qty += delta;
            if (item.qty <= 0) {
                cart = cart.filter(c => c.productId !== productId);
            }
            renderCart();
        }
        function openPoModal() {
    editingPoId = null;
    const poModalTitle = document.getElementById('po-modal-title');
    if (poModalTitle) poModalTitle.innerText = 'Buat Pesanan PO Baru';

    const inputName = document.getElementById('po-input-name');
    if (inputName) inputName.value = '';

    const inputPhone = document.getElementById('po-input-phone');
    if (inputPhone) inputPhone.value = '';

    const inputOrderDate = document.getElementById('po-input-order-date');
    if (inputOrderDate) inputOrderDate.value = new Date().toISOString().split('T')[0];

    const inputPickupDate = document.getElementById('po-input-pickup-date');
    if (inputPickupDate) inputPickupDate.value = '';

    const inputDp = document.getElementById('po-input-dp');
    if (inputDp) {
        inputDp.disabled = false;
        inputDp.value = 0;
    }

    const dpMethod = document.getElementById('po-dp-method');
    if (dpMethod) {
        dpMethod.disabled = false;
        dpMethod.value = 'CASH';
    }

    currentQrisProof.po = null;
    const poQrisBox = document.getElementById('po-qris-proof-box');
    const poQrisPrev = document.getElementById('po-qris-proof-preview');
    const poQrisInp = document.getElementById('po-qris-proof-input');
    if (poQrisBox) poQrisBox.classList.add('hidden');
    if (poQrisPrev) poQrisPrev.classList.add('hidden');
    if (poQrisInp) poQrisInp.value = '';

    const selector = document.getElementById('po-product-selector');
    if (selector) {
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
    }

    if (typeof calculatePoBalance === 'function') {
        calculatePoBalance();
    }

    const modal = document.getElementById('po-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    } else {
        console.error("Elemen modal 'po-modal' tidak ditemukan di HTML!");
    }
}

function openEditPoModal(poId) {
    const po = preOrders.find(p => p.id === poId);
    if (!po) return;

    editingPoId = poId;
    document.getElementById('po-input-name').value = po.customerName;
    document.getElementById('po-input-phone').value = po.phone || '';
    document.getElementById('po-input-order-date').value = po.orderDate;
    document.getElementById('po-input-pickup-date').value = po.pickupDate;

    document.getElementById('po-input-dp').disabled = false;
    document.getElementById('po-dp-method').disabled = false;
    document.getElementById('po-input-dp').value = po.totalPaid || 0;

    if (po.paymentHistory && po.paymentHistory.length > 0) {
        document.getElementById('po-dp-method').value = po.paymentHistory[0].method || 'CASH';
    } else {
        document.getElementById('po-dp-method').value = 'CASH';
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
    const modal = document.getElementById('po-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
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

    if (existingPo) {
        if (dp < 0 || dp > total) {
            showToast('Nominal pembayaran tidak valid!', 'fa-circle-exclamation');
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
        showToast('Perubahan Pre-Order berhasil disimpan!');
        return;
    }

    if (dp < 0 || dp > total) {
        showToast('Nominal pembayaran DP tidak valid!', 'fa-circle-exclamation');
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
    renderHistoryTable();
    renderIncomeStats();
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
        modal.style.display = 'none';
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
    const modal = document.getElementById('po-history-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
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
    const modal = document.getElementById('po-pickup-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
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

    newlyHandedOut.forEach(h => {
        const prod = products.find(p => p.id === h.productId);
        if (prod) {
            prod.stock = Math.max(0, prod.stock - h.delta);
            prod.allocated = Math.max(0, prod.allocated - h.delta);
            prod.sold = (prod.sold || 0) + h.delta;
        }
    });

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
    const transaction = historyLogs.find(h => h.id === transactionId);

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

    historyLogs = historyLogs.filter(h => h.id !== transactionId);

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
        const hDateStr = String(h.date || '').split('T')[0];
        const amount = Number(h.amount || 0);

        if (hDateStr === todayStr) daily += amount;

        const diffDays = Math.ceil(Math.abs(now - hDate) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) weekly += amount;

        if (hDate.getMonth() === now.getMonth() && hDate.getFullYear() === now.getFullYear()) {
            monthly += amount;
        }

        const transactionType = String(h.type || '');
        if (transactionType.includes('DP')) dpTotal += amount;
        else if (transactionType.includes('Pelunasan') || transactionType.includes('Cicilan')) pelunasanTotal += amount;
        else posTotal += amount;

        if (h.method === 'CASH') cashGrand += amount;
        if (h.method === 'QRIS') qrisGrand += amount;
    });

    document.getElementById('stat-daily').innerText = formatRp(daily);
    document.getElementById('stat-weekly').innerText = formatRp(weekly);
    document.getElementById('stat-monthly').innerText = formatRp(monthly);

    document.getElementById('stat-dp-total').innerText = formatRp(dpTotal);
    document.getElementById('stat-pelunasan-total').innerText = formatRp(pelunasanTotal);
    document.getElementById('stat-pos-total').innerText = formatRp(posTotal);
    document.getElementById('stat-cash-grand').innerText = formatRp(cashGrand);
    document.getElementById('stat-qris-grand').innerText = formatRp(qrisGrand);

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

    if (!products || products.length === 0) {
        body.innerHTML = `
            <tr>
                <td colspan="9" class="p-8 text-center text-slate-400 font-bold">
                    Belum ada produk. Silakan tambahkan produk baru.
                </td>
            </tr>
        `;
        return;
    }

    products.forEach(p => {
        const available = Number(p.stock || 0) - Number(p.allocated || 0);
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
            <td class="p-3 border-b text-center space-x-1">
                <button type="button" onclick="openProductModal('${p.id}');" class="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs border border-blue-400 rounded hover:bg-blue-200">Edit</button>
                <button type="button" onclick="deleteProduct('${p.id}');" class="px-3 py-1 bg-red-100 text-red-700 font-bold text-xs border border-red-400 rounded hover:bg-red-200">Hapus</button>
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
        if (title) title.innerText = 'Edit Produk';
        const prod = products.find(p => String(p.id) === String(productId));

        if (prod) {
            document.getElementById('prod-id').value = prod.id;
            document.getElementById('prod-name').value = prod.name;
            document.getElementById('prod-category').value = prod.category || '';
            document.getElementById('prod-image').value = prod.image || '';
            document.getElementById('prod-price').value = prod.price;
            document.getElementById('prod-stock').value = prod.stock;
        }
    } else {
        if (title) title.innerText = 'Tambah Produk Baru';
        if (form) form.reset();
        document.getElementById('prod-id').value = '';
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

function saveProduct(event) {
    if (event) event.preventDefault();

    const id = document.getElementById('prod-id').value.trim();
    const name = document.getElementById('prod-name').value.trim();
    const category = document.getElementById('prod-category').value.trim();
    const image = document.getElementById('prod-image').value.trim();
    const price = parseFloat(document.getElementById('prod-price').value) || 0;
    const stock = parseInt(document.getElementById('prod-stock').value) || 0;

    if (!name) {
        alert("Nama produk wajib diisi!");
        return;
    }

    if (id) {
        const p = products.find(prod => String(prod.id) === String(id));
        if (p) {
            p.name = name;
            p.category = category || 'Umum';
            p.image = image;
            p.price = price;
            p.stock = stock;
        }
    } else {
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

    if (typeof saveState === 'function') saveState();
    if (typeof renderProductTable === 'function') renderProductTable();
    if (typeof renderDashboard === 'function') renderDashboard();

    closeProductModal();

    if (typeof showToast === 'function') {
        showToast('Data produk berhasil disimpan!');
    }
}

function deleteProduct(productId) {
    const p = products.find(prod => String(prod.id) === String(productId));
    if (!p) return;

    if (Number(p.allocated || 0) > 0) {
        showToast('Tidak bisa menghapus produk yang sedang dialokasikan PO!', 'fa-circle-exclamation');
        return;
    }

    if (confirm(`Yakin ingin menghapus produk "${p.name}"?`)) {
        products = products.filter(prod => String(prod.id) !== String(productId));
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
window.addEventListener('load', function() {
    syncAllocations();

    const now = new Date();

    document.getElementById('dashboard-clock').innerText =
        now.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

    document.getElementById('po-date-filter').value = '';

    renderDashboard();
    renderPosProducts();
    renderPoList();
    renderHistoryTable();
    renderIncomeStats();
    renderProductTable();
    renderSettings();
    setPosPaymentMethod('CASH');
    renderCart();
});

// ================= 10. GENERATOR QRIS DINAMIS OTOMATIS =================
let STATIC_QRIS_RAW = localStorage.getItem('got_qris_raw') || '';

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

    ws['!cols'] = [
        { wch: 6 },
        { wch: 22 },
        { wch: 22 },
        { wch: 22 },
        { wch: 38 },
        { wch: 32 },
        { wch: 18 }
    ];

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
