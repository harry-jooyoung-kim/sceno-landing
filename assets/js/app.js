/* ============================================================
   SCENO landing — v2.0 behavior
   nav · reveal · research chain · product colors · scent cue
   ============================================================ */
const $  = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>[...c.querySelectorAll(s)];

/* ---------- nav: scrolled divider + mobile toggle ---------- */
(function(){
  const nav=$('#nav');
  const onScroll=()=>nav.classList.toggle('scrolled',scrollY>8);
  onScroll(); addEventListener('scroll',onScroll,{passive:true});

  const toggle=$('#navToggle');
  toggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });
  $$('#navLinks a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');
  }));
})();

/* ---------- scrollspy: active nav link ---------- */
(function(){
  const links=new Map($$('#navLinks a').map(a=>[a.getAttribute('href').slice(1),a]));
  const sections=$$('main [data-nav]');
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      const id=e.target.getAttribute('data-nav');
      links.forEach(a=>a.classList.remove('active'));
      links.get(id)?.classList.add('active');
    });
  },{rootMargin:'-45% 0px -50% 0px',threshold:0});
  sections.forEach(s=>io.observe(s));
})();

/* ---------- reveal on view (single calm interaction) ---------- */
(function(){
  const items=$$('.reveal, .io-row');
  if(!('IntersectionObserver' in window)){items.forEach(i=>i.classList.add('in'));return;}
  const io=new IntersectionObserver((es,ob)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); ob.unobserve(e.target); } });
  },{rootMargin:'0px 0px -12% 0px',threshold:0.12});
  items.forEach(i=>io.observe(i));
})();

