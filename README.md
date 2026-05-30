# Daily Dua

A self-contained, installable dua app for everyday use, with a dedicated
section for Hajj & Umrah.

It is a single static HTML page — no build step, no dependencies. Open
`index.html` in any modern browser, or serve the folder with any static
file server.

## Features

### Everyday (home)
- **Daily adhkar** — time-aware morning / evening remembrance, plus before-sleep
  and distress & relief duas.
- **Fortress of the Muslim** supplications and **Allahumma** & **Sunnah** duas.
- **Rabbana duas** and **Quranic gems** — each carries a reference and the
  **context of revelation** (surah, ayah, who is speaking, and the Quranic
  setting) on the flip side of the card.
- **Themed collections** — rizq, marriage, forgiveness, family, heart, health,
  growth, gratitude, akhirah, parenting, and Ummah duas.
- **Dhikr counter** — a tap counter with target presets (33 / 99 / 100 / ∞)
  and selectable dhikr.

### Hajj & Umrah (dedicated section)
All pilgrimage duas are consolidated under one **Hajj & Umrah** hub, reachable
from the home banner or the bottom nav:
- **Yawm al-Arafah plan** — the focused collection for the greatest day,
  including the Tarfata 'Ayn dua and the best dhikr of Arafah.
- **The Hajj Journey** — step-by-step duas from leaving home, through ihram,
  Tawaf, Sa'i, Arafah, Muzdalifah, the Jamarat, and the journey home.
- **Hajj & Umrah duas** — a curated supplication collection for the pilgrim.
- **Riyadus Saliheen — the 7 themed rounds** (Hamd & Shukr, Istighfar, Self in
  Dunya & Deen, Self in Akhirah, Dua for Others, Acceptance, the Ummah) for the
  7 circuits of Tawaf and the 7 rounds of Sa'i.

**Installable PWA** — add to your home screen and use it full-screen on mobile.

## Card references

Quranic duas show a **Reference & Revelation** panel when you flip the card:
the surah name and ayah, who is making the supplication (e.g. Ādam, Ibrāhīm,
Yūnus, peace be upon them), and the situation in the Qur'an. Where classical
scholarship does not record a specific occasion of revelation for a
supplication-verse, the panel gives the surah context rather than inventing a
sabab al-nuzūl. Hadith-sourced duas cite their collection (Bukhārī, Muslim, Abū
Dāwūd, Tirmidhī, Fortress of the Muslim, etc.).

## Run locally

```bash
# any static server works, e.g.:
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

- `index.html` — the entire app (markup, styles, data, and logic).
- `manifest.json` — PWA manifest for home-screen install.
- `icon.svg` — app icon.

## Notes on the duas

Sources are cited on each card (Qur'an references, hadith collections such as
Bukhari, Muslim, Abu Dawud, Tirmidhi, and Fortress of the Muslim). Personal and
reflective duas are attributed to their authors. Please verify wording with a
knowledgeable source before relying on any supplication.
