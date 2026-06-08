/* =========================================================
   data.js — Mevzuat/Duyuru veri katmanı (localStorage)
   Hem public (mevzuat.js) hem yönetim paneli (admin.js) kullanır.
   ========================================================= */

const MBB = (function () {
  const STORAGE_KEY = "mbb_mevzuat_v1";

  // Kategori etiketleri (rozet rengi CSS class'ı = küçük harf hali)
  const CATEGORIES = ["Vergi", "SGK", "Ticaret", "Genel", "Duyuru"];

  // İlk açılışta dolu görünmesi için örnek veriler.
  const SEED = [
    {
      id: "seed-1",
      baslik: "2026 Yılı Gelir Vergisi Dilimleri Yeniden Belirlendi",
      tarih: "2026-01-02",
      kategori: "Vergi",
      ozet: "2026 takvim yılı için uygulanacak gelir vergisi tarifesi ve dilimleri Resmî Gazete'de yayımlandı. Ücretliler ve serbest meslek erbabı için yeni oranları inceledik.",
      icerik: "2026 yılı gelir vergisi tarifesine göre dilimler yeniden değerleme oranı doğrultusunda güncellenmiştir.\n\nMükelleflerimizin beyan dönemlerinde mağduriyet yaşamaması için yeni dilimlere göre ön hesaplama desteği sunuyoruz. Detaylı bilgi ve kişiye özel hesaplama için ofisimizle iletişime geçebilirsiniz."
    },
    {
      id: "seed-2",
      baslik: "e-Fatura ve e-Arşiv Fatura Zorunluluk Hadleri Düştü",
      tarih: "2025-12-18",
      kategori: "Ticaret",
      ozet: "Gelir İdaresi Başkanlığı, e-Fatura ve e-Arşiv Fatura uygulamasına geçiş için ciro hadlerini yeniden belirledi. Yeni hadler kapsamına giren mükelleflerin geçiş takvimi açıklandı.",
      icerik: "Yeni düzenleme ile birlikte belirlenen ciro hadlerini aşan mükellefler, verilen süre içinde e-Fatura ve e-Arşiv Fatura uygulamalarına geçmek zorundadır.\n\nFirmamız, e-Dönüşüm sürecinizin tamamını (başvuru, entegratör seçimi, kullanıcı eğitimi) anahtar teslim olarak yönetmektedir."
    },
    {
      id: "seed-3",
      baslik: "SGK Prim Teşviklerinde 2026 Güncellemeleri",
      tarih: "2025-12-05",
      kategori: "SGK",
      ozet: "İstihdam teşviklerinde 2026 yılı için geçerli olacak destek tutarları ve yararlanma şartları güncellendi. İşverenlerin kaçırmaması gereken teşvik fırsatlarını derledik.",
      icerik: "5510 sayılı Kanun kapsamındaki prim teşviklerinde 2026 yılı için yeni tutarlar yürürlüğe girmiştir.\n\nİşletmenizin yararlanabileceği teşvikleri tespit edip bordro süreçlerinize en avantajlı şekilde yansıtıyoruz. Ücretsiz teşvik analizi için bizimle iletişime geçin."
    },
    {
      id: "seed-4",
      baslik: "Afyonkarahisar Merkez'de Hizmetinizdeyiz",
      tarih: "2025-11-20",
      kategori: "Duyuru",
      ozet: "Meryem Badem Bacak (SMMM) olarak Afyonkarahisar Merkez ve çevresindeki esnaf, KOBİ ve girişimcilere muhasebe, vergi ve danışmanlık hizmeti sunuyoruz.",
      icerik: "Afyonkarahisar Merkez'deki ofisimizde; muhasebe ve defter, vergi & beyanname, SGK & bordro, şirket kuruluşu ve e-dönüşüm hizmetlerini tek elden yürütüyoruz.\n\nRandevu ve görüşmeleriniz için WhatsApp hattımızdan veya telefonla bize ulaşabilirsiniz. Kahvemiz hazır!"
    },
    {
      id: "seed-5",
      baslik: "Geçici Vergi Beyannamesi Son Günü Yaklaşıyor",
      tarih: "2025-11-10",
      kategori: "Genel",
      ozet: "Dönem geçici vergi beyannamelerinin verilmesi ve ödemesi için son tarihler yaklaşıyor. Cezai işlemle karşılaşmamak için beyan ve ödeme takviminizi kontrol edin.",
      icerik: "Geçici vergi beyannamesinin zamanında verilmesi ve tahakkuk eden verginin süresinde ödenmesi önemlidir.\n\nTüm beyan ve ödeme tarihlerinizi sizin adınıza takip ediyor, hatırlatma yapıyoruz. Mükellef bilgi panomuz üzerinden de güncel vergi takvimine ulaşabilirsiniz."
    }
  ];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return SEED.slice();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return SEED.slice();
      return parsed;
    } catch (e) {
      console.warn("Mevzuat verisi okunamadı, varsayılan kullanılıyor.", e);
      return SEED.slice();
    }
  }

  function save(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function getAll() {
    // Tarihe göre en yeni en üstte
    return load().sort((a, b) => (b.tarih || "").localeCompare(a.tarih || ""));
  }

  function getLatest(n) {
    return getAll().slice(0, n || 3);
  }

  function add(item) {
    const list = load();
    item.id = "m-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    list.push(item);
    save(list);
    return item.id;
  }

  function update(id, item) {
    const list = load();
    const i = list.findIndex(x => x.id === id);
    if (i === -1) return false;
    list[i] = Object.assign({}, list[i], item, { id });
    save(list);
    return true;
  }

  function remove(id) {
    const list = load().filter(x => x.id !== id);
    save(list);
  }

  function resetToSeed() {
    save(SEED.slice());
  }

  function exportJSON() {
    return JSON.stringify(load(), null, 2);
  }

  function importJSON(text) {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) throw new Error("Geçersiz biçim: dizi bekleniyordu.");
    // Basit doğrulama
    parsed.forEach(x => {
      if (!x.baslik) throw new Error("Kayıtlarda 'baslik' alanı zorunludur.");
      if (!x.id) x.id = "m-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
    });
    save(parsed);
  }

  function formatDate(iso) {
    if (!iso) return "";
    const aylar = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
    if (isNaN(d)) return iso;
    return d.getDate() + " " + aylar[d.getMonth()] + " " + d.getFullYear();
  }

  return {
    STORAGE_KEY, CATEGORIES, SEED,
    getAll, getLatest, add, update, remove,
    resetToSeed, exportJSON, importJSON, formatDate
  };
})();
