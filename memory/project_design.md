---
name: ps-sony-store-design
description: Design direction and tech stack for the PS Sony Store project
metadata:
  type: project
---

PlayStation-themed dark gaming e-commerce store.

**Why:** Full UI/UX overhaul requested June 2026 — moved from light theme to dark gaming aesthetic matching Sony/PS Store style.

**Design System:**
- Background: #070d1a (near-black navy)
- Surface/cards: #0e1829
- Primary blue: #003fcf (PS blue), light variant: #1a6aff
- Text: #f0f4ff primary, rgba(240,244,255,0.6) secondary
- Success: #00e676, Error: #ff4444
- Borders: rgba(255,255,255,0.07)

**Fonts:** Space Grotesk (headings, 700), Inter (body)

**Tech Stack:** React 17, MUI v5, Redux + Thunk, React Router v6, Axios, makeStyles (@mui/styles)

**Key design patterns:**
- Glassmorphism sticky navbar with backdrop-filter blur
- Product cards with aspect-ratio 2/3, dark surface, reveal overlay on hover with blue glow border
- Section headings with blue accent bar (4px left bar)
- Alternating section backgrounds (#070d1a / #090f1e)
- Buttons use gradient (linear-gradient(135deg, #003fcf, #1a6aff))
- All auth forms (signin, register) use dark cards without local ThemeProvider override

**How to apply:** All new components should use the dark theme tokens. Avoid light backgrounds or light text colors.
