import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateComplaintId } from '../utils/format'

const DEMO_USERS = {
  'citizen@civicconnect.demo': {
    id: 'u1',
    email: 'citizen@civicconnect.demo',
    password: 'demo123',
    name: 'Priya Sharma',
    role: 'citizen',
    phone: '9876543210',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    pincode: '411001',
    ward: 'Ward 12 - Kothrud',
    language: 'en',
    avatar: null,
  },
  'officer@civicconnect.demo': {
    id: 'u2',
    email: 'officer@civicconnect.demo',
    password: 'demo123',
    name: 'Rajesh Patil',
    role: 'officer',
    phone: '9876543211',
    department: 'Public Works Department',
    departmentId: 'd1',
  },
  'department@civicconnect.demo': {
    id: 'u3',
    email: 'department@civicconnect.demo',
    password: 'demo123',
    name: 'Anita Deshmukh',
    role: 'department_admin',
    phone: '9876543212',
    department: 'Municipal Corporation',
    departmentId: 'd1',
  },
  'admin@civicconnect.demo': {
    id: 'u4',
    email: 'admin@civicconnect.demo',
    password: 'demo123',
    name: 'Vikram Joshi',
    role: 'admin',
    phone: '9876543213',
  },
}

const seedComplaints = [
  {
    id: 'CC-2026-000124',
    title: 'Streetlight not working near Kothrud bus stop',
    description: 'The streetlight near the main Kothrud bus stop has been non-functional for the past 10 days. It becomes very dark after 7 PM and poses safety concerns for pedestrians, especially women and senior citizens.',
    category: 'ELECTRICITY AND STREETLIGHTS',
    subcategory: 'Streetlight not working',
    severity: 'high',
    priority: 'high',
    status: 'in_progress',
    location: {
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      ward: 'Ward 12 - Kothrud',
      locality: 'Kothrud',
      street: 'Paud Road',
      pincode: '411038',
      landmark: 'Near Kothrud Depot',
      lat: 18.5074,
      lng: 73.8077,
    },
    citizenId: 'u1',
    citizenName: 'Priya Sharma',
    department: 'Public Works Department',
    assignedOfficer: 'Rajesh Patil',
    createdAt: '2026-11-05T10:30:00Z',
    updatedAt: '2026-11-10T14:20:00Z',
    timeline: [
      { status: 'submitted', at: '2026-11-05T10:30:00Z', note: 'Complaint submitted by citizen', by: 'Priya Sharma' },
      { status: 'under_review', at: '2026-11-06T09:15:00Z', note: 'Complaint verified and under review', by: 'System' },
      { status: 'assigned', at: '2026-11-07T11:00:00Z', note: 'Assigned to Public Works Department', by: 'Anita Deshmukh' },
      { status: 'in_progress', at: '2026-11-10T14:20:00Z', note: 'Technician dispatched. Replacement parts ordered.', by: 'Rajesh Patil' },
    ],
    evidence: [],
    comments: [],
    isAnonymous: false,
    upvotes: 12,
  },
  {
    id: 'CC-2026-000098',
    title: 'Garbage not collected for 4 days in Baner',
    description: 'Municipal garbage collection has not happened in our locality for the past 4 days. Bins are overflowing and causing hygiene issues and foul smell.',
    category: 'SANITATION AND GARBAGE',
    subcategory: 'Garbage not collected',
    severity: 'medium',
    priority: 'medium',
    status: 'resolved',
    location: {
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      ward: 'Ward 8 - Baner',
      locality: 'Baner',
      street: 'Baner Road',
      pincode: '411045',
      landmark: 'Near Baner Gaon',
      lat: 18.5590,
      lng: 73.7868,
    },
    citizenId: 'u1',
    citizenName: 'Priya Sharma',
    department: 'Solid Waste Management',
    assignedOfficer: 'Suresh Kulkarni',
    createdAt: '2026-10-28T08:00:00Z',
    updatedAt: '2026-11-02T16:45:00Z',
    resolvedAt: '2026-11-02T16:45:00Z',
    timeline: [
      { status: 'submitted', at: '2026-10-28T08:00:00Z', note: 'Complaint submitted', by: 'Priya Sharma' },
      { status: 'under_review', at: '2026-10-28T14:00:00Z', note: 'Under review', by: 'System' },
      { status: 'assigned', at: '2026-10-29T10:00:00Z', note: 'Assigned to SWM team', by: 'Anita Deshmukh' },
      { status: 'in_progress', at: '2026-10-30T09:00:00Z', note: 'Collection vehicle scheduled', by: 'Suresh Kulkarni' },
      { status: 'resolved', at: '2026-11-02T16:45:00Z', note: 'Garbage collected. Schedule restored to daily.', by: 'Suresh Kulkarni' },
    ],
    evidence: [],
    comments: [{ id: 'c1', text: 'Thank you for the quick resolution!', by: 'Priya Sharma', at: '2026-11-03T10:00:00Z' }],
    isAnonymous: false,
    upvotes: 8,
    rating: 5,
  },
  {
    id: 'CC-2026-000156',
    title: 'Large pothole on FC Road near Fergusson College',
    description: 'A large pothole has developed on FC Road near the college gate. It is causing traffic slowdown and risk of accidents, especially for two-wheelers.',
    category: 'ROADS AND TRANSPORT',
    subcategory: 'Potholes',
    severity: 'high',
    priority: 'high',
    status: 'assigned',
    location: {
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      ward: 'Ward 5 - Shivajinagar',
      locality: 'Shivajinagar',
      street: 'Fergusson College Road',
      pincode: '411004',
      landmark: 'Near Fergusson College Main Gate',
      lat: 18.5280,
      lng: 73.8410,
    },
    citizenId: 'u1',
    citizenName: 'Priya Sharma',
    department: 'Public Works Department',
    assignedOfficer: null,
    createdAt: '2026-11-08T16:20:00Z',
    updatedAt: '2026-11-09T11:00:00Z',
    timeline: [
      { status: 'submitted', at: '2026-11-08T16:20:00Z', note: 'Complaint submitted', by: 'Priya Sharma' },
      { status: 'under_review', at: '2026-11-09T09:00:00Z', note: 'Verified via community reports', by: 'System' },
      { status: 'assigned', at: '2026-11-09T11:00:00Z', note: 'Assigned to PWD Road Maintenance', by: 'Anita Deshmukh' },
    ],
    evidence: [],
    comments: [],
    isAnonymous: false,
    upvotes: 24,
  },
]

