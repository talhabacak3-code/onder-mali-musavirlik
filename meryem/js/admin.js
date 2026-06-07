/* =========================================================
   admin.js — Yönetim Paneli
   Basit şifre kapısı (client-side, gerçek güvenlik değildir) + CRUD
   + JSON dışa/içe aktarma. Veriler data.js (localStorage) üzerinden.
   ========================================================= */

(function () {
  // --- Ayarlar ---
  const DEFAULT_PASSWORD = "meryem2026";      // ilk/varsayılan şifre
  const PASS_KEY = "mbb_admin_sifre";      // değiştirilen şifre burada saklanır
  const SESSION_KEY = "mbb_admin_oturum";

  function getPassword() {
    try { return localStorage.getItem(PASS_KEY) || DEFAULT_PASSWORD; }
    catch (e) { return DEFAULT_PASSWORD; }
  }

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const loginView = document.getElementById("loginView");
  const panelView = document.getElementById("panelView");
  const loginForm = document.getElementById("loginForm");
  const loginPass = document.getElementById("loginPass");
  const loginErr  = document.getElementById("loginErr");

  // ---- Toast ----
  let toastEl;
  function toast(msg, isErr) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.className = "toast show" + (isErr ? " error" : "");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => (toastEl.className = "toast"), 2600);
  }

  // ---- Oturum ----
  function isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === "1"; }
  function showPanel() {
    loginView.style.display = "none";
    panelView.style.display = "block";
    renderTable();
  }
  function showLogin() {
    panelView.style.display = "none";
    loginView.style.display = "block";
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (loginPass.value === getPassword()) {
        sessionStorage.setItem(SESSION_KEY, "1");
        loginErr.style.display = "none";
        showPanel();
      } else {
        loginErr.style.display = "block";
        loginPass.value = "";
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
  });

  // ---- Form ----
  const form = document.getElementById("mevForm");
  const fId = document.getElementById("fId");
  const fBaslik = document.getElementById("fBaslik");
  const fTarih = document.getElementById("fTarih");
  const fKategori = document.getElementById("fKategori");
  const fOzet = document.getElementById("fOzet");
  const fIcerik = document.getElementById("fIcerik");
  const formTitle = document.getElementById("formTitle");
  const cancelEdit = document.getElementById("cancelEdit");

  // Kategori seçeneklerini doldur
  if (fKategori) {
    fKategori.innerHTML = MBB.CATEGORIES
      .map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");
  }

  function resetForm() {
    form.reset();
    fId.value = "";
    fTarih.value = new Date().toISOString().slice(0, 10);
    formTitle.textContent = "Yeni Mevzuat / Duyuru Ekle";
    cancelEdit.style.display = "none";
  }

  if (form) {
    fTarih.value = new Date().toISOString().slice(0, 10);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        baslik: fBaslik.value.trim(),
        tarih: fTarih.value,
        kategori: fKategori.value,
        ozet: fOzet.value.trim(),
        icerik: fIcerik.value.trim()
      };
      if (!data.baslik) { toast("Başlık zorunludur.", true); return; }
      if (fId.value) {
        MBB.update(fId.value, data);
        toast("Kayıt güncellendi.");
      } else {
        MBB.add(data);
        toast("Yeni kayıt eklendi.");
      }
      resetForm();
      renderTable();
    });
    cancelEdit.addEventListener("click", resetForm);
  }

  function editItem(id) {
    const it = MBB.getAll().find(x => x.id === id);
    if (!it) return;
    fId.value = it.id;
    fBaslik.value = it.baslik || "";
    fTarih.value = it.tarih || "";
    fKategori.value = it.kategori || "Genel";
    fOzet.value = it.ozet || "";
    fIcerik.value = it.icerik || "";
    formTitle.textContent = "Kaydı Düzenle";
    cancelEdit.style.display = "inline-flex";
    document.getElementById("formPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function delItem(id) {
    const it = MBB.getAll().find(x => x.id === id);
    if (!it) return;
    if (confirm(`"${it.baslik}" kaydını silmek istediğinize emin misiniz?`)) {
      MBB.remove(id);
      toast("Kayıt silindi.");
      renderTable();
    }
  }

  // ---- Tablo ----
  const tbody = document.getElementById("mevTbody");
  const countEl = document.getElementById("mevCount");

  function renderTable() {
    const list = MBB.getAll();
    if (countEl) countEl.textContent = list.length;
    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--gray-400);padding:30px">Henüz kayıt yok.</td></tr>`;
      return;
    }
    tbody.innerHTML = list.map(it => `
      <tr>
        <td><strong>${esc(it.baslik)}</strong><br><span style="color:var(--gray-400);font-size:.82rem">${esc((it.ozet || "").slice(0, 70))}${(it.ozet || "").length > 70 ? "…" : ""}</span></td>
        <td><span class="badge ${(it.kategori || "Genel").toLowerCase()}">${esc(it.kategori || "Genel")}</span></td>
        <td style="white-space:nowrap">${esc(MBB.formatDate(it.tarih))}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" data-edit="${esc(it.id)}" title="Düzenle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
            </button>
            <button class="icon-btn del" data-del="${esc(it.id)}" title="Sil">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>`).join("");
    tbody.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => editItem(b.dataset.edit)));
    tbody.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => delItem(b.dataset.del)));
  }

  // ---- Dışa / İçe aktarma ----
  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) exportBtn.addEventListener("click", () => {
    const blob = new Blob([MBB.exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mbb-mevzuat-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    URL.revokeObjectURL(url);
    toast("Yedek (JSON) indirildi.");
  });

  const importInput = document.getElementById("importInput");
  const importBtn = document.getElementById("importBtn");
  if (importBtn && importInput) {
    importBtn.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", () => {
      const file = importInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          MBB.importJSON(reader.result);
          toast("Veriler içe aktarıldı.");
          renderTable();
        } catch (err) {
          toast("İçe aktarma hatası: " + err.message, true);
        }
        importInput.value = "";
      };
      reader.readAsText(file, "utf-8");
    });
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    if (confirm("Tüm kayıtlar silinip varsayılan örnek verilere dönülecek. Devam edilsin mi?")) {
      MBB.resetToSeed();
      toast("Varsayılan verilere dönüldü.");
      renderTable();
    }
  });

  // ---- Şifre değiştir ----
  const sifreForm = document.getElementById("sifreForm");
  if (sifreForm) {
    const eski = document.getElementById("sifreEski");
    const yeni = document.getElementById("sifreYeni");
    const yeni2 = document.getElementById("sifreYeni2");
    const msg = document.getElementById("sifreMsg");
    function sMsg(t, ok) {
      msg.textContent = t;
      msg.style.color = ok ? "#1f9d57" : "#c93a52";
      msg.style.display = "block";
    }
    sifreForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (eski.value !== getPassword()) { sMsg("Mevcut şifre hatalı.", false); return; }
      if (yeni.value.length < 4) { sMsg("Yeni şifre en az 4 karakter olmalı.", false); return; }
      if (yeni.value !== yeni2.value) { sMsg("Yeni şifreler eşleşmiyor.", false); return; }
      try {
        localStorage.setItem(PASS_KEY, yeni.value);
        sifreForm.reset();
        sMsg("Şifre başarıyla güncellendi.", true);
        toast("Şifre güncellendi.");
      } catch (err) {
        sMsg("Şifre kaydedilemedi.", false);
      }
    });
  }

  // ---- Başlat ----
  if (isLoggedIn()) showPanel(); else showLogin();
})();
