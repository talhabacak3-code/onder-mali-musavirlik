/* =========================================================
   search.js — Site içi arama (overlay + canlı sonuç)
   [data-search-open] taşıyan herhangi bir öğe arama penceresini açar.
   ========================================================= */

(function () {
  // ---- Arama dizini (sayfalar + önemli konular) ----
  var INDEX = [
    { t: "Ana Sayfa", d: "Meryem Badem Bacak ana sayfa", u: "index.html", tag: "Sayfa", k: "anasayfa home başlangıç" },
    { t: "Hakkımızda", d: "Serbest Muhasebeci Mali Müşavir, vizyon ve misyon", u: "hakkimizda.html", tag: "Sayfa", k: "kim biz vizyon misyon değerler smmm" },
    { t: "Hizmetlerimiz", d: "Tüm mali müşavirlik hizmetleri", u: "hizmetlerimiz.html", tag: "Sayfa", k: "hizmet danışmanlık" },
    { t: "Muhasebe & Defter Tutma", d: "Yasal defter, kayıt ve raporlama", u: "hizmetlerimiz.html", tag: "Hizmet", k: "muhasebe defter kayıt raporlama" },
    { t: "Vergi Danışmanlığı & Beyanname", d: "Beyanname ve vergi planlaması", u: "hizmetlerimiz.html", tag: "Hizmet", k: "vergi beyanname kdv planlama" },
    { t: "SGK & Bordro İşlemleri", d: "Bordro, SGK bildirimleri, teşvik", u: "hizmetlerimiz.html", tag: "Hizmet", k: "sgk bordro maaş prim teşvik sigorta" },
    { t: "Şirket Kuruluş & Tasfiye", d: "Şahıs, limited, anonim şirket kuruluşu", u: "hizmetlerimiz.html", tag: "Hizmet", k: "şirket kuruluş tasfiye limited anonim şahıs" },
    { t: "E-Dönüşüm Hizmetleri", d: "e-Fatura, e-Arşiv, e-Defter geçişleri", u: "hizmetlerimiz.html", tag: "Hizmet", k: "e-fatura e-arşiv e-defter e-irsaliye dönüşüm" },
    { t: "Yönetim Raporlama", d: "Dönemsel mali tablo ve KPI raporları", u: "hizmetlerimiz.html", tag: "Hizmet", k: "yönetim raporlama rapor kpi tablo" },
    { t: "Teşvik ve Destek Danışmanlığı", d: "SGK, KOSGEB, yatırım teşvikleri", u: "hizmetlerimiz.html", tag: "Hizmet", k: "teşvik destek kosgeb yatırım hibe" },
    { t: "Bütçe ve Finansal Planlama", d: "Nakit akışı ve bütçe yönetimi", u: "hizmetlerimiz.html", tag: "Hizmet", k: "bütçe finansal planlama nakit akışı" },
    { t: "Yabancı Sermayeli Şirket Danışmanlığı", d: "Yabancı ortaklı şirket işlemleri", u: "hizmetlerimiz.html", tag: "Hizmet", k: "yabancı sermaye yabancı şirket çalışma izni" },
    { t: "Sektörel Muhasebe Çözümleri", d: "Sektöre özel muhasebe", u: "hizmetlerimiz.html", tag: "Hizmet", k: "sektörel inşaat üretim e-ticaret sağlık turizm" },
    { t: "Güncel Mevzuat & Duyurular", d: "Vergi, SGK ve ticaret gelişmeleri", u: "mevzuat.html", tag: "Sayfa", k: "mevzuat duyuru haber güncel" },
    { t: "Mükellef Bilgi Panosu", d: "GİB, mevzuat, TÜRMOB, resmî kaynaklar", u: "bilgi-panosu.html", tag: "Sayfa", k: "bilgi panosu kaynak gib türmob resmi gazete kosgeb danıştay yargıtay" },
    { t: "Pratik Bilgiler", d: "Asgari ücret, kıdem tavanı, oranlar, hadler", u: "pratik-bilgiler.html", tag: "Sayfa", k: "pratik bilgi asgari ücret agi damga kdv oran had sınır gecikme" },
    { t: "Hesaplama Araçları", d: "Kıdem, ihbar, KDV, stopaj, konaklama", u: "hesaplama-araclari.html", tag: "Sayfa", k: "hesaplama hesaplayıcı araç" },
    { t: "Kıdem Tazminatı Hesaplama", d: "Kıdem tazminatını hesapla", u: "hesaplama-araclari.html", tag: "Hesaplama", k: "kıdem tazminat hesaplama" },
    { t: "İhbar Tazminatı Hesaplama", d: "İhbar tazminatını hesapla", u: "hesaplama-araclari.html", tag: "Hesaplama", k: "ihbar tazminat hesaplama" },
    { t: "KDV Hesaplama", d: "KDV ekle / ayır", u: "hesaplama-araclari.html", tag: "Hesaplama", k: "kdv hesaplama dahil hariç ayır ekle" },
    { t: "Stopaj Hesaplama", d: "Stopaj / tevkifat hesapla", u: "hesaplama-araclari.html", tag: "Hesaplama", k: "stopaj tevkifat kira serbest meslek hesaplama" },
    { t: "Konaklama Vergisi Hesaplama", d: "Konaklama vergisini hesapla", u: "hesaplama-araclari.html", tag: "Hesaplama", k: "konaklama vergisi hesaplama otel" },
    { t: "Vergi Takvimi 2026", d: "Beyan ve ödeme son günleri", u: "vergi-takvimi.html", tag: "Sayfa", k: "vergi takvimi 2026 beyan ödeme son gün kdv muhtasar geçici kurumlar gelir sgk gekap poşet" },
    { t: "İletişim", d: "Adres, telefon, WhatsApp ve harita", u: "iletisim.html", tag: "Sayfa", k: "iletişim adres telefon whatsapp harita konum afyonkarahisar randevu" },
    { t: "Yönetim Paneli", d: "Mevzuat/duyuru yönetimi (şifreli)", u: "admin.html", tag: "Yönetim", k: "admin yönetim panel giriş" }
  ];

  function norm(s) {
    return (s || "").toLowerCase()
      .replace(/i̇/g, "i").replace(/ı/g, "i").replace(/İ/g, "i")
      .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u");
  }
  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

  // ---- Overlay'i oluştur ----
  var ov = document.createElement("div");
  ov.className = "search-overlay";
  ov.innerHTML =
    '<div class="search-box" role="dialog" aria-label="Sitede ara">' +
      '<div class="search-head">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<input type="search" id="siteSearchInput" placeholder="Sayfa, hizmet, hesaplama veya konu ara..." autocomplete="off">' +
        '<button class="search-close" type="button" aria-label="Kapat">ESC</button>' +
      '</div>' +
      '<div class="search-results" id="siteSearchResults"></div>' +
    '</div>';
  document.body.appendChild(ov);

  var input = ov.querySelector("#siteSearchInput");
  var resultsEl = ov.querySelector("#siteSearchResults");

  function render(q) {
    var nq = norm(q.trim());
    var list;
    if (!nq) {
      list = INDEX.slice(0, 8); // boşken popüler/ilk girdiler
    } else {
      list = INDEX.filter(function (x) {
        return norm(x.t + " " + x.d + " " + x.k).indexOf(nq) > -1;
      });
    }
    if (!list.length) {
      resultsEl.innerHTML = '<div class="search-empty">Sonuç bulunamadı. Farklı bir kelime deneyin.</div>';
      return;
    }
    resultsEl.innerHTML = list.map(function (x) {
      return '<a href="' + x.u + '"><span class="sr-tag">' + esc(x.tag) + '</span>' +
        '<strong>' + esc(x.t) + '</strong><span>' + esc(x.d) + '</span></a>';
    }).join("");
  }

  function open() {
    render("");
    ov.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(function(){ input.value=""; input.focus(); }, 30);
  }
  function close() {
    ov.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-search-open]").forEach(function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); open(); });
  });
  ov.querySelector(".search-close").addEventListener("click", close);
  ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
  input.addEventListener("input", function () { render(input.value); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var first = resultsEl.querySelector("a");
      if (first) location.href = first.getAttribute("href");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && ov.classList.contains("open")) close();
    // Ctrl/Cmd + K ile aç
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); open(); }
  });
})();