const seedServices = [
  {
    id: 's1',
    name: 'Birth Certificate',
    category: 'IDENTITY AND DOCUMENTS',
    description: 'Apply for birth certificate registration and obtain certified copies from municipal authorities.',
    eligibility: 'Parents or legal guardians of the child. Application should preferably be made within 21 days of birth.',
    documents: ['Hospital discharge summary / birth report', 'Parents Aadhaar', 'Address proof'],
    processTime: '7–15 working days',
    fees: '₹50–₹200 (varies by municipality)',
    steps: ['Visit official municipal portal or office', 'Fill application form', 'Upload/submit documents', 'Pay fee', 'Track application'],
    officialUrl: 'https://www.india.gov.in',
    department: 'Municipal Corporation / Gram Panchayat',
    lastVerified: '2026-10-15',
  },
  {
    id: 's2',
    name: 'Property Tax Payment',
    category: 'MUNICIPAL SERVICES',
    description: 'Pay property tax online or offline for residential and commercial properties.',
    eligibility: 'Property owners within municipal limits.',
    documents: ['Property ID / Property tax assessment number', 'Previous tax receipt (if any)'],
    processTime: 'Instant (online)',
    fees: 'As per assessment',
    steps: ['Login to municipal portal', 'Search property', 'Verify details', 'Pay online', 'Download receipt'],
    officialUrl: 'https://www.india.gov.in',
    department: 'Municipal Corporation',
    lastVerified: '2026-10-20',
  },
  {
    id: 's3',
    name: 'Driving Licence Guidance',
    category: 'TRANSPORT',
    description: 'Information and guidance for applying for learner and permanent driving licences.',
    eligibility: 'Indian citizens meeting age criteria (16+ for gearless, 18+ for geared vehicles).',
    documents: ['Aadhaar / Age proof', 'Address proof', 'Passport photos', 'Medical certificate (if required)'],
    processTime: 'Varies by RTO',
    fees: 'As prescribed by state transport department',
    steps: ['Apply on Parivahan portal', 'Book slot', 'Appear for test', 'Receive licence'],
    officialUrl: 'https://parivahan.gov.in',
    department: 'Regional Transport Office (RTO)',
    lastVerified: '2026-09-28',
  },
  {
    id: 's4',
    name: 'Scholarship Discovery',
    category: 'EDUCATION',
    description: 'Discover central and state government scholarships for students.',
    eligibility: 'Students meeting scheme-specific criteria (income, category, course, etc.).',
    documents: ['Aadhaar', 'Income certificate', 'Caste certificate (if applicable)', 'Marksheets', 'Bank details'],
    processTime: 'Scheme dependent',
    fees: 'Free',
    steps: ['Check eligibility on National Scholarship Portal', 'Register / Login', 'Fill form', 'Upload documents', 'Submit'],
    officialUrl: 'https://scholarships.gov.in',
    department: 'Ministry of Education / State Education Dept',
    lastVerified: '2026-10-01',
  },
  {
    id: 's5',
    name: 'Water Connection Application',
    category: 'MUNICIPAL SERVICES',
    description: 'Apply for new domestic or commercial water connection from municipal water supply department.',
    eligibility: 'Property owners or authorized occupants.',
    documents: ['Property ownership proof', 'Aadhaar', 'Site plan', 'NOC if required'],
    processTime: '15–45 days',
    fees: 'Connection charge + security deposit (varies)',
    steps: ['Obtain application form', 'Submit with documents', 'Site inspection', 'Pay charges', 'Connection activation'],
    officialUrl: 'https://www.india.gov.in',
    department: 'Water Supply Department',
    lastVerified: '2026-10-10',
  },
  {
    id: 's6',
    name: 'Senior Citizen Pension Information',
    category: 'WELFARE',
    description: 'Information on Indira Gandhi National Old Age Pension Scheme and state-level pension schemes.',
    eligibility: 'Senior citizens meeting age and income criteria (typically 60+ years, BPL).',
    documents: ['Age proof', 'Income certificate / BPL card', 'Aadhaar', 'Bank passbook', 'Residence proof'],
    processTime: '30–60 days',
    fees: 'Free',
    steps: ['Check eligibility', 'Apply at local authority or online portal', 'Verification', 'Approval', 'Pension disbursement'],
    officialUrl: 'https://nsap.nic.in',
    department: 'Social Welfare Department',
    lastVerified: '2026-09-15',
  },
]