/* ---------- research chain ---------- */
(function(){
  const PANELS={
    generation:{
      kicker:'Generation · Hybrid LLM + Rules',
      big:'50/50',
      title:'Every evaluated recipe satisfied the manufacturing constraints.',
      desc:'An LLM picks scene-relevant notes from a curated 80-note palette; a rule engine enforces top/middle/base balance and formulation limits, turning language into a producible recipe.',
      source:'Manufacturability evaluation · 50 recipes · curated 80-note palette',
      next:'Next: test whether people can read the meaning', nextPanel:'perception',
      viz:`
        <div class="rviz-title">Manufacturability checks</div>
        <div class="bar-stack">
          <div class="bar-row"><label>T / M / B</label><div class="bar"><i style="--w:100%"></i></div><div class="bar-val">50 / 50</div></div>
          <div class="bar-row"><label>Weights sum to 1</label><div class="bar"><i style="--w:100%"></i></div><div class="bar-val">50 / 50</div></div>
          <div class="bar-row"><label>Non-negative</label><div class="bar"><i style="--w:100%"></i></div><div class="bar-val">50 / 50</div></div>
          <div class="bar-row"><label>Palette valid</label><div class="bar"><i style="--w:100%"></i></div><div class="bar-val">50 / 50</div></div>
        </div>
        <div class="rcallout"><b>Why hybrid</b><span>The LLM decides what belongs in the scent; deterministic rules decide how it becomes a formula.</span></div>`
    },
    perception:{
      kicker:'Human study · 100 scents',
      big:'68%',
      title:'For most scents, the intended keyword beat the distractors.',
      desc:'For 68 of 100 scents, people matched it to its intended keyword over the distractors. Across 1,000 ratings the intended keyword averaged 4.50 versus 3.71, a small but reliable gap.',
      source:'104 participants · 100 perfumes · 1,000 evaluations · p < .001',
      next:'Next: compress the scent space into a compact renderer', nextPanel:'cartridge',
      viz:`
        <div class="rviz-title">Which meanings survived most clearly?</div>
        <div class="dim-grid">
          <div class="dim"><label>Material</label><span><i style="width:100%"></i></span><b>d .43</b></div>
          <div class="dim"><label>Place</label><span><i style="width:65%"></i></span><b>d .28</b></div>
          <div class="dim"><label>Persona</label><span><i style="width:51%"></i></span><b>d .22</b></div>
          <div class="dim"><label>Temporal</label><span><i style="width:18%"></i></span><b>d .08</b></div>
        </div>
        <div class="rcallout"><b>What this means</b><span>Scent is a noisy semantic channel, but the prompt-specific signal survives at the group and per-scent level.</span></div>`
    },
    cartridge:{
      kicker:'Blind study · Compact rendering',
      big:'K=6',
      title:'Six cartridges hold most of the fidelity of ten, on the device too.',
      desc:'In a blind study (17 people, 12 scents), hand-mixed six-cartridge renderings scored 5.0 on a 0–10 similarity scale, near the 5.5 of ten (a 0.48 gap). Played by the device itself, they scored 4.6, only 0.4 lower. Cutting to four cost more (4.2); every rendering sat far above an unrelated scent (2.8).',
      source:'Blind study · 17 participants · 12 perfumes · 0–10 scale',
      next:'See the device', nextPanel:'product',
      viz:`
        <div class="rviz-title">Perceived similarity to the original (0–10)</div>
        <div class="bar-stack">
          <div class="bar-row"><label>Original</label><div class="bar"><i style="--w:80%"></i></div><div class="bar-val">8.0</div></div>
          <div class="bar-row"><label>Ten, hand-mixed</label><div class="bar"><i style="--w:55%"></i></div><div class="bar-val">5.5</div></div>
          <div class="bar-row is-key"><label>Six, hand-mixed</label><div class="bar"><i style="--w:50%"></i></div><div class="bar-val">5.0</div></div>
          <div class="bar-row is-key"><label>Six, on the device</label><div class="bar"><i style="--w:46%"></i></div><div class="bar-val">4.6</div></div>
          <div class="bar-row"><label>Four, hand-mixed</label><div class="bar"><i style="--w:42%"></i></div><div class="bar-val">4.2</div></div>
          <div class="bar-row"><label>Unrelated scent</label><div class="bar"><i style="--w:28%"></i></div><div class="bar-val">2.8</div></div>
        </div>
        <div class="rcallout"><b>Confirmed on the device, not just in the lab</b><span>The device's six-cartridge output (4.6) stayed within 0.4 points of the hand-mixed blend (5.0), and far above an unrelated scent (2.8).</span></div>`
    }
  };
  const order=['generation','perception','cartridge'];
  const steps=$$('#researchSteps .rstep');
  function setPanel(key){
    const p=PANELS[key]; if(!p) return;
    steps.forEach(b=>b.classList.toggle('active',b.dataset.panel===key));
    $('#rKicker').textContent=p.kicker;
    $('#rBig').textContent=p.big;
    $('#rTitle').textContent=p.title;
    $('#rDesc').textContent=p.desc;
    $('#rSource').textContent=p.source;
    const viz=$('#rViz'); viz.style.opacity='0';
    setTimeout(()=>{ viz.innerHTML=p.viz; viz.style.transition='opacity .35s var(--ease)'; viz.style.opacity='1'; },120);
    const next=$('#rNext'); next.firstChild.textContent=p.next+' '; next.dataset.go=p.nextPanel;
  }
  steps.forEach(b=>b.addEventListener('click',()=>setPanel(b.dataset.panel)));
  $('#rNext')?.addEventListener('click',e=>{
    const go=e.currentTarget.dataset.go;
    if(go==='product'){ $('#product')?.scrollIntoView({behavior:'smooth'}); }
    else setPanel(go);
  });
  setPanel('generation');
})();

