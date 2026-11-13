# CivicConnect

**Your City. Your Voice. Your Solution.**

A premium, citizen-centric government services and civic issue management platform (frontend demo).

> **Important:** This is a demonstration / portfolio project. It is **not** an official government product. It does not submit real complaints, process official applications, or verify identity. All data is local (localStorage) and illustrative.

## Features

### Public website
- Premium landing page with dark/light theme
- About, Contact, Services directory, Schemes discovery
- Public issue exploration and complaint tracking by reference ID
- Emergency help center with Indian emergency numbers

### Citizen portal
- Demo authentication (email + password)
- Personalized dashboard with stats, recent complaints, announcements
- **Multi-step complaint reporting** (category → details → location → evidence → contact → review)
- My Complaints list with filters and search
- Complaint details with status timeline and comments
- Government services & schemes directories
- Nearby public facilities (sample Pune data)
- Notifications center
- Profile & theme settings

### Department portal
- Department overview dashboard
- Complaint queue view

### Admin portal
- System overview metrics
- Placeholder pages for full CMS (users, departments, categories, etc.)

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** (custom design system)
- **React Router v6**
- **Zustand** (state + localStorage persistence)
- **Lucide React** (icons)
- **Sonner** (toasts)
- **Recharts**, **Framer Motion**, **React Hook Form**, **Zod**, **Leaflet** (declared for extension)

## Design system

- **Default:** Dark theme (`#0B0D14` background, purple `#8B5CF6` accent)
- Full light theme support with persistence
- Inter / Plus Jakarta Sans typography
- Consistent cards, buttons, badges, forms, empty states

## Demo accounts

| Role               | Email                          | Password |
|--------------------|--------------------------------|----------|
| Citizen            | citizen@civicconnect.demo      | demo123  |
| Department Officer | officer@civicconnect.demo      | demo123  |
| Department Admin   | department@civicconnect.demo   | demo123  |
| Super Admin        | admin@civicconnect.demo        | demo123  |

## Getting started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173).

## Project structure

```
src/
├── components/     # UI, layout, shared
├── layouts/        # PublicLayout, AppLayout
├── pages/          # public, auth, citizen, complaints, services, schemes, ...
├── store/          # Zustand store + seed data
├── utils/          # cn, format helpers
├── App.jsx         # Routes
└── main.jsx
```

## Sample data

- Complaints with realistic Pune localities and timelines
- Government services (birth certificate, property tax, DL guidance, scholarships, etc.)
- Schemes (PM-KISAN, PMAY, Ayushman Bharat, state scholarships)
- Announcements (water interruption, road closure, health camp)
- Public facilities (hospitals, police, fire, toilets, blood banks)

Complaint IDs look like `CC-2026-000124` and are clearly marked as **demo reference numbers**.

## Accessibility & privacy notes

- Semantic HTML, focus states, keyboard-friendly modals
- Theme respects preference; reduced-motion CSS support
- Do **not** store real Aadhaar, bank credentials or sensitive documents in the demo
- Frontend role checks are **not** real authorization

## Roadmap (not all implemented in this build)

Phase 1–5 core flows are working. Further phases (full officer workspace, admin CMS, interactive maps, document organizer, eligibility questionnaire, etc.) can be extended from the existing architecture and placeholder routes.

## License

MIT — for educational and portfolio use. Do not present as an official government service.