const seedSchemes = [
  {
    id: 'sch1',
    name: 'PM-KISAN',
    category: 'Farmers',
    type: 'Central',
    description: 'Income support scheme providing ₹6,000 per year to eligible farmer families in three equal installments.',
    eligibility: 'Landholding farmer families as defined by the scheme guidelines.',
    documents: ['Aadhaar', 'Land records', 'Bank account'],
    deadline: null,
    officialUrl: 'https://pmkisan.gov.in',
    benefits: '₹6,000 per year',
  },
  {
    id: 'sch2',
    name: 'National Scholarship Portal Schemes',
    category: 'Students',
    type: 'Central',
    description: 'Multiple scholarships for pre-matric and post-matric students from various ministries.',
    eligibility: 'Students from eligible categories meeting academic and income criteria.',
    documents: ['Aadhaar', 'Income certificate', 'Caste certificate', 'Marksheets'],
    deadline: 'Varies by scheme (typically Oct–Dec)',
    officialUrl: 'https://scholarships.gov.in',
    benefits: 'Tuition fee, maintenance allowance as per scheme',
  },
  {
    id: 'sch3',
    name: 'PMAY – Housing for All',
    category: 'Housing',
    type: 'Central',
    description: 'Affordable housing scheme for urban and rural poor.',
    eligibility: 'EWS, LIG, MIG categories as per guidelines; first-time home buyers.',
    documents: ['Aadhaar', 'Income proof', 'Property documents if any'],
    deadline: null,
    officialUrl: 'https://pmaymis.gov.in',
    benefits: 'Interest subsidy / financial assistance for house construction',
  },
  {
    id: 'sch4',
    name: 'Maharashtra State Scholarship for Girls',
    category: 'Students',
    type: 'State',
    state: 'Maharashtra',
    description: 'State-level scholarship support for girl students pursuing higher education.',
    eligibility: 'Girl students domiciled in Maharashtra meeting academic criteria.',
    documents: ['Domicile', 'Aadhaar', 'Marksheets', 'Income certificate'],
    deadline: 'Check state portal',
    officialUrl: 'https://mahadbt.maharashtra.gov.in',
    benefits: 'As per state notification',
  },
  {
    id: 'sch5',
    name: 'Ayushman Bharat – PM-JAY',
    category: 'Healthcare',
    type: 'Central',
    description: 'Health insurance coverage of up to ₹5 lakh per family per year for secondary and tertiary care.',
    eligibility: 'Families identified in SECC database and state-defined criteria.',
    documents: ['Aadhaar', 'Ration card / SECC verification'],
    deadline: null,
    officialUrl: 'https://pmjay.gov.in',
    benefits: 'Cashless treatment up to ₹5 lakh/year',
  },
]

