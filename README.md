# Nexora Digital — Portfolio Website

A full-stack, production-ready agency portfolio built with **Next.js 14**, **MongoDB Atlas**, glassmorphism UI, Framer Motion animations, and a JWT-protected admin panel — all in one repository.

---

## ✦ Features

| Area | Details |
|---|---|
| **Design** | Apple-inspired glassmorphism, animated gradient orbs, frosted glass cards, smooth scroll reveals |
| **Animations** | Framer Motion scroll-triggered reveals, count-up stats, stagger effects, parallax hero |
| **Sections** | Nav · Hero · Services · Stats · Case Studies · Blogs · Ads & Banners · CTA · Footer |
| **Backend** | Next.js 14 App Router API routes, Mongoose ODM, MongoDB Atlas |
| **Admin** | Full CRUD for all sections via `/admin` — protected with JWT auth (httpOnly cookie) |
| **Auth** | Username + password from `.env.local`, JWT signed with `jose`, middleware-protected routes |
| **Seed** | One-click sample data seeding via `/api/seed` or the admin dashboard |

---

## 🚀 Quick Start

### 1 · Clone & install
```bash
git clone <your-repo>
cd nexora-portfolio
npm install
```

### 2 · Configure environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/nexora-digital?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-minimum-32-characters
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@Nexora2024
```

### 3 · Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4 · Seed the database
Visit [http://localhost:3000/api/seed](http://localhost:3000/api/seed) in your browser, **or** go to the Admin Dashboard → Dashboard tab → click **⚡ Seed DB**.

> ⚠ The seed route replaces all existing content.

### 5 · Access the admin panel
Go to [http://localhost:3000/admin](http://localhost:3000/admin)

Default credentials (from `.env.local`):
- **Username:** `admin`
- **Password:** `Admin@Nexora2024`

---

## 📁 Project Structure

```
nexora-portfolio/
├── app/
│   ├── page.js                  # Main portfolio page (server component)
│   ├── layout.js                # Root layout + fonts
│   ├── globals.css              # Glass effects, animations, custom utilities
│   ├── admin/
│   │   ├── page.jsx             # Admin dashboard (client, lazy-loaded)
│   │   └── login/page.jsx       # Admin login
│   └── api/
│       ├── auth/{login,logout}/ # JWT authentication
│       ├── hero/                # Hero CRUD
│       ├── services/[id]/       # Services CRUD
│       ├── blogs/[id]/          # Blogs CRUD
│       ├── case-studies/[id]/   # Case Studies CRUD
│       ├── cta/                 # CTA upsert
│       ├── ads/[id]/            # Ads CRUD
│       ├── stats/[id]/          # Stats CRUD
│       └── seed/                # One-click data seeding
├── components/
│   ├── Navigation.jsx           # Sticky glass navbar
│   ├── AnimatedBackground.jsx   # Floating gradient orbs
│   ├── sections/
│   │   ├── HeroSection.jsx      # Full-screen hero
│   │   ├── ServicesSection.jsx  # Service cards grid
│   │   ├── StatsSection.jsx     # Animated count-up stats
│   │   ├── CaseStudiesSection.jsx
│   │   ├── BlogsSection.jsx
│   │   ├── AdsSection.jsx
│   │   ├── CTASection.jsx
│   │   └── Footer.jsx
│   └── admin/
│       └── AdminDashboard.jsx   # Full CRUD admin UI
├── lib/
│   ├── mongodb.js               # Mongoose connection singleton
│   └── auth.js                  # JWT sign/verify helpers
├── models/
│   └── index.js                 # All Mongoose models
├── middleware.js                 # Protects /admin/* and write API routes
└── .env.local.example
```

---

## 🔧 API Reference

All write endpoints (`POST`, `PUT`, `DELETE`) require the `nexora_admin_token` cookie set by logging in.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/hero` | Get active hero |
| PUT | `/api/hero` | Upsert hero content |
| GET | `/api/services` | List all services |
| POST | `/api/services` | Create service |
| PUT | `/api/services/:id` | Update service |
| DELETE | `/api/services/:id` | Delete service |
| GET | `/api/blogs` | List all blogs |
| POST | `/api/blogs` | Create blog post |
| PUT | `/api/blogs/:id` | Update blog post |
| DELETE | `/api/blogs/:id` | Delete blog post |
| GET | `/api/case-studies` | List case studies |
| POST | `/api/case-studies` | Create case study |
| PUT | `/api/case-studies/:id` | Update |
| DELETE | `/api/case-studies/:id` | Delete |
| GET | `/api/cta` | Get active CTA |
| PUT | `/api/cta` | Upsert CTA content |
| GET | `/api/ads` | List all ads |
| POST | `/api/ads` | Create ad |
| PUT | `/api/ads/:id` | Update ad |
| DELETE | `/api/ads/:id` | Delete ad |
| GET | `/api/stats` | List all stats |
| POST | `/api/stats` | Create stat |
| PUT | `/api/stats/:id` | Update stat |
| DELETE | `/api/stats/:id` | Delete stat |
| POST | `/api/auth/login` | Login → sets JWT cookie |
| POST | `/api/auth/logout` | Logout → clears cookie |
| GET | `/api/seed` | Seed database with sample data |

---

## 🎨 Design System

### Glass utilities (globals.css)
| Class | Usage |
|---|---|
| `.glass` | Subtle glass — nav, badges, secondary elements |
| `.glass-md` | Medium glass — modals, panels |
| `.glass-strong` | Strong glass — hero overlays |
| `.glass-card` | Full card with lift-on-hover animation |
| `.gradient-border` | Animated gradient border |
| `.gradient-text` | Indigo → Purple → Cyan gradient text |
| `.btn-primary` | Gradient primary button with glow |
| `.btn-glass` | Frosted glass ghost button |
| `.badge` | Pill-shaped indigo badge |

### Colour palette
| Token | Value | Purpose |
|---|---|---|
| Base | `#03040a` | Page background |
| Surface | `#0d1117` | Elevated surface |
| Accent Blue | `#3b82f6` | Interactive elements |
| Accent Purple | `#8b5cf6` | Gradient midpoint |
| Accent Cyan | `#06b6d4` | Highlights |

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Set the three environment variables in Vercel → Settings → Environment Variables
4. Deploy — it's that simple.

---

## 🔒 Security Notes

- Admin credentials live in `.env.local` — **never commit this file**
- JWT tokens are stored in `httpOnly` cookies (not accessible via JavaScript)
- All write API routes are protected by the middleware JWT check
- Use a strong, random `JWT_SECRET` in production (32+ characters)

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom CSS |
| Animations | Framer Motion |
| Database | MongoDB Atlas via Mongoose |
| Auth | `jose` (JWT), httpOnly cookies |
| Notifications | React Hot Toast |
| Deployment | Vercel (recommended) |

---

*Built with ♥ by Nexora Digital*
