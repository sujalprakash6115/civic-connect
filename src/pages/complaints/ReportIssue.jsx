import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check, MapPin, Upload, X } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Button } from '../../components/ui/Button'
import { Input, Textarea, Select } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { toast } from 'sonner'
import { cn } from '../../utils/cn'

const STEPS = ['Category', 'Details', 'Location', 'Evidence', 'Contact', 'Review']

export default function ReportIssue() {
  const { categories, user, addComplaint } = useStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    severity: 'medium',
    priority: 'medium',
    dateObserved: new Date().toISOString().slice(0, 10),
    ongoing: true,
    peopleAffected: '',
    notes: '',
    state: user?.state || 'Maharashtra',
    district: user?.district || 'Pune',
    city: user?.city || 'Pune',
    ward: user?.ward || '',
    locality: '',
    street: '',
    pincode: user?.pincode || '',
    landmark: '',
    lat: 18.5204,
    lng: 73.8567,
    isAnonymous: false,
    notifyEmail: true,
    notifyPhone: false,
    evidence: [],
  })

  const update = (field) => (e) => {
    const value = e.target?.type === 'checkbox' ? e.target.checked : e.target?.value ?? e
    setForm((f) => ({ ...f, [field]: value }))
  }

  const subcategories = form.category ? categories[form.category] || [] : []

  const canNext = () => {
    if (step === 0) return form.category && form.subcategory
    if (step === 1) return form.title.trim().length >= 10 && form.description.trim().length >= 20
    if (step === 2) return form.city && form.pincode
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    const complaint = addComplaint({
      title: form.title,
      description: form.description,
      category: form.category,
      subcategory: form.subcategory,
      severity: form.severity,
      priority: form.priority,
      location: {
        state: form.state,
        district: form.district,
        city: form.city,
        ward: form.ward,
        locality: form.locality,
        street: form.street,
        pincode: form.pincode,
        landmark: form.landmark,
        lat: form.lat,
        lng: form.lng,
      },
      citizenId: user?.id,
      citizenName: form.isAnonymous ? 'Anonymous' : user?.name,
      isAnonymous: form.isAnonymous,
      evidence: form.evidence,
      department: null,
      assignedOfficer: null,
    })
    setLoading(false)
    toast.success(`Complaint submitted! Reference: ${complaint.id}`)
    navigate(`/complaints/${complaint.id}`)
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="page-title">Report a Civic Issue</h1>
        <p className="page-subtitle">Help improve your community by reporting problems</p>
      </div>

      {/* Progress */}
      <div className="mb-8 flex items-center gap-1 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1 shrink-0">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors',
                i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-[var(--elevated)] text-[var(--text-secondary)]'
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn('text-xs font-medium hidden sm:block', i === step ? 'text-primary' : 'text-[var(--text-secondary)]')}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className="w-6 h-px bg-[var(--border)] mx-1" />}
          </div>
        ))}
      </div>

      <Card className="mb-6">
        {/* Step 0: Category */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Category</h2>
            <Select label="Category" value={form.category} onChange={update('category')} required>
              <option value="">Choose a category</option>
              {Object.keys(categories).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
            {form.category && (
              <Select label="Subcategory" value={form.subcategory} onChange={update('subcategory')} required>
                <option value="">Choose a subcategory</option>
                {subcategories.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            )}
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Issue Details</h2>
            <Input
              label="Complaint title"
              value={form.title}
              onChange={update('title')}
              placeholder="e.g. Streetlight not working near bus stop"
              required
            />
            <Textarea
              label="Detailed description"
              value={form.description}
              onChange={update('description')}
              placeholder="Describe the issue clearly — what, where, since when, and how it affects people..."
              required
            />
            <p className="text-xs text-[var(--text-secondary)]">Minimum 20 characters. Be specific to help officers resolve faster.</p>
            <div className="grid grid-cols-2 gap-3">
              <Select label="Severity" value={form.severity} onChange={update('severity')}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
              <Select label="Priority" value={form.priority} onChange={update('priority')}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            <Input label="Date observed" type="date" value={form.dateObserved} onChange={update('dateObserved')} />
            <Input label="Number of people affected (approx.)" type="number" value={form.peopleAffected} onChange={update('peopleAffected')} placeholder="e.g. 50" />
            <Textarea label="Additional notes (optional)" value={form.notes} onChange={update('notes')} />
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Location
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Select label="State" value={form.state} onChange={update('state')}>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Delhi</option>
                <option>Gujarat</option>
              </Select>
              <Input label="District" value={form.district} onChange={update('district')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" value={form.city} onChange={update('city')} required />
              <Input label="PIN code" value={form.pincode} onChange={update('pincode')} required placeholder="411001" />
            </div>
            <Input label="Ward / Locality" value={form.ward} onChange={update('ward')} placeholder="Ward 12 - Kothrud" />
            <Input label="Street / Area" value={form.street} onChange={update('street')} />
            <Input label="Landmark" value={form.landmark} onChange={update('landmark')} placeholder="Near bus depot" />
            <div className="rounded-button border border-[var(--border)] bg-[var(--elevated)] p-4 text-center text-sm text-[var(--text-secondary)]">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              Interactive map would appear here (Leaflet + OpenStreetMap).
              <br />
              <span className="text-xs">Demo location: Pune, Maharashtra ({form.lat}, {form.lng})</span>
            </div>
          </div>
        )}

        {/* Step 3: Evidence */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upload Evidence</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Photos help departments understand and prioritize issues. Max 5 images, 5 MB each.
            </p>
            <div className="rounded-button border-2 border-dashed border-[var(--border)] p-8 text-center">
              <Upload className="h-10 w-10 mx-auto text-[var(--text-secondary)] mb-3" />
              <p className="text-sm font-medium">Drag & drop images here</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">or click to browse (demo — files are not uploaded)</p>
              <Button variant="secondary" size="sm" className="mt-4" onClick={() => toast.info('File upload is simulated in this demo')}>
                Select files
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Contact */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contact Preferences</h2>
            <label className="flex items-start gap-3 rounded-button border border-[var(--border)] p-4 cursor-pointer">
              <input type="checkbox" checked={form.isAnonymous} onChange={update('isAnonymous')} className="mt-1" />
              <div>
                <p className="font-medium text-sm">Report anonymously</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Your name will not be shown publicly. Status notifications may be limited.
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={form.notifyEmail} onChange={update('notifyEmail')} />
              Email updates about this complaint
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={form.notifyPhone} onChange={update('notifyPhone')} />
              SMS / phone updates (demo only)
            </label>
            <p className="text-xs text-[var(--text-secondary)]">
              By submitting, you confirm the information is accurate to the best of your knowledge.
            </p>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Review & Submit</h2>
            <div className="rounded-button bg-[var(--elevated)] p-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Category</span><span>{form.category} → {form.subcategory}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Title</span><span className="text-right max-w-[60%]">{form.title}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Severity</span><span className="capitalize">{form.severity}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Location</span><span>{form.city}, {form.pincode}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Anonymous</span><span>{form.isAnonymous ? 'Yes' : 'No'}</span></div>
            </div>
            <div className="rounded-button border border-warning/30 bg-warning/10 p-3 text-xs text-warning">
              This is a <strong>demo reference number</strong>. It is not an official government complaint ID.
            </div>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} loading={loading}>
            <Check className="h-4 w-4" /> Submit Complaint
          </Button>
        )}
      </div>
    </div>
  )
}
