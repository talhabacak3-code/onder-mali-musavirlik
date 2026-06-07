# Meryem Badem Bacak — Serbest Muhasebeci Mali Müşavir (SMMM)

Saf **HTML / CSS / JavaScript** ile geliştirilen kurumsal mali müşavirlik web sitesi.
`ondermalimusavirlik.com` referans alınarak hazırlanan bu sürüm; lacivert + altın prestij teması,
MB amblemi, animasyonlu sayaçlar, süreç şeridi ve SSS akordeonu ile **üst sürüm** olarak tasarlanmıştır.

## Sayfalar
Ana Sayfa, Hakkımızda, Hizmetlerimiz, Mevzuat, Bilgi Panosu, Pratik Bilgiler,
Hesaplama Araçları, Vergi Takvimi 2026, İletişim + Yönetim Paneli (`admin.html`).

## İletişim bilgilerini güncelleme (TEK NOKTA)
Telefon, WhatsApp, e-posta, adres ve çalışma saatleri **`js/config.js`** içindeki `SITE`
nesnesinden yönetilir. Gerçek bilgileri girip kaydedin — `tel:` / WhatsApp bağlantıları ve
`[data-site]` alanları tüm sayfalarda otomatik güncellenir.

```js
window.SITE = {
  phoneDisplay: "+90 5XX XXX XX XX",
  phoneDigits:  "905000000000",   // 90 + numara (sadece rakam)
  whatsapp:     "905000000000",
  email:        "",
  address:      "Adres bilgisi yakında eklenecektir",
  city:         "Şehir / İlçe",
  maps:         ""                 // İletişim haritası için Google Maps embed URL'si
};
```

> Şu an iletişim alanları **placeholder**'dır.

## Logo
Marka amblemi vektörel olarak `assets/mb-logo.svg` dosyasındadır (her ekranda keskin).
Raster PNG kullanmak isterseniz `assets/MB-LOGO-BURAYA.txt` dosyasındaki adımları izleyin.

## Yönetim Paneli
`admin.html` → varsayılan şifre: **`meryem2026`** (panelden değiştirilebilir; tarayıcıda saklanır).
Mevzuat/duyuru ekle · düzenle · sil + JSON yedekleme. Veriler `localStorage`'da tutulur.

## Çalıştırma
`index.html` dosyasını tarayıcıda açın (veya bir statik sunucu ile `meryem/` klasörünü yayınlayın).
