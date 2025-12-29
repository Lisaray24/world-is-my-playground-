import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  ChevronRight,
  Search,
  Star,
  Umbrella,
  Ship,
} from "lucide-react";

const BRAND = {
  name: "The World Is My Playground",
  tagline: "Every detail. Every destination.",
  phone: "(248) 284-3071",
  email: "lisa@worldismyplayground.us",
  location: "Detroit, MI",
  cta: "Plan My Trip",
};

const DESTINATIONS = [
  {
    title: "All-Inclusive Escapes",
    subtitle: "Resorts, transfers, and stress-free vibes",
    icon: Umbrella,
    priceFrom: 1299,
    duration: "5–7 nights",
    highlights: ["All-inclusive options", "Airport transfers", "Flexible budgets"],
  },
  {
    title: "Luxury Cruises",
    subtitle: "Suite upgrades, curated excursions",
    icon: Ship,
    priceFrom: 1599,
    duration: "4–10 nights",
    highlights: ["Balcony & suite perks", "Shore experiences", "Group rates"],
  },
  {
    title: "Worldwide Adventures",
    subtitle: "Cities, islands, and bucket-list travel",
    icon: Plane,
    priceFrom: 1899,
    duration: "7–12 nights",
    highlights: ["Custom routing", "Handpicked stays", "Local experiences"],
  },
  {
    title: "Honeymoons & Celebrations",
    subtitle: "Milestones planned like a movie",
    icon: Sparkles,
    priceFrom: 1799,
    duration: "5–10 nights",
    highlights: ["Romance add-ons", "Surprises & upgrades", "VIP support"],
  },
];

const TESTIMONIALS = [
  {
    name: "Jordan M.",
    text: "Everything was handled — flights, hotel, and surprises. We just showed up and enjoyed.",
    rating: 5,
  },
  {
    name: "Aaliyah R.",
    text: "Perfect pacing and great communication. When weather shifted, we had a backup plan instantly.",
    rating: 5,
  },
  {
    name: "Sam K.",
    text: "Best value on a multi-city trip. The suggestions felt personal, not generic.",
    rating: 5,
  },
];

const FAQ = [
  {
    q: "Do you charge a planning fee?",
    a: "Planning is $0 when you book with us through our travel partners. If no booking is made after two or more itinerary revisions/consultations, a $50 planning fee applies to continue custom planning.",
  },
  {
    q: "What do you specialize in?",
    a: "All-inclusive destinations, luxury cruises, and custom trips worldwide — from quick getaways to milestone travel.",
  },
  {
    q: "Are you full-service concierge?",
    a: "Yes. We manage the logistics end-to-end (flights, hotels, transfers, excursions, special requests) and stay available before and during your trip.",
  },
];

