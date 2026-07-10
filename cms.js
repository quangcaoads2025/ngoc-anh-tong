(() => {
  const cfg = window.NA_SUPABASE || {};
  const ready = typeof cfg.url === 'string' && /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(cfg.url) && typeof cfg.publishableKey === 'string' && cfg.publishableKey.length > 20 && window.supabase;
  if (!ready) return;
  const db = window.supabase.createClient(cfg.url, cfg.publishableKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });

  const setTextOrHtml = (el, value) => {
    if (!el || value == null) return;
    if (el.dataset.cms?.endsWith('_html')) el.innerHTML = value;
    else {
      const svg = el.querySelector('svg');
      el.textContent = value;
      if (svg) el.append(' ', svg);
    }
  };

  async function loadSettings() {
    const { data, error } = await db.from('site_settings').select('key,value');
    if (error || !data) return;
    const settings = Object.fromEntries(data.map(x => [x.key, x.value]));
    document.querySelectorAll('[data-cms]').forEach(el => setTextOrHtml(el, settings[el.dataset.cms]));
    document.querySelectorAll('[data-cms-href]').forEach(el => {
      const v = settings[el.dataset.cmsHref];
      if (v) el.setAttribute('href', v);
    });
    if (settings.seo_title) document.title = settings.seo_title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && settings.seo_description) metaDesc.content = settings.seo_description;
  }

  async function loadBrands() {
    const cards = [...document.querySelectorAll('.ecosystem-grid .ecosystem-card')];
    if (!cards.length) return;
    const { data, error } = await db.from('brands').select('*').eq('is_visible', true).order('sort_order');
    if (error || !data?.length) return;
    data.slice(0, cards.length).forEach((brand, i) => {
      const card = cards[i];
      card.style.display = '';
      const media = card.querySelector('.ecosystem-card__media');
      const img = card.querySelector('img');
      const label = media?.querySelector('span');
      const title = card.querySelector('h3');
      const desc = card.querySelector('.ecosystem-card__body > p');
      const link = card.querySelector('.ecosystem-card__link');
      if (media && brand.website_url) media.href = brand.website_url;
      if (img && brand.image_url) img.src = brand.image_url;
      if (img) img.alt = brand.name || '';
      if (label) label.textContent = brand.category_label || '';
      if (title) title.textContent = brand.name || '';
      if (desc) desc.textContent = brand.description || '';
      if (link && brand.website_url) link.href = brand.website_url;
    });
    cards.slice(data.length).forEach(c => c.style.display = 'none');
  }

  async function loadFaqs() {
    const wrap = document.querySelector('#faqAccordion');
    if (!wrap) return;
    const { data, error } = await db.from('faqs').select('*').eq('is_visible', true).order('sort_order');
    if (error || !data?.length) return;
    wrap.innerHTML = data.map((f, i) => `
      <article class="accordion-item${i===0?' is-open':''}">
        <button type="button" aria-expanded="${i===0?'true':'false'}">
          <span class="faq-question"><small>${String(i+1).padStart(2,'0')}</small><b>${escapeHtml(f.question)}</b></span>
          <svg><use href="#i-plus"></use></svg>
        </button>
        <div class="accordion-content"><div><p>${escapeHtml(f.answer)}</p></div></div>
      </article>`).join('');
    wrap.querySelectorAll('.accordion-item button').forEach(btn => btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    }));
  }

  function escapeHtml(v='') { const d=document.createElement('div'); d.textContent=v; return d.innerHTML; }
  Promise.allSettled([loadSettings(), loadBrands(), loadFaqs()]);
})();
