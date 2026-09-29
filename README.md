# SCENO Landing Page

Static site — upload this folder as is. Open `index.html` or serve locally:

    python3 -m http.server -d sceno_landing 8000

```
sceno_landing/
├── index.html
└── assets/
    ├── css/styles.css
    ├── js/app.js        nav, reveal, try-a-scene, research tabs, product colors, scent cues
    ├── js/scenes.js     real pipeline outputs for "Try a scene" (generated, do not hand-edit)
    └── img/             logos, favicon, OG image, product renders, scene/use-case photos
                         (photo sources: img/CREDITS.txt)
```

Fonts load from Google Fonts / jsDelivr (Instrument Sans, Pretendard).
Design source: `../SCENO_Brand_Design_Guidelines_v2.0.md`. Unused brand files and demo provenance: `../sceno_landing_src/`.