function formatUSD(n) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${n}`;
  }
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-zinc-200/70 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Button({ children, variant = "solid", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition active:scale-[0.99]";
  const solid = "bg-zinc-900 text-white hover:bg-zinc-800";
  const outline = "border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900";
  return (
    <button
      className={`${base} ${variant === "outline" ? outline : solid} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs ${className}`}
    >
      {children}
    </span>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 ${props.className || ""}`}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 ${props.className || ""}`}
    />
  );
}

function StarRow({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "opacity-100" : "opacity-30"}`} />
      ))}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    dates: "",
    details: "",
  });

  const nav = [
    { label: "Packages", href: "#packages" },
    { label: "How it Works", href: "#how" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const filteredDestinations = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DESTINATIONS;
    return DESTINATIONS.filter((d) =>
      `${d.title} ${d.subtitle} ${d.highlights.join(" ")}`.toLowerCase().includes(q)
    );
  }, [search]);

  function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    console.log("Trip request:", form);
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Top bar */}
      <div className="border-b bg-zinc-50/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 text-zinc-700">
              <MapPin className="h-4 w-4" /> {BRAND.location}
            </span>
            <a
              className="inline-flex items-center gap-2 text-zinc-700 hover:underline"
              href={`tel:${BRAND.phone.replace(/[^0-9+]/g, "")}`}
            >
              <Phone className="h-4 w-4" /> {BRAND.phone}
            </a>
            <a
              className="inline-flex items-center gap-2 text-zinc-700 hover:underline"
              href={`mailto:${BRAND.email}`}
            >
              <Mail className="h-4 w-4" /> {BRAND.email}
            </a>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Badge>
              <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Trusted Planning
            </Badge>
            <Badge>
              <Sparkles className="mr-1 h-3.5 w-3.5" /> Concierge Service
            </Badge>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-900 text-white">
              <Plane className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold">{BRAND.name}</div>
              <div className="text-xs text-zinc-500">{BRAND.tagline}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden md:block">
              <Button>{BRAND.cta}</Button>
            </a>
            <button
              className="md:hidden rounded-2xl border border-zinc-300 px-3 py-2 text-sm"
              onClick={() => setMenuOpen((s) => !s)}
              aria-expanded={menuOpen}
            >
              Menu
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-50"
                >
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                <Button className="w-full">{BRAND.cta}</Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-zinc-100 blur-3xl opacity-70" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-zinc-100 blur-3xl opacity-70" />
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="border-zinc-200 bg-white">
              <Sparkles className="mr-1 h-3.5 w-3.5" /> Full-service concierge travel
            </Badge>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Luxury travel planning — <span className="underline underline-offset-8">without</span> the stress.
            </h1>

            <p className="mt-4 text-zinc-600">
              All-inclusive getaways, luxury cruises, and destinations worldwide. Tell us what you want — we handle every logistical detail.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#contact">
                <Button className="w-full sm:w-auto">
                  {BRAND.cta} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
              <a href="#packages">
                <Button variant="outline" className="w-full sm:w-auto">
                  Browse packages
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            <Card className="overflow-hidden">
              <div className="border-b p-5">
                <div className="text-lg font-semibold">Concierge planning includes</div>
                <div className="mt-1 text-sm text-zinc-600">
                  Flights, hotels/resorts, transfers, excursions, special requests.
                </div>
              </div>
              <div className="p-5">
                <div className="grid gap-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-zinc-200 p-3">
                      <div className="text-xs text-zinc-500">Travel dates</div>
                      <div className="mt-1 flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4" /> Flexible or fixed
                      </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 p-3">
                      <div className="text-xs text-zinc-500">Budget</div>
                      <div className="mt-1 text-sm">Value • Mid • Luxury</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 p-4">
                    <div className="text-sm font-medium">How we work</div>
                    <ul className="mt-2 space-y-2 text-sm text-zinc-600">
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4" /> 2–3 itinerary options
                      </li>
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4" /> Transparent pricing & tradeoffs
                      </li>
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4" /> Support before and during travel
                      </li>
                    </ul>
                  </div>

                  <a href="#contact">
                    <Button className="w-full">
                      Start a request <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </a>

                  <div className="text-xs text-zinc-500">
                    Planning is $0 when you book with us. After 2+ consultations without booking, a $50 planning fee applies to continue custom planning.
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Popular starting points</h2>
            <p className="mt-1 text-zinc-600">Customize dates, destinations, hotels, room types, and pacing.</p>
          </div>
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input className="pl-9" placeholder="Search packages…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredDestinations.map((d) => {
            const Icon = d.icon;
            return (
              <motion.div key={d.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 }}>
                <Card className="h-full">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-100">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{d.title}</div>
                          <div className="text-sm text-zinc-600">{d.subtitle}</div>
                        </div>
                      </div>
                      <Badge>From {formatUSD(d.priceFrom)}</Badge>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge className="bg-white">{d.duration}</Badge>
                      {d.highlights.map((h) => (
                        <Badge key={h} className="bg-white">{h}</Badge>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-zinc-600">Want this but different? We’ll tailor it.</div>
                      <a href="#contact">
                        <Button variant="outline" className="w-full sm:w-auto">
                          Request this trip <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t bg-zinc-50/60">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <Card key={f.q}>
                <div className="p-6">
                  <div className="text-base font-semibold">{f.q}</div>
                  <div className="mt-2 text-sm text-zinc-600">{f.a}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Request a trip</h2>
            <p className="mt-2 text-zinc-600">Fill this out and we’ll respond with next steps.</p>

            <div className="mt-6 grid gap-3">
              <Card><div className="p-6"><div className="flex items-center gap-2 text-sm font-medium"><Phone className="h-4 w-4" /> Call or text</div><div className="mt-2 text-sm text-zinc-600">{BRAND.phone}</div></div></Card>
              <Card><div className="p-6"><div className="flex items-center gap-2 text-sm font-medium"><Mail className="h-4 w-4" /> Email</div><div className="mt-2 text-sm text-zinc-600">{BRAND.email}</div></div></Card>
              <Card><div className="p-6"><div className="flex items-center gap-2 text-sm font-medium"><MapPin className="h-4 w-4" /> Location</div><div className="mt-2 text-sm text-zinc-600">{BRAND.location}</div></div></Card>
            </div>
          </div>

          <Card>
            <div className="border-b p-5">
              <div className="text-lg font-semibold">Trip request form</div>
              <div className="mt-1 text-sm text-zinc-600">Next step: connect this to email (Formspree).</div>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="rounded-2xl border border-zinc-200 p-5">
                  <div className="text-base font-semibold">Request received ✅</div>
                  <div className="mt-2 text-sm text-zinc-600">
                    Right now this demo logs to the console. Next step: connect to Formspree so requests go to your email.
                  </div>
                  <div className="mt-4">
                    <Button onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", budget:"", dates:"", details:"" }); }}>
                      Submit another
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input placeholder="Your name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} required />
                    <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} required />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
                    <Input placeholder="Budget (per person)" value={form.budget} onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))} />
                  </div>

                  <Input placeholder="Target dates (e.g., March 10–17)" value={form.dates} onChange={(e) => setForm((s) => ({ ...s, dates: e.target.value }))} />

                  <Textarea className="min-h-[120px]" placeholder="Where do you want to go? Must-dos, travel style, number of travelers, room preferences…"
                    value={form.details} onChange={(e) => setForm((s) => ({ ...s, details: e.target.value }))} required />

                  <Button type="submit">Send request <ChevronRight className="ml-1 h-4 w-4" /></Button>
                </form>
              )}
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-600">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
