# CivicConnect

**Your City. Your Voice. Your Solution.**

A premium, citizen-centric government services and civic issue management platform designed to connect citizens with public services, simplify complaint reporting, and improve civic engagement.

🚀 **Live Demo:** [https://civic-connect-ms-0be5.vercel.app](https://civic-connect-ms-0be5.vercel.app)

> **Important:** CivicConnect is a demonstration and portfolio project, not an official government product. It does not submit real complaints, process official applications, or verify identities. All application data is illustrative and stored locally using localStorage.

---

## Features

### 🌐 Public Website

- Premium landing page with modern dark and light themes.
- About and Contact pages.
- Government services directory.
- Government schemes discovery.
- Public civic issue exploration.
- Complaint tracking using reference IDs.
- Emergency help center with Indian emergency numbers.
- Responsive navigation and interactive UI.

### 👤 Citizen Portal

- Demo authentication using email and password.
- Personalized citizen dashboard.
- Dashboard statistics and recent complaints.
- Latest announcements and updates.
- **Multi-step complaint reporting workflow:**
  - Category selection
  - Complaint details
  - Location information
  - Evidence upload interface
  - Contact information
  - Final review and submission
- My Complaints with search and filters.
- Complaint details with status timeline and comments.
- Government services and schemes directories.
- Nearby public facilities with sample Pune data.
- Notifications center.
- User profile management.
- Theme preferences and settings.

### 🏢 Department Portal

- Department overview dashboard.
- Complaint queue management view.
- Department-level complaint monitoring.

### 🛡️ Admin Portal

- System overview dashboard.
- Platform statistics and metrics.
- Placeholder pages for users, departments, categories, and other CMS functionality.

### 🎨 UI/UX Experience

- Premium government SaaS-inspired design.
- Modern dark and light themes.
- Purple accent color system.
- Clean typography and consistent spacing.
- Reusable components and interactive cards.
- Smooth transitions and animations.
- Responsive desktop, tablet, and mobile layouts.
- Accessible forms and keyboard-friendly interactions.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend library |
| Vite | Development and build tool |
| Tailwind CSS | Styling and custom design system |
| React Router v6 | Application routing |
| Zustand | State management |
| Lucide React | Icons |
| Sonner | Toast notifications |
| Recharts | Data visualization |
| Framer Motion | Animations |
| React Hook Form | Form handling |
| Zod | Form validation |
| Leaflet | Mapping extension |

---

## Design System

CivicConnect uses a premium SaaS-inspired design system focused on accessibility, consistency, and usability.

- **Default Theme:** Dark Mode
- **Background:** `#0B0D14`
- **Primary Accent:** `#8B5CF6`
- **Typography:** Inter / Plus Jakarta Sans
- **Theme Support:** Dark and Light
- **Persistence:** Theme preference saved locally
- **Components:** Cards, buttons, badges, forms, modals, tables, and empty states.

---

## Demo Accounts

Use the following credentials to explore different portal experiences.

| Role | Email | Password |
|---|---|---|
| Citizen | `citizen@civicconnect.demo` | `demo123` |
| Department Officer | `officer@civicconnect.demo` | `demo123` |
| Department Admin | `department@civicconnect.demo` | `demo123` |
| Super Admin | `admin@civicconnect.demo` | `demo123` |

> These are demonstration credentials only. Do not use real or sensitive personal information.

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/sujalprakash6115/CivicConnect.git
```

### 2. Navigate to the Project

```bash
cd CivicConnect
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open in Browser

Visit:

```text
http://localhost:5173
```

---

## Project Structure

```text
CivicConnect/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   │
│   ├── layouts/
│   │   ├── PublicLayout
│   │   └── AppLayout
│   │
│   ├── pages/
│   │   ├── public/
│   │   ├── auth/
│   │   ├── citizen/
│   │   ├── complaints/
│   │   ├── services/
│   │   └── schemes/
│   │
│   ├── store/
│   │   └── Zustand store and seed data
│   │
│   ├── utils/
│   │   └── Helper functions
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Sample Data

The application includes illustrative data to demonstrate its functionality.

- **Civic Complaints:** Roads, garbage collection, water supply, drainage, and streetlights.
- **Localities:** Sample Pune locations and complaint timelines.
- **Government Services:** Birth certificates, property tax, driving licence guidance, and scholarships.
- **Government Schemes:** PM-KISAN, PMAY, Ayushman Bharat, and state scholarships.
- **Announcements:** Water interruptions, road closures, and health camps.
- **Public Facilities:** Hospitals, police stations, fire services, public toilets, and blood banks.

Example complaint reference ID:

```text
CC-2026-000124
```

All complaint reference numbers are demonstration IDs and do not represent official government registrations.

---

## Data Storage & Privacy

- Application state is managed using Zustand.
- Data persistence is implemented through browser localStorage.
- Sample data is illustrative and intended for demonstration.
- Authentication is simulated for portfolio purposes.
- Frontend role checks are not real security or authorization.
- Do not enter real Aadhaar details, banking credentials, or sensitive personal documents.

---

## Accessibility

CivicConnect aims to provide an accessible and user-friendly experience through:

- Semantic HTML elements.
- Visible keyboard focus states.
- Keyboard-friendly modal interactions.
- Responsive layouts.
- Theme preference support.
- Reduced-motion CSS support.

---

## Future Improvements

The following improvements can extend CivicConnect into a more complete digital governance platform:

- Integrate real government service APIs.
- Implement secure authentication and backend authorization.
- Develop a complete department officer workspace.
- Build a fully functional admin CMS.
- Add interactive maps and GPS-based complaint reporting.
- Introduce AI-powered civic complaint categorization.
- Add multilingual support for Indian regional languages.
- Implement real-time notifications through email and SMS.
- Add document management and verification workflows.
- Develop government scheme eligibility questionnaires.
- Add advanced complaint analytics and reporting.
- Integrate official public service information.

---

## Development Status

**Current Build:** Frontend Demonstration

Core citizen-facing flows and demo portal experiences are implemented. Some advanced department and administration features remain placeholders or planned extensions.

---

## Live Deployment

- **Deployment Platform:** Vercel
- **Live Website:** [CivicConnect – Open Live Demo](https://civic-connect-ms-0be5.vercel.app/)

---

## License

This project is licensed under the MIT License for educational and portfolio use.

CivicConnect is an independent demonstration project and is not affiliated with or endorsed by any government department or authority.

---

## Author

**Sujal Prakash**

- GitHub: [@sujalprakash6115](https://github.com/sujalprakash6115)
- Project Repository: [CivicConnect](https://github.com/sujalprakash6115/CivicConnect)
- Live Demo: [CivicConnect](https://civic-connect-ms-0be5.vercel.app/)

---

⭐ If you find this project interesting, consider giving the repository a star!

**CivicConnect — Your City. Your Voice. Your Solution.**