const seedAnnouncements = [
  {
    id: 'a1',
    title: 'Water Supply Interruption – Kothrud & Warje',
    category: 'Utility',
    content: 'Due to pipeline maintenance work, water supply will be interrupted in Kothrud and Warje areas on 15 November 2026 from 10:00 AM to 6:00 PM. Residents are requested to store water in advance.',
    location: 'Pune – Kothrud, Warje',
    publishedAt: '2026-11-12T08:00:00Z',
    source: 'Pune Municipal Corporation – Water Supply Department',
    important: true,
  },
  {
    id: 'a2',
    title: 'Road Closure – FC Road for Metro Construction',
    category: 'Traffic',
    content: 'Partial road closure on Fergusson College Road between Goodluck Chowk and College Gate from 14–20 November 2026 for Metro construction activity. Please use alternate routes.',
    location: 'Pune – Shivajinagar',
    publishedAt: '2026-11-11T12:00:00Z',
    source: 'Pune Traffic Police',
    important: true,
  },
  {
    id: 'a3',
    title: 'Free Health Check-up Camp – Community Hall, Baner',
    category: 'Health',
    content: 'PMC is organizing a free health check-up camp for senior citizens and women on 16 November 2026 at Baner Community Hall from 9 AM to 2 PM.',
    location: 'Pune – Baner',
    publishedAt: '2026-11-10T09:00:00Z',
    source: 'Pune Municipal Corporation – Health Department',
    important: false,
  },
  {
    id: 'a4',
    title: 'Garbage Collection Schedule Update – Diwali Period',
    category: 'Sanitation',
    content: 'During Diwali week, garbage collection will operate on an extended schedule. Please segregate dry and wet waste. Special collection for decorative waste will be arranged on 20 November.',
    location: 'Pune – All wards',
    publishedAt: '2026-11-09T10:00:00Z',
    source: 'Solid Waste Management Department',
    important: false,
  },
]

