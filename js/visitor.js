/* =========================================================
   visitor.js — Basit global ziyaretçi sayacı
   Ücretsiz counterapi.dev servisini kullanır (kayıt gerektirmez).
   Aynı oturumda yalnızca 1 kez artırır; diğer sayfalarda mevcut
   değeri okuyup gösterir. Hata olursa sayaç sessizce gizlenir.
   ========================================================= */

(function () {
  var NS = "onder-mali-musavirlik";   // alan adı
  var KEY = "ziyaretci";              // sayaç anahtarı
  var BASE = "https://api.counterapi.dev/v1/" + NS + "/" + KEY;

  var els = document.querySelectorAll("[data-visitor-count]");
  if (!els.length) return;

  function show(n) {
    els.forEach(function (el) {
      el.textContent = (n == null) ? "—" : Number(n).toLocaleString("tr-TR");
    });
  }

  var counted = false;
  try { counted = sessionStorage.getItem("onder_counted") === "1"; } catch (e) {}

  // Oturumda ilk kez giriliyorsa say (up), değilse mevcut değeri oku.
  var url = counted ? (BASE + "/") : (BASE + "/up");

  fetch(url)
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d && typeof d.count !== "undefined") {
        show(d.count);
        try { sessionStorage.setItem("onder_counted", "1"); } catch (e) {}
      } else {
        show(null);
      }
    })
    .catch(function () { show(null); });
})();
