/* =========================================================
   mevzuat.js — Public mevzuat/duyuru listesi render + filtre/arama
   data-mev-list  : tam liste (mevzuat.html)  -> arama+filtre içerir
   data-mev-latest: son N kayıt (index.html)  -> sadece listeler
   ========================================================= */

(function () {
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  function calIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  }

  function itemHTML(it) {
    const cls = (it.kategori || "Genel").toLowerCase()
      .replace("ş", "s").replace("ı", "i"); // güvenli class
    const hasDetail = it.icerik && it.icerik.trim().length;
    return `
      <article class="mev-item" data-cat="${esc(it.kategori || "Genel")}"
               data-text="${esc((it.baslik || "") + " " + (it.ozet || "") + " " + (it.icerik || "")).toLowerCase()}">
        <div class="mev-item-head">
          <span class="badge ${cls}">${esc(it.kategori || "Genel")}</span>
          <span class="mev-date">${calIcon()} ${esc(MBB.formatDate(it.tarih))}</span>
        </div>
        <h3>${esc(it.baslik)}</h3>
        <p>${esc(it.ozet || "")}</p>
        ${hasDetail ? `
          <div class="mev-detail">${esc(it.icerik)}</div>
          <button class="mev-toggle" type="button">Devamını oku
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><polyline points="6 9 12 15 18 9"/></svg>
          </button>` : ""}
      </article>`;
  }

  function wireToggles(root) {
    root.querySelectorAll(".mev-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const d = btn.previousElementSibling;
        const open = d.classList.toggle("open");
        btn.firstChild.textContent = open ? "Daha az göster " : "Devamını oku ";
      });
    });
  }

  function emptyHTML(msg) {
    return `<div class="mev-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <p>${esc(msg)}</p>
    </div>`;
  }

  // ---- Tam liste (mevzuat.html) ----
  const full = document.querySelector("[data-mev-list]");
  if (full) {
    const all = MBB.getAll();
    let activeCat = "Tümü";
    let query = "";

    function render() {
      const filtered = all.filter(it => {
        const okCat = activeCat === "Tümü" || (it.kategori || "Genel") === activeCat;
        const okQ = !query || ((it.baslik || "") + " " + (it.ozet || "") + " " + (it.icerik || ""))
          .toLowerCase().includes(query);
        return okCat && okQ;
      });
      full.innerHTML = filtered.length
        ? filtered.map(itemHTML).join("")
        : emptyHTML("Aradığınız kriterlere uygun kayıt bulunamadı.");
      wireToggles(full);
    }

    // Filtre çipleri
    const filterBox = document.querySelector("[data-mev-filters]");
    if (filterBox) {
      const cats = ["Tümü"].concat(MBB.CATEGORIES);
      filterBox.innerHTML = cats.map((c, i) =>
        `<button class="chip ${i === 0 ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`
      ).join("");
      filterBox.querySelectorAll(".chip").forEach(chip => {
        chip.addEventListener("click", () => {
          filterBox.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          activeCat = chip.dataset.cat;
          render();
        });
      });
    }

    // Arama
    const search = document.querySelector("[data-mev-search]");
    if (search) {
      search.addEventListener("input", () => { query = search.value.trim().toLowerCase(); render(); });
    }

    render();
  }

  // ---- Son N (index.html) ----
  const latest = document.querySelector("[data-mev-latest]");
  if (latest) {
    const n = parseInt(latest.getAttribute("data-mev-latest"), 10) || 3;
    const items = MBB.getLatest(n);
    latest.innerHTML = items.length
      ? items.map(itemHTML).join("")
      : emptyHTML("Henüz duyuru eklenmedi.");
    wireToggles(latest);
  }
})();