/* ---------- try a scene (values from scenes.js = real demo_end2end.py outputs) ---------- */
(function(){
  const S=window.SCENES, chips=$('#sceneChips'); if(!S||!chips) return;
  const LABELS=['Summer rain','Pine forest','Sea air','Old library'];
  const POS=['TOP','MIDDLE','BASE'];
  const carts=$('#tryCarts');
  /* build six cartridge rows once so level changes animate */
  carts.innerHTML=S[0].cartridges.map(c=>`
    <div class="cart-row" data-slot="${c.slot}">
      <div class="cart-lab"><b>Cartridge ${c.slot}</b></div>
      <div class="segs">${'<i class="seg"></i>'.repeat(4)}</div>
      <div class="cart-lv">0</div>
    </div>`).join('');
  const rows=$$('.cart-row',carts);
  chips.innerHTML=S.map((s,i)=>`<button class="scene-chip" role="tab" aria-selected="false" data-i="${i}">${LABELS[i]||('Scene '+(i+1))}</button>`).join('');
  const btns=$$('.scene-chip',chips);
  function show(i){
    const s=S[i];
    btns.forEach((b,k)=>b.setAttribute('aria-selected',k===i?'true':'false'));
    $('#tryPrompt').textContent='\u201C'+s.input.replace(/\.$/,'')+'\u201D';
    const items=[...s.recipe].sort((a,b)=>POS.indexOf(a.position)-POS.indexOf(b.position)||b.weight-a.weight);
    let last='';
    $('#tryRecipe').innerHTML=items.map(r=>{
      const first=r.position!==last; last=r.position;
      return `<div class="tr-row${first?' grp':''}"><span class="tr-pos">${first?r.position:''}</span><span class="tr-note">${r.note}</span>
        <span class="tr-bar"><i style="width:${Math.min(100,r.weight*200)}%"></i></span><span class="tr-pct">${Math.round(r.weight*100)}%</span></div>`;
    }).join('');
    s.cartridges.forEach((c,k)=>{
      const row=rows[k];
      $$('.seg',row).forEach((g,j)=>g.classList.toggle('on',j<c.fan_level));
      $('.cart-lv',row).textContent=c.fan_level;
      row.classList.toggle('off',c.fan_level===0);
    });
    const miss=s.uncovered_notes.length?` · ${s.uncovered_notes.join(', ')} not in any cartridge`:'';
    $('#tryMeta').textContent=`Fan vector ${s.fan_levels.join(' · ')} · recipe-to-render match ${s.cosine.toFixed(2)} (cosine)${miss}`;
  }
  btns.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.i))));
  show(0);
})();

/* ---------- product colors ---------- */
(function(){
  const COLORS=[
    {img:'assets/img/sceno-one-midnight-black.jpg',name:'Midnight Black',desc:'The most restrained expression: low visual noise, focused on form and output.'},
    {img:'assets/img/sceno-one-stone-white.jpg',name:'Stone White',desc:'A light neutral finish designed to sit naturally in galleries, studios, and living spaces.'},
    {img:'assets/img/sceno-one-warm-titanium.jpg',name:'Warm Titanium',desc:'A neutral metallic finish that emphasizes the device as engineered hardware.'}
  ];
  let i=1;  /* Stone White first: hero already shows Midnight Black */
  const img=$('#productImg'),name=$('#productName'),desc=$('#productDesc'),dots=$$('#prodDots .prod-dot');
  function render(n){
    i=(n+COLORS.length)%COLORS.length; const c=COLORS[i];
    img.style.opacity='0';
    setTimeout(()=>{ img.src=c.img; img.style.transition='opacity .32s var(--ease)'; img.onload=()=>img.style.opacity='1'; },120);
    name.textContent=c.name; desc.textContent=c.desc;
    dots.forEach((d,k)=>d.classList.toggle('active',k===i));
  }
  $$('#productSlider .prod-arrow').forEach(a=>a.addEventListener('click',()=>render(i+Number(a.dataset.dir))));
  dots.forEach(d=>d.addEventListener('click',()=>render(Number(d.dataset.i))));
})();

/* ---------- scenttrack: single active cue ---------- */
(function(){
  const cues=$$('#scentLane .clip.scent');
  cues.forEach(c=>c.addEventListener('click',()=>{
    cues.forEach(x=>x.classList.remove('active')); c.classList.add('active');
  }));
})();