const seedFacilities = [
  { id: 'f1', name: 'Sassoon General Hospital', category: 'Government hospitals', lat: 18.5285, lng: 73.8720, address: 'Near Pune Railway Station', phone: '020-26128000', hours: '24×7' },
  { id: 'f2', name: 'Kothrud Police Station', category: 'Police stations', lat: 18.5074, lng: 73.8077, address: 'Paud Road, Kothrud', phone: '020-25380000', hours: '24×7' },
  { id: 'f3', name: 'Fire Station – Deccan', category: 'Fire stations', lat: 18.5150, lng: 73.8400, address: 'Near Deccan Gymkhana', phone: '101', hours: '24×7' },
  { id: 'f4', name: 'Pune Municipal Corporation Main Office', category: 'Government offices', lat: 18.5204, lng: 73.8567, address: 'Shivajinagar', phone: '020-25501000', hours: '10:00–17:30' },
  { id: 'f5', name: 'Public Toilet – FC Road', category: 'Public toilets', lat: 18.5280, lng: 73.8410, address: 'Near Goodluck Chowk', phone: null, hours: '06:00–22:00' },
  { id: 'f6', name: 'Blood Bank – Ruby Hall', category: 'Blood banks', lat: 18.5360, lng: 73.8770, address: 'Sassoon Road', phone: '020-26123391', hours: '24×7' },
  { id: 'f7', name: 'Pune University Library', category: 'Public libraries', lat: 18.5520, lng: 73.8250, address: 'Ganeshkhind', phone: null, hours: '09:00–20:00' },
  { id: 'f8', name: 'Baner Community Hall', category: 'Community halls', lat: 18.5590, lng: 73.7868, address: 'Baner Gaon Road', phone: null, hours: 'By booking' },
]

const CATEGORIES = {
  'ROADS AND TRANSPORT': ['Potholes', 'Damaged roads', 'Broken footpaths', 'Missing road signs', 'Traffic signal malfunction', 'Dangerous open manholes', 'Illegal parking', 'Street congestion', 'Damaged speed breakers', 'Unsafe pedestrian crossings', 'Road construction problems'],
  'WATER SUPPLY': ['No water supply', 'Low water pressure', 'Irregular water timing', 'Water leakage', 'Contaminated water', 'Broken pipelines', 'Overflowing water tanks', 'Public water tap damage'],
  'SANITATION AND GARBAGE': ['Garbage not collected', 'Overflowing dustbins', 'Illegal garbage dumping', 'Dirty public places', 'Open drains', 'Blocked drainage', 'Sewage overflow', 'Public toilet maintenance', 'Animal waste', 'Construction waste'],
  'ELECTRICITY AND STREETLIGHTS': ['Streetlight not working', 'Frequent power interruptions', 'Damaged electric poles', 'Exposed electrical wires', 'Dangerous electrical equipment', 'Public area lighting problems'],
  'PUBLIC SAFETY': ['Unsafe public areas', 'Damaged public infrastructure', 'Broken public CCTV', 'Dangerous abandoned structures', 'Missing safety barriers', 'Public nuisance', 'Stray animal concerns'],
  'HEALTH AND ENVIRONMENT': ['Mosquito breeding areas', 'Public health hazards', 'Waterlogging', 'Air pollution', 'Noise pollution', 'Dead animal disposal', 'Tree hazards', 'Environmental dumping'],
  'PUBLIC FACILITIES': ['Damaged public benches', 'Park maintenance', 'Playground damage', 'Public toilet issues', 'Public drinking water facilities', 'Community hall maintenance', 'Public building accessibility'],
  'TRANSPORT': ['Bus stop damage', 'Missing bus stop information', 'Public transport cleanliness', 'Damaged bus shelters', 'Traffic management issues', 'Unsafe road conditions'],
  'OTHER CIVIC ISSUES': ['General civic infrastructure', 'Community concerns', 'Public service complaints'],
}

