/* =========================================================
   config.js — Merkezî site / iletişim yapılandırması
   ---------------------------------------------------------
   Gerçek iletişim bilgileri geldiğinde YALNIZCA BU DOSYAYI
   düzenleyin. main.js, telefon/WhatsApp/e-posta bağlantılarını
   ve [data-site] alanlarını bu değerlerden otomatik doldurur.
   ========================================================= */

window.SITE = {
  name:        "Meryem Badem Bacak",
  title:       "Serbest Muhasebeci Mali Müşavir (SMMM)",

  // --- İletişim ---
  phoneDisplay: "+90 545 904 96 14",   // ekranda görünen biçim
  phoneDigits:  "905459049614",        // tel: ve wa.me için sadece rakam (90 + numara)
  whatsapp:     "905459049614",        // WhatsApp numarası (90 + numara) — arama ile aynı
  email:        "",                    // ör. "info@ornek.com" (boşsa e-posta alanı gizlenir)

  // --- Adres / konum ---
  address:      "Afyonkarahisar / Merkez",
  city:         "Afyonkarahisar",
  hours:        "Hafta içi 09:00 – 18:00 · Cumartesi 09:00 – 15:00",

  // İletişim sayfasındaki Google Haritalar embed URL'si (boşsa nazik bir bilgi notu gösterilir)
  // Tam açık adres geldiğinde bu sorguyu güncelleyin (ör. "Mahalle Cadde No Afyonkarahisar").
  maps:         "https://www.google.com/maps?q=Afyonkarahisar%20Merkez&z=13&output=embed",

  // --- Sosyal medya (opsiyonel, boşsa gizlenir) ---
  instagram:    "",
  linkedin:     ""
};
