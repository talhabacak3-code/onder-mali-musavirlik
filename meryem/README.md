# Meryem Badem Bacak — Serbest Muhasebeci Mali Müşavir (SMMM)

Saf **HTML / CSS / JavaScript** ile geliştirilen kurumsal mali müşavirlik web sitesi.
Afyonkarahisar Merkez'de hizmet veren **Meryem Badem Bacak (SMMM)** için hazırlanmıştır.
Tasarım kimliği **Editoryal Prestij**: lacivert (`#0E2A47`) + zümrüt (`#0E7C66`) + krem (`#F7F5EF`)
paleti, **Fraunces** serif başlıklar, bol beyaz alan ve ince çizgi ayraçlarla banka/hukuk bürosu
prestiji veren özgün bir görünüm. MB amblemi, animasyonlu sayaçlar, süreç şeridi, SSS akordeonu,
çalışan hesaplama araçları ve mevzuat yönetim paneli içerir.

## Sayfalar
Ana Sayfa, Hakkımızda, Hizmetlerimiz, Mevzuat, Bilgi Panosu, Pratik Bilgiler,
Hesaplama Araçları, Vergi Takvimi 2026, İletişim + Yönetim Paneli (`admin.html`).

## İletişim bilgilerini güncelleme (TEK NOKTA)
Telefon, WhatsApp, e-posta, adres ve çalışma saatleri **`js/config.js`** içindeki `SITE`
nesnesinden yönetilir. Gerçek bilgileri girip kaydedin — `tel:` / WhatsApp bağlantıları ve
`[data-site]` alanları tüm sayfalarda otomatik güncellenir.

```js
window.SITE = {
  phoneDisplay: "+90 545 904 96 14",
  phoneDigits:  "905459049614",   // 90 + numara (sadece rakam)
  whatsapp:     "905459049614",   // telefon araması ile aynı numara
  email:        "",                // boşsa e-posta alanı gizlenir
  address:      "Afyonkarahisar / Merkez",
  city:         "Afyonkarahisar",
  maps:         "https://www.google.com/maps?q=Afyonkarahisar%20Merkez&z=13&output=embed"
};
```

> İletişim bilgileri girilmiştir. **Tam açık adres** geldiğinde `address` ve `maps`
> alanlarını (ör. `"Mahalle Cadde No Afyonkarahisar"`) güncellemeniz yeterlidir;
> harita ve tüm `[data-site]` alanları otomatik güncellenir.

## Logo
Marka amblemi vektörel olarak `assets/mb-logo.svg` dosyasındadır (her ekranda keskin).
Raster PNG kullanmak isterseniz `assets/MB-LOGO-BURAYA.txt` dosyasındaki adımları izleyin.

## Yönetim Paneli
`admin.html` → varsayılan şifre: **`meryem2026`** (panelden değiştirilebilir; tarayıcıda saklanır).
Mevzuat/duyuru ekle · düzenle · sil + JSON yedekleme. Veriler `localStorage`'da tutulur.

## Çalıştırma
`index.html` dosyasını tarayıcıda açın (veya bir statik sunucu ile `meryem/` klasörünü yayınlayın).
