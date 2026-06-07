/* =========================================================
   main.js — Ortak davranışlar
   navbar · mobil menü · reveal · yıl · iletişim (config) · sayaç
   ========================================================= */

(function () {
  // --- Mobil menü ---
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.classList.remove("open");
      })
    );
  }

  // --- Header gölge (scroll) ---
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // --- Aktif menü işaretle (sayfa adına göre) ---
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  // --- İletişim bilgilerini config.js'ten doldur (tek nokta) ---
  const S = window.SITE;
  if (S) {
    // tel: bağlantıları
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
      a.setAttribute("href", "tel:+" + S.phoneDigits);
      // Yalnızca düz metinli (ikon/iç öğe içermeyen) linklerin metnini güncelle
      if (a.children.length === 0 && /[0-9X]/.test(a.textContent)) a.textContent = S.phoneDisplay;
    });
    // WhatsApp (wa.me) bağlantıları — ?text= sorgusunu koru
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
      a.setAttribute("href", a.getAttribute("href").replace(/wa\.me\/\d+/, "wa.me/" + S.whatsapp));
    });
    // [data-site="anahtar"] alanları (ör. data-site="address")
    document.querySelectorAll("[data-site]").forEach(el => {
      const k = el.getAttribute("data-site");
      if (S[k] != null && S[k] !== "") el.textContent = S[k];
    });
  }

  // --- Sayı sayacı animasyonu ([data-count="10"] data-suffix="+") ---
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const dur = 1400, t0 = performance.now();
    function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      const val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString("tr-TR") + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // --- Reveal animasyonu + sayaç tetikleme ---
  const reveals = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    if (reveals.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(el => io.observe(el));
    }
    if (counters.length) {
      const co = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(el => co.observe(el));
    }
  } else {
    reveals.forEach(el => el.classList.add("in"));
    counters.forEach(el => el.textContent =
      (el.getAttribute("data-prefix") || "") + el.getAttribute("data-count") + (el.getAttribute("data-suffix") || ""));
  }

  // --- SSS akordeonu ---
  document.querySelectorAll(".faq-item .faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // --- Yıl ---
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
})();
