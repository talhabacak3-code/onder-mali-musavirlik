# Önder Mali Müşavirlik — Kurumsal Web Sitesi

Muhammet Enes Cihat Önder (Afyonkarahisar) için hazırlanmış, saf **HTML / CSS / JavaScript** ile geliştirilen kurumsal mali müşavirlik web sitesi. Mevzuat/duyuruları kod bilmeden güncellemeyi sağlayan bir **yönetim paneli** içerir.

## Özellikler

- 📄 Sayfalar: Ana Sayfa, Hakkımızda, Hizmetlerimiz, Güncel Mevzuat & Duyurular, İletişim
- ⚙️ **Yönetim Paneli** (`admin.html`): mevzuat/duyuru ekle · düzenle · sil + JSON yedekleme
- 📱 Tıklanınca WhatsApp açan sabit buton ve iletişim bağlantıları
- 📍 İletişim sayfasında adres haritası (Google Maps embed)
- 📱 Tamamen responsive (mobil / tablet / masaüstü), lacivert–beyaz kurumsal tema

## Dosya Yapısı

```
├── index.html          # Ana sayfa
├── hakkimizda.html
├── hizmetlerimiz.html
├── mevzuat.html        # Güncel mevzuat & duyurular (localStorage)
├── iletisim.html       # İletişim + harita + WhatsApp formu
├── admin.html          # Yönetim paneli
├── css/style.css
├── js/
│   ├── data.js         # Veri katmanı (localStorage + seed)
│   ├── main.js         # Ortak: navbar, mobil menü, animasyon
│   ├── mevzuat.js      # Public mevzuat listesi + arama/filtre
│   └── admin.js        # Panel: giriş + CRUD + JSON içe/dışa aktar
└── assets/logo.png     # Logo (eklenecek)
```

## Kullanım

1. Logoyu `assets/logo.png` olarak ekleyin (yoksa "M" rozeti gösterilir).
2. `index.html` dosyasını bir tarayıcıda açın.

### Yönetim Paneli
- `admin.html` adresinden girin. Varsayılan şifre: `onder2026`
- Şifreyi `js/admin.js` içindeki `PASSWORD` değişkeninden değiştirin.

> **Not:** Mevzuat verileri tarayıcının `localStorage` belleğinde tutulur; bu nedenle panelden girilen kayıtlar yalnızca aynı tarayıcı/cihazda görünür. Yedekleme ve taşıma için panel içindeki **JSON Dışa/İçe Aktar** butonlarını kullanın.

## İletişim

- WhatsApp / Telefon: +90 542 793 42 54
- Adres: Akmescit, Yukarı Pazar Cd. No:64B, Afyonkarahisar Merkez/Afyonkarahisar
