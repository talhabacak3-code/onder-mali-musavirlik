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

  // --- İletişim (PLACEHOLDER — gerçek bilgilerle değiştirin) ---
  phoneDisplay: "+90 5XX XXX XX XX",   // ekranda görünen biçim
  phoneDigits:  "905000000000",        // tel: ve wa.me için sadece rakam (90 + numara)
  whatsapp:     "905000000000",        // WhatsApp numarası (90 + numara)
  email:        "",                    // ör. "info@ornek.com" (boşsa e-posta alanı gizlenir)

  // --- Adres / konum (PLACEHOLDER) ---
  address:      "Adres bilgisi yakında eklenecektir",
  city:         "Şehir / İlçe",
  hours:        "Hafta içi 09:00 – 18:00 · Cumartesi 09:00 – 15:00",

  // İletişim sayfasındaki Google Haritalar embed URL'si (boşsa nazik bir bilgi notu gösterilir)
  maps:         "",

  // --- Sosyal medya (opsiyonel, boşsa gizlenir) ---
  instagram:    "",
  linkedin:     ""
};
