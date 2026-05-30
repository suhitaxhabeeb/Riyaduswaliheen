# Hajj Dua Plan

A self-contained, installable dua planner web app for Hajj and year-round use.

It is a single static HTML page — no build step, no dependencies. Open
`index.html` in any modern browser, or serve the folder with any static
file server.

## Features

- **Yawm al-Arafah plan** — a focused collection for the greatest day, including
  the Tarfata 'Ayn dua and the best dhikr of Arafah.
- **Hajj Journey** — a step-by-step set of duas from leaving home, through
  ihram, Tawaf, Sa'i, Arafah, Muzdalifah, the Jamarat, and the journey home.
- **Riyadus Saliheen rounds** — 7 themed rounds (Hamd & Shukr, Istighfar, Self
  in Dunya & Deen, Self in Akhirah, Dua for Others, Acceptance, the Ummah) to
  use across the 7 circuits of Tawaf and the 7 rounds of Sa'i.
- **Fortress of the Muslim** supplications, **morning & evening adhkar**,
  **sleep** and **distress** duas.
- **Curated collections** — Rabbana duas, Quranic gems, 100-dua themed sets
  (rizq, marriage, forgiveness, family, heart, health, growth, gratitude,
  akhirah), parenting, family, and Ummah duas.
- **Dhikr counter** — a tap counter with target presets (33 / 99 / 100 / ∞)
  and selectable dhikr.
- **Installable PWA** — add to your home screen and use it offline-friendly,
  full-screen, on mobile.

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
