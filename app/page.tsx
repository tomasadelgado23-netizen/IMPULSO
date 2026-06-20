"use client";

import { useEffect, useRef, useState } from "react";

function LightbulbIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
    </svg>
  );
}



function useAnimatedCounter(end: number, duration: number, shouldStart: boolean, suffix: string = "", prefix: string = "") {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!shouldStart) return;
    const startTime = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [shouldStart, end, duration, suffix, prefix]);

  return display;
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function MockupNumber({ value, suffix = "", prefix = "", inView, delay = 700 }: { value: number; suffix?: string; prefix?: string; inView: boolean; delay?: number }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);
  const display = useAnimatedCounter(value, 1200, started, suffix, prefix);
  return <>{started ? display : `${prefix}0${suffix}`}</>;
}

function AnimatedStatValue({ value, isVisible }: { value: string; isVisible: boolean }) {
  const isCounter = /^\+?\d+%?$/.test(value.replace(/\s/g, ""));

  const numMatch = value.match(/(\+?)(\d+)(%?)/);
  const prefix = numMatch ? numMatch[1] : "";
  const num = numMatch ? parseInt(numMatch[2], 10) : 0;
  const suffix = numMatch ? numMatch[3] : "";

  const display = useAnimatedCounter(num, 1500, isVisible && isCounter, suffix, prefix);

  if (!isCounter) {
    return <span className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>{value}</span>;
  }

  return <span>{isVisible ? display : `${prefix}0${suffix}`}</span>;
}

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex justify-center py-1">
      <div
        className="h-[2px] rounded-full"
        style={{
          maxWidth: 400,
          width: "100%",
          background: "linear-gradient(90deg, transparent, #D4A017, transparent)",
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}

const SUPERPOWERS = [
  {
    icon: <LightbulbIcon />,
    title: "Diagnóstico",
    subtitle: "Analizamos la situación actual de tu empresa: ecosistema digital, procesos internos, cómo llegan los clientes, objetivos y dolores.",
    bullets: [
      "Ecosistema digital completo",
      "Procesos comerciales internos",
      "Canales de captación actuales",
      "Objetivos y puntos de dolor",
    ],
  },
  {
    icon: <RocketIcon />,
    title: "Estrategia de Marketing",
    subtitle: "Estudio de mercado, competencia, análisis del negocio y del cliente ideal. La estrategia nos da dos cosas: una forma clara de comunicar y un plan de acción concreto.",
    bullets: [
      "Qué decir y cómo decirlo",
      "A quién dirigirse",
      "Plan de acción con acciones concretas",
      "Alineado a los recursos y objetivos reales",
    ],
  },
  {
    icon: <ChatIcon />,
    title: "Sistema Comercial potenciado con IA",
    subtitle: "Ejecutamos el plan con un sistema comercial automatizado y personalizado al 100%.",
    bullets: [
      "Ecosistema de marketing ordenado con comunicación profesional",
      "Anuncios en Google y Meta con landing y SEO",
      "IA que cualifica leads y los entrega al comercial",
      "CRM con IA para optimizar el embudo",
      "Panel de control con inversión, leads y resultados",
      "Retroalimentación automática que optimiza los anuncios",
    ],
  },
];

const STATS = [
  { value: "30+", label: "Años de experiencia" },
  { value: "+500", label: "Empresas atendidas" },
  { value: "24/7", label: "Sistema comercial activo" },
];


export default function PulsoPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pulso-visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".pulso-fade-up");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .pulso-fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pulso-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes pulso-hero-fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pulso-hero-headline {
          opacity: 0;
          animation: pulso-hero-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0s;
        }
        .pulso-hero-subtitle {
          opacity: 0;
          animation: pulso-hero-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.2s;
        }
        .pulso-hero-button {
          opacity: 0;
          animation: pulso-hero-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.4s;
        }
        .pulso-hero-mockup {
          opacity: 0;
          animation: pulso-hero-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.6s;
        }

        .pulso-stat-card {
          position: relative;
          overflow: hidden;
        }
        .pulso-stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #B8860B, #E8B923, #F5D547);
        }


        @keyframes pulso-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .pulso-hero-bg {
          background: linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #191919 50%, #0a0a0a 75%, #000000 100%);
          background-size: 300% 300%;
          animation: pulso-gradient-shift 8s ease infinite;
        }

        .pulso-gradient-text {
          background: linear-gradient(135deg, #E8B923 0%, #F5D547 50%, #D4A017 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mockup-slide-in {
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .mockup-slide-in.active {
          opacity: 1;
          transform: translateX(0);
        }

        .mockup-fade-in {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .mockup-fade-in.active {
          opacity: 1;
        }

        .mockup-feed-item {
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .mockup-feed-item.active {
          opacity: 1;
          transform: translateY(0);
        }

        .mockup-bar-grow {
          transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes cursor-strategy {
          0% { top: 50%; left: 50%; opacity: 0; transform: scale(1); }
          3% { top: 50%; left: 50%; opacity: 1; transform: scale(1); }
          15% { top: 38%; left: 72%; transform: scale(1); }
          20% { top: 38%; left: 72%; transform: scale(1); }
          35% { top: 62%; left: 30%; transform: scale(1); }
          40% { top: 62%; left: 30%; transform: scale(1); }
          42% { top: 68%; left: 35%; transform: scale(0.85); }
          44% { top: 68%; left: 35%; transform: scale(1); }
          50% { top: 68%; left: 35%; transform: scale(1); }
          65% { top: 88%; left: 45%; transform: scale(1); }
          75% { top: 88%; left: 45%; transform: scale(1); }
          95% { top: 88%; left: 45%; opacity: 1; transform: scale(1); }
          100% { top: 88%; left: 45%; opacity: 0; transform: scale(1); }
        }

        @keyframes cursor-ads {
          0% { top: 8%; left: 25%; opacity: 0; transform: scale(1); }
          3% { top: 8%; left: 25%; opacity: 1; transform: scale(1); }
          12% { top: 8%; left: 55%; transform: scale(1); }
          14% { top: 8%; left: 55%; transform: scale(0.85); }
          16% { top: 8%; left: 55%; transform: scale(1); }
          22% { top: 8%; left: 55%; transform: scale(1); }
          40% { top: 28%; left: 75%; transform: scale(1); }
          50% { top: 28%; left: 75%; transform: scale(1); }
          65% { top: 35%; left: 80%; transform: scale(1); }
          75% { top: 35%; left: 80%; transform: scale(1); }
          85% { top: 88%; left: 50%; transform: scale(1); }
          95% { top: 88%; left: 50%; opacity: 1; transform: scale(1); }
          100% { top: 88%; left: 50%; opacity: 0; transform: scale(1); }
        }

        @keyframes cursor-crm {
          0% { top: 8%; left: 30%; opacity: 0; transform: scale(1); }
          3% { top: 8%; left: 30%; opacity: 1; transform: scale(1); }
          15% { top: 25%; left: 40%; transform: scale(1); }
          25% { top: 38%; left: 45%; transform: scale(1); }
          35% { top: 50%; left: 35%; transform: scale(1); }
          40% { top: 50%; left: 35%; transform: scale(1); }
          42% { top: 50%; left: 35%; transform: scale(0.85); }
          44% { top: 50%; left: 35%; transform: scale(1); }
          55% { top: 50%; left: 35%; transform: scale(1); }
          75% { top: 85%; left: 55%; transform: scale(1); }
          90% { top: 85%; left: 55%; opacity: 1; transform: scale(1); }
          100% { top: 85%; left: 55%; opacity: 0; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .pulso-fade-up,
          .pulso-hero-headline,
          .pulso-hero-subtitle,
          .pulso-hero-button,
          .pulso-hero-mockup {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
          .pulso-hero-bg {
            animation: none !important;
          }
        }

      `}</style>

      <Header />
      <main>
        <HeroSection />
        <SectionDivider />
        <FeaturesSection />
        <SectionDivider />
        <StatsSection />
        <SectionDivider />
        <section className="px-6 py-20 md:py-28 text-center" style={{ background: "#000000" }}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl" style={{ fontFamily: "var(--font-jakarta)" }}>
              Tu departamento de{" "}
              <span style={{ color: "#E8B923" }}>marketing externo.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Un sistema comercial automatizado potenciado con IA, que se nutre de una estrategia de marketing con investigación de mercado. Nos transformamos en el departamento de marketing de tu empresa.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header
      className="absolute left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none" aria-hidden="true">
            <path d="M7 16L15 6l8 10" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 20L15 10l8 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-white">
            impulso
          </span>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="pulso-hero-bg relative overflow-hidden px-6 pb-28 pt-36 md:pb-36 md:pt-44">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(232,185,35,0.08) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-[1380px]">
        <div className="max-w-3xl">
          <h1 className="pulso-hero-headline text-3xl sm:text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white md:text-7xl">
            Somos un equipo de
            <br />
            marketing completo.
            <br />
            <span className="pulso-gradient-text">
              Potenciado con IA.
            </span>
          </h1>
          <p
            className="pulso-hero-subtitle mt-8 max-w-xl text-lg font-medium leading-relaxed md:text-xl"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Construimos un sistema comercial personalizado que ayuda a captar,
            ordenar y convertir oportunidades reales.
          </p>
        </div>

        <div className="pulso-hero-mockup mt-16 md:mt-20">
          <div
            className="overflow-hidden rounded-[20px] shadow-2xl"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <div
              className="flex items-center gap-2 px-5 py-3"
              style={{ background: "rgba(0, 0, 0, 0.8)" }}
            >
              <span className="block h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="block h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="block h-3 w-3 rounded-full bg-[#28C840]" />
              <span
                className="ml-4 text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                impulso-dashboard
              </span>
            </div>
            <div
              className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {["Leads", "Conversiones", "ROAS", "Costo/Lead"].map(
                (label, i) => (
                  <div
                    key={label}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <div
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {label}
                    </div>
                    <div className="mt-1 text-2xl font-bold text-white">
                      {["128", "34", "4.2x", "$12"][i]}
                    </div>
                    <div
                      className="mt-1 h-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.5)",
                          width: `${[78, 62, 85, 45][i]}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppFrame({ title, activeNav, children }: { title: string; activeNav: number; children: React.ReactNode }) {
  const navIcons = [
    "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6",
    "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z",
    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z",
  ];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#000000" }}>
        <span className="block h-[9px] w-[9px] rounded-full bg-[#FF5F57]" />
        <span className="block h-[9px] w-[9px] rounded-full bg-[#FEBC2E]" />
        <span className="block h-[9px] w-[9px] rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>{title}</span>
      </div>
      <div className="flex" style={{ background: "#F8FAFC" }}>
        <div className="hidden md:flex flex-col py-3 px-1.5 gap-1" style={{ width: 52, background: "#0a0a0a" }}>
          <div className="flex items-center justify-center mb-2 py-1">
            <svg width="16" height="13" viewBox="0 0 30 24" fill="none">
              <path d="M7 16L15 6l8 10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 20L15 10l8 10" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {navIcons.map((d, i) => (
            <div key={i} className="flex items-center justify-center rounded-lg py-2" style={{ background: i === activeNav ? "rgba(232,185,35,0.16)" : "transparent" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={i === activeNav ? "#E8B923" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

function MockupCursor({ animationName, duration, delay = 1.5, isVisible }: { animationName: string; duration: number; delay?: number; isVisible: boolean }) {
  if (!isVisible) return null;
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 50,
        animation: `${animationName} ${duration}s ease-in-out ${delay}s infinite`,
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      <svg width="18" height="22" viewBox="0 0 17 22" fill="none">
        <path d="M1.42 1.775v17.78l4.89-4.89h7.27L1.42.595v1.18z" fill="black"/>
        <path d="M1.42 1.775v17.78l4.89-4.89h7.27L1.42.595v1.18z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function DiagnosticoMockup() {
  const { ref, inView } = useInView(0.3);
  const auditItems = [
    { label: "Ecosistema digital", status: "warning", detail: "Web sin SEO" },
    { label: "Procesos internos", status: "danger", detail: "Sin CRM" },
    { label: "Canales de captación", status: "warning", detail: "Solo boca a boca" },
    { label: "Objetivos comerciales", status: "success", detail: "Claros" },
    { label: "Puntos de dolor", status: "danger", detail: "3 detectados" },
  ];
  const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
    success: { bg: "#F0FDF4", text: "#22C55E", icon: "check" },
    warning: { bg: "#FFF7ED", text: "#F59E0B", icon: "warn" },
    danger: { bg: "#FEF2F2", text: "#EF4444", icon: "x" },
  };
  return (
    <div ref={ref} className="pulso-fade-up w-full max-w-xl mx-auto" style={{ transitionDelay: "200ms" }}>
      <AppFrame title="impulso — Diagnóstico" activeNav={1}>
        <div className="p-4" style={{ position: "relative" }}>
          <MockupCursor animationName="cursor-strategy" duration={7} isVisible={inView} />
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">Tu Negocio S.L.</h4>
              <span className="text-[10px] text-[#94A3B8]">Auditoría inicial</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#92400E]">En análisis</span>
          </div>
          <div className="rounded-lg bg-white mb-3" style={{ border: "1px solid #F1F5F9" }}>
            <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: "1px solid #F1F5F9" }}>
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span className="text-[10px] font-bold text-[#0F172A]">Checklist de auditoría</span>
              </div>
              <span className={`mockup-fade-in${inView ? " active" : ""} text-[9px] font-medium text-[#D4A017]`} style={{ transitionDelay: "2800ms" }}>{inView ? "5/5 analizado" : ""}</span>
            </div>
            <div className="divide-y divide-[#F8FAFC]">
              {auditItems.map((item, i) => {
                const s = statusColors[item.status];
                return (
                  <div key={item.label} className={`mockup-slide-in${inView ? " active" : ""} px-3 py-2 flex items-center gap-2.5`} style={{ transitionDelay: `${800 + i * 350}ms` }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                      {s.icon === "check" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={s.text} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      {s.icon === "warn" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={s.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                      {s.icon === "x" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={s.text} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold text-[#0F172A]">{item.label}</span>
                    </div>
                    <span className="text-[9px] font-medium flex-shrink-0" style={{ color: s.text }}>{item.detail}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg p-3 mb-2`} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", transitionDelay: "2800ms" }}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <span className="text-[10px] font-bold text-[#0F172A]">Salud general</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full" style={{ background: "#E2E8F0" }}>
                <div className="h-full rounded-full mockup-bar-grow" style={{ background: "linear-gradient(90deg, #EF4444, #F59E0B)", width: inView ? "42%" : "0%" }} />
              </div>
              <span className="text-xs font-extrabold text-[#F59E0B]">{inView ? "4.2/10" : ""}</span>
            </div>
          </div>
          <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg px-3 py-2 flex items-center gap-2`} style={{ background: "#191919", border: "1px solid #2A2A2A", transitionDelay: "3200ms" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span className="text-[10px] font-medium text-[#E8B923]">2 áreas críticas · 2 mejorables · 1 sólida</span>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}

function EstrategiaMockup() {
  const { ref, inView } = useInView(0.3);
  const actionItems = [
    { action: "Landing optimizada + SEO local", priority: "Alta", color: "#EF4444" },
    { action: "Google Ads — campaña de búsqueda", priority: "Alta", color: "#EF4444" },
    { action: "Meta Ads — Instagram + Facebook", priority: "Media", color: "#F59E0B" },
    { action: "Bot WhatsApp + CRM automatizado", priority: "Media", color: "#F59E0B" },
  ];
  const channels = [
    { name: "Google Ads", pct: 40 },
    { name: "Meta Ads", pct: 30 },
    { name: "SEO", pct: 20 },
    { name: "Email", pct: 10 },
  ];
  return (
    <div ref={ref} className="pulso-fade-up w-full max-w-xl mx-auto" style={{ transitionDelay: "200ms" }}>
      <AppFrame title="impulso — Estrategia" activeNav={2}>
        <div className="p-4" style={{ position: "relative" }}>
          <MockupCursor animationName="cursor-ads" duration={7} isVisible={inView} />
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">Plan Estratégico</h4>
              <span className="text-[10px] text-[#94A3B8]">Tu Negocio S.L.</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534]">Aprobado</span>
          </div>
          <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg p-3 bg-white mb-3`} style={{ border: "1px solid #F1F5F9", transitionDelay: "700ms" }}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="text-[10px] font-bold text-[#0F172A]">Público objetivo</span>
            </div>
            <div className="flex items-center gap-2 rounded px-2 py-1.5" style={{ background: "#F8FAFC" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,160,23,0.12)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-[#0F172A]">Empresario 35-55 años</div>
                <div className="text-[9px] text-[#94A3B8]">Valencia · Factura 200K-2M · Busca crecer online</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg p-3 bg-white mb-3" style={{ border: "1px solid #F1F5F9" }}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span className="text-[10px] font-bold text-[#0F172A]">Plan de acción</span>
            </div>
            <div className="space-y-1.5">
              {actionItems.map((item, i) => (
                <div key={item.action} className={`mockup-slide-in${inView ? " active" : ""} flex items-center justify-between rounded px-2 py-1.5 gap-2`} style={{ background: "#F8FAFC", transitionDelay: `${1100 + i * 250}ms` }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-[10px] text-[#0F172A] truncate">{item.action}</span>
                  </div>
                  <span className="text-[9px] font-medium flex-shrink-0" style={{ color: item.color }}>{item.priority}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg p-3 bg-white mb-3`} style={{ border: "1px solid #F1F5F9", transitionDelay: "2200ms" }}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              <span className="text-[10px] font-bold text-[#0F172A]">Distribución de canales</span>
            </div>
            <div className="space-y-1.5">
              {channels.map((ch, i) => (
                <div key={ch.name} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#94A3B8] w-16 flex-shrink-0">{ch.name}</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "#E2E8F0" }}>
                    <div className="h-full rounded-full mockup-bar-grow" style={{ background: i === 0 ? "#D4A017" : i === 1 ? "#E8B923" : i === 2 ? "#22C55E" : "#94A3B8", width: inView ? `${ch.pct}%` : "0%" }} />
                  </div>
                  <span className="text-[9px] font-semibold text-[#0F172A] w-6 text-right">{ch.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg px-3 py-2 flex items-center gap-2`} style={{ background: "#191919", border: "1px solid #2A2A2A", transitionDelay: "2600ms" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8B923" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span className="text-[10px] font-medium text-[#E8B923] truncate">Mensaje clave: "Resultados medibles desde el primer mes"</span>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}

function SistemaComercialMockup() {
  const { ref, inView } = useInView(0.3);
  const funnelSteps = [
    { label: "Anuncios", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
    { label: "IA", icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.591.659H9.061a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v9.5" },
    { label: "CRM", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Panel", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6" },
  ];
  const feedEvents = [
    { icon: "lead", text: "Nuevo lead desde Google Ads", detail: "Búsqueda orgánica · asignado", time: "14:32", color: "#D4A017" },
    { icon: "bot", text: "IA cualificó lead", detail: "María G. · Salud Visa · derivó a asesor", time: "14:28", color: "#25D366" },
    { icon: "calendar", text: "Reunión agendada", detail: "Pedro M. · mañana 10:00", time: "14:15", color: "#0EA5E9" },
    { icon: "check", text: "Lead cerrado ganado", detail: "Carlos R. · Salud Visa · firmó póliza", time: "13:58", color: "#22C55E" },
    { icon: "bot", text: "IA atendió consulta fuera de horario", detail: "Pregunta sobre cobertura dental", time: "02:14", color: "#25D366" },
  ];
  return (
    <div ref={ref} className="pulso-fade-up w-full max-w-xl mx-auto" style={{ transitionDelay: "200ms" }}>
      <AppFrame title="impulso — Sistema Comercial" activeNav={3}>
        <div className="p-3" style={{ position: "relative" }}>
          <MockupCursor animationName="cursor-crm" duration={7} isVisible={inView} />
          <div className={`mockup-fade-in${inView ? " active" : ""} flex items-center justify-between mb-3 rounded-lg px-3 py-2`} style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", transitionDelay: "700ms" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[10px] font-bold text-[#166534]">Sistema activo 24/7</span>
            </div>
            <div className="flex items-center gap-1">
              {funnelSteps.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={step.icon}/></svg>
                    <span className="text-[6px] font-semibold text-[#D4A017]">{step.label}</span>
                  </div>
                  {i < funnelSteps.length - 1 && <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-0.5"><polyline points="9 18 15 12 9 6"/></svg>}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white mb-3" style={{ border: "1px solid #F1F5F9" }}>
            <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: "1px solid #F1F5F9" }}>
              <span className="text-[10px] font-bold text-[#0F172A]">Feed en vivo</span>
              <span className="text-[8px] font-medium text-[#94A3B8]">HOY</span>
            </div>
            <div className="divide-y divide-[#F8FAFC]">
              {feedEvents.map((event, i) => (
                <div key={event.time} className={`mockup-feed-item${inView ? " active" : ""} px-3 py-2 flex items-start gap-2`} style={{ transitionDelay: `${1000 + i * 400}ms` }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${event.color}15` }}>
                    {event.icon === "bot" && <svg width="10" height="10" viewBox="0 0 24 24" fill={event.color}><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1H3v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM4 16h16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"/></svg>}
                    {event.icon === "lead" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={event.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                    {event.icon === "calendar" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={event.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                    {event.icon === "check" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={event.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-semibold text-[#0F172A]">{event.text}</div>
                    <div className="text-[9px] text-[#94A3B8]">{event.detail}</div>
                  </div>
                  <span className="text-[8px] text-[#CBD5E1] flex-shrink-0">{event.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg p-2 text-center`} style={{ background: "rgba(212,160,23,0.10)", border: "1px solid rgba(212,160,23,0.30)", transitionDelay: "3000ms" }}>
              <div className="text-lg font-extrabold text-[#D4A017]"><MockupNumber value={12} inView={inView} delay={3000} /></div>
              <div className="text-[8px] font-semibold text-[#D4A017]">Leads hoy</div>
            </div>
            <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg p-2 text-center`} style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", transitionDelay: "3200ms" }}>
              <div className="text-lg font-extrabold text-[#22C55E]"><MockupNumber value={8} inView={inView} delay={3200} /></div>
              <div className="text-[8px] font-semibold text-[#166534]">Cualificados</div>
            </div>
            <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg p-2 text-center`} style={{ background: "#F0F9FF", border: "1px solid #BAE6FD", transitionDelay: "3400ms" }}>
              <div className="text-lg font-extrabold text-[#0284C7]"><MockupNumber value={3} inView={inView} delay={3400} /></div>
              <div className="text-[8px] font-semibold text-[#075985]">Reuniones</div>
            </div>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}


function SuperpowerSection({ index, icon, title, subtitle, bullets, mockup }: {
  index: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bullets: string[];
  mockup: React.ReactNode;
}) {
  const reversed = index % 2 === 1;
  return (
    <div
      className={`flex flex-col gap-10 md:gap-16 items-center ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}
      style={{ marginTop: index === 0 ? 0 : 48 }}
    >
      <div className="flex-1 pulso-fade-up" style={{ transitionDelay: `${index * 100}ms` }}>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: "rgba(212,160,23,0.12)" }}>
          {icon}
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-[#0F172A] md:text-3xl">{title}</h3>
        <p className="mt-3 text-lg text-[#475569]">{subtitle}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <div className="mt-1.5 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span className="text-base text-[#334155]">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full">
        {mockup}
      </div>
    </div>
  );
}

function FeaturesSection() {
  const mockups = [
    <DiagnosticoMockup key="diagnostico" />,
    <EstrategiaMockup key="estrategia" />,
    <SistemaComercialMockup key="sistema" />,
  ];

  return (
    <section id="superpoderes" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#D4A017]">
            3 etapas
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-4xl">
            Todo lo que necesitas.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#475569]">
            La idea no es hacer acciones sueltas. Es construir un sistema que funcione.
          </p>
        </div>

        <div className="mt-16 md:mt-20">
          {SUPERPOWERS.map((sp, i) => (
            <SuperpowerSection
              key={sp.title}
              index={i}
              icon={sp.icon}
              title={sp.title}
              subtitle={sp.subtitle}
              bullets={sp.bullets}
              mockup={mockups[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="resultados" className="px-6 py-20 md:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-sm font-semibold uppercase tracking-widest text-[#D4A017]"
          >
            Resultados
          </span>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-4xl"
          >
            Números que hablan solos
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.value}
              className="pulso-fade-up pulso-stat-card rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center"
              style={{
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className="text-4xl font-extrabold text-[#D4A017] md:text-5xl"
              >
                <AnimatedStatValue value={s.value} isVisible={isVisible} />
              </div>
              <p
                className="mt-3 text-sm leading-relaxed text-[#475569]"
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function Footer() {
  return (
    <footer
      className="border-t border-t-[#191919] bg-[#000000] px-6 py-8"
    >
      <div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Impulso by Delgado Marketing {new Date().getFullYear()}
          </span>
          <span
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Valencia, España
          </span>
        </div>
        <div className="flex gap-6">
          <a
            href="mailto:hola@delgadomarketing.com"
            className="text-sm transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            hola@delgadomarketing.com
          </a>
        </div>
      </div>
    </footer>
  );
}