export const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        get().setTheme(next)
      },

      // Auth
      user: null,
      login: (email, password) => {
        const account = DEMO_USERS[email?.toLowerCase()]
        if (account && account.password === password) {
          const { password: _, ...safeUser } = account
          set({ user: safeUser })
          return { success: true, user: safeUser }
        }
        return { success: false, error: 'Invalid email or password. Use demo accounts.' }
      },
      logout: () => set({ user: null }),
      register: (data) => {
        // Demo registration – just create a local citizen profile
        const newUser = {
          id: `u${Date.now()}`,
          email: data.email,
          name: data.fullName,
          role: 'citizen',
          phone: data.phone,
          state: data.state,
          district: data.district,
          city: data.city,
          pincode: data.pincode,
          ward: data.ward,
          language: data.language || 'en',
        }
        set({ user: newUser })
        return { success: true, user: newUser }
      },

      // Complaints
      complaints: seedComplaints,
      addComplaint: (data) => {
        const id = generateComplaintId()
        const complaint = {
          id,
          ...data,
          status: 'submitted',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          timeline: [
            {
              status: 'submitted',
              at: new Date().toISOString(),
              note: 'Complaint submitted by citizen',
              by: data.citizenName || 'Citizen',
            },
          ],
          comments: [],
          upvotes: 0,
          evidence: data.evidence || [],
        }
        set((s) => ({ complaints: [complaint, ...s.complaints] }))
        return complaint
      },
      updateComplaint: (id, updates) => {
        set((s) => ({
          complaints: s.complaints.map((c) =>
            c.id === id
              ? {
                  ...c,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                  timeline: updates.timelineEntry
                    ? [...(c.timeline || []), updates.timelineEntry]
                    : c.timeline,
                }
              : c
          ),
        }))
      },
      getComplaint: (id) => get().complaints.find((c) => c.id === id),
      getMyComplaints: () => {
        const user = get().user
        if (!user) return []
        return get().complaints.filter((c) => c.citizenId === user.id)
      },

      // Notifications
      notifications: [
        {
          id: 'n1',
          type: 'complaint',
          title: 'Status update: Streetlight complaint',
          message: 'Your complaint CC-2026-000124 is now In Progress.',
          read: false,
          at: '2026-11-10T14:25:00Z',
        },
        {
          id: 'n2',
          type: 'announcement',
          title: 'Water supply interruption notice',
          message: 'Scheduled maintenance in Kothrud on 15 Nov.',
          read: false,
          at: '2026-11-12T08:05:00Z',
        },
        {
          id: 'n3',
          type: 'complaint',
          title: 'Complaint resolved',
          message: 'Your garbage collection complaint has been resolved.',
          read: true,
          at: '2026-11-02T17:00:00Z',
        },
      ],
      markNotificationRead: (id) => {
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }))
      },
      markAllNotificationsRead: () => {
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        }))
      },

      // Saved items
      savedServices: [],
      savedSchemes: [],
      toggleSaveService: (id) => {
        set((s) => ({
          savedServices: s.savedServices.includes(id)
            ? s.savedServices.filter((x) => x !== id)
            : [...s.savedServices, id],
        }))
      },
      toggleSaveScheme: (id) => {
        set((s) => ({
          savedSchemes: s.savedSchemes.includes(id)
            ? s.savedSchemes.filter((x) => x !== id)
            : [...s.savedSchemes, id],
        }))
      },

      // Static data
      services: seedServices,
      schemes: seedSchemes,
      announcements: seedAnnouncements,
      facilities: seedFacilities,
      categories: CATEGORIES,
      demoUsers: DEMO_USERS,
    }),
    {
      name: 'civicconnect-storage',
      partialize: (s) => ({
        theme: s.theme,
        user: s.user,
        complaints: s.complaints,
        notifications: s.notifications,
        savedServices: s.savedServices,
        savedSchemes: s.savedSchemes,
      }),
    }
  )
)
