class SacExecutiveKpi extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = {
      title: "Revenue",
      actualValue: "AED 128.6M",
      budgetValue: "AED 120.0M",
      achievement: "107.2%",
      growth: "+12.5%",
      periodLabel: "Actual MTD",
      statusLabel: "Above Budget",
      accentColor: "#159B67",
      backgroundColor: "#FFFFFF"
    };
    this._clickBound = false;
  }

  connectedCallback() { this._render(); }

  onCustomWidgetAfterUpdate(changedProps) {
    if (changedProps) {
      Object.keys(changedProps).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(this._data, key)) {
          this._data[key] = changedProps[key];
        }
      });
    }
    this._render();
  }

  onCustomWidgetResize() { this._render(); }

  _set(name, value) {
    this._data[name] = value == null ? "" : String(value);
    this._render();
    this.dispatchEvent(new CustomEvent("propertiesChanged", {
      detail: { properties: { [name]: this._data[name] } }
    }));
  }

  get title() { return this._data.title; }
  set title(v) { this._set("title", v); }
  get actualValue() { return this._data.actualValue; }
  set actualValue(v) { this._set("actualValue", v); }
  get budgetValue() { return this._data.budgetValue; }
  set budgetValue(v) { this._set("budgetValue", v); }
  get achievement() { return this._data.achievement; }
  set achievement(v) { this._set("achievement", v); }
  get growth() { return this._data.growth; }
  set growth(v) { this._set("growth", v); }
  get periodLabel() { return this._data.periodLabel; }
  set periodLabel(v) { this._set("periodLabel", v); }
  get statusLabel() { return this._data.statusLabel; }
  set statusLabel(v) { this._set("statusLabel", v); }
  get accentColor() { return this._data.accentColor; }
  set accentColor(v) { this._set("accentColor", v); }
  get backgroundColor() { return this._data.backgroundColor; }
  set backgroundColor(v) { this._set("backgroundColor", v); }

  _safe(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  _render() {
    if (!this.shadowRoot) return;
    const d = this._data;
    const title = this._safe(d.title);
    const actual = this._safe(d.actualValue);
    const budget = this._safe(d.budgetValue);
    const achievement = this._safe(d.achievement);
    const growth = this._safe(d.growth);
    const period = this._safe(d.periodLabel);
    const status = this._safe(d.statusLabel);
    const accent = this._safe(d.accentColor || "#159B67");
    const background = this._safe(d.backgroundColor || "#FFFFFF");

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; width:100%; height:100%; min-height:190px; font-family:"72",Arial,sans-serif; color:#172433; }
        * { box-sizing:border-box; }
        .card {
          height:100%; min-height:190px; width:100%; padding:20px;
          background:${background}; border:1px solid #E4E9ED; border-radius:16px;
          box-shadow:0 5px 18px rgba(18,38,56,.07);
          display:flex; flex-direction:column; justify-content:space-between; gap:16px;
          overflow:hidden;
        }
        .top { display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .title { font-size:15px; font-weight:650; letter-spacing:.1px; color:#526171; }
        .status { color:${accent}; background:color-mix(in srgb, ${accent} 11%, white); border-radius:999px; padding:6px 10px; font-size:11px; font-weight:700; white-space:nowrap; }
        .value { margin-top:12px; color:${accent}; font-size:clamp(27px,4.3vw,39px); font-weight:750; line-height:1.05; letter-spacing:-.8px; overflow-wrap:anywhere; }
        .meta { display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:8px; font-size:12px; color:#778491; }
        .growth { color:${accent}; font-weight:700; white-space:nowrap; }
        .bottom { border-top:1px solid #EDF0F2; padding-top:13px; display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .metric-label { color:#83909B; font-size:11px; margin-bottom:5px; }
        .metric-value { color:#263746; font-size:16px; font-weight:700; }
        .achievement { color:${accent}; }
        .track { grid-column:1 / -1; height:6px; border-radius:99px; background:#EAF0ED; overflow:hidden; }
        .fill { width:100%; height:100%; border-radius:99px; background:${accent}; }
        @media (max-width:260px) {
          .card { padding:13px; }
          .status { display:none; }
          .meta { flex-wrap:wrap; }
        }
      </style>
      <div class="card" role="button" tabindex="0" aria-label="${title}: ${actual}">
        <div class="main">
          <div class="top"><div class="title">${title}</div><div class="status">${status}</div></div>
          <div class="value">${actual}</div>
          <div class="meta"><span>${period}</span><span class="growth">${growth} vs PY</span></div>
        </div>
        <div class="bottom">
          <div><div class="metric-label">Budget</div><div class="metric-value">${budget}</div></div>
          <div><div class="metric-label">Achievement</div><div class="metric-value achievement">${achievement}</div></div>
          <div class="track"><div class="fill"></div></div>
        </div>
      </div>
    `;
    const card = this.shadowRoot.querySelector(".card");
    if (card) {
      card.addEventListener("click", () => this.dispatchEvent(new CustomEvent("onKpiClick", { bubbles:true, composed:true })));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.dispatchEvent(new CustomEvent("onKpiClick", { bubbles:true, composed:true }));
        }
      });
    }
  }
}
customElements.define("com-example-sac-executive-kpi", SacExecutiveKpi);
