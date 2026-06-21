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
    <section className="pulso-hero-bg relative overflow-hidden px-6 pt-36 md:pt-44 flex items-center" style={{ minHeight: "100vh" }}>
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
  const deliverables = [
    "Estudio de mercado",
    "Análisis del servicio",
    "Estrategia de marketing",
    "Estrategia de comunicación",
    "Plan de acción",
  ];
  const phases = [
    { label: "Fase 1", color: "#D4A017", bg: "rgba(212,160,23,0.12)", left: 0, width: 30 },
    { label: "Fase 2", color: "#3B82F6", bg: "rgba(59,130,246,0.12)", left: 33, width: 33 },
    { label: "Fase 3", color: "#22C55E", bg: "rgba(34,197,94,0.12)", left: 69, width: 31 },
  ];
  const tracks = [
    { label: "Investigación de mercado", left: 1, width: 26, color: "#D4A017", bar: "rgba(212,160,23,0.45)" },
    { label: "Definición de propuesta", left: 6, width: 22, color: "#D4A017", bar: "rgba(212,160,23,0.35)" },
    { label: "Mensajes y narrativa", left: 30, width: 24, color: "#3B82F6", bar: "rgba(59,130,246,0.45)" },
    { label: "Landing + activos digitales", left: 36, width: 28, color: "#3B82F6", bar: "rgba(59,130,246,0.35)" },
    { label: "Configuración de canales", left: 42, width: 20, color: "#3B82F6", bar: "rgba(59,130,246,0.28)" },
    { label: "Lanzamiento de campañas", left: 66, width: 26, color: "#22C55E", bar: "rgba(34,197,94,0.45)" },
    { label: "Automatización CRM + bot", left: 71, width: 24, color: "#22C55E", bar: "rgba(34,197,94,0.35)" },
    { label: "Medición y optimización", left: 78, width: 20, color: "#22C55E", bar: "rgba(34,197,94,0.28)" },
  ];
  const nodes = [
    { left: 4, top: 6, color: "#EF4444" },
    { left: 27, top: 24, color: "#D4A017" },
    { left: 38, top: 6, color: "#3B82F6" },
    { left: 55, top: 41, color: "#22C55E" },
    { left: 69, top: 24, color: "#EF4444" },
    { left: 84, top: 6, color: "#D4A017" },
    { left: 92, top: 58, color: "#22C55E" },
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

          <div className="rounded-lg p-3 bg-white mb-3" style={{ border: "1px solid #F1F5F9" }}>
            <div className="flex items-center gap-2 mb-2.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span className="text-[10px] font-bold text-[#0F172A]">Entregables</span>
            </div>
            <div className="space-y-1.5">
              {deliverables.map((item, i) => (
                <div key={item} className={`mockup-slide-in${inView ? " active" : ""} flex items-center gap-2.5`} style={{ transitionDelay: `${600 + i * 280}ms` }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,160,23,0.12)" }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0F172A]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 my-3">
            <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
            <span className="text-[8px] font-semibold uppercase tracking-wider text-[#94A3B8]">Hoja de ruta</span>
            <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
          </div>

          <div className={`mockup-fade-in${inView ? " active" : ""} rounded-lg bg-white overflow-hidden`} style={{ border: "1px solid #F1F5F9", transitionDelay: "2200ms" }}>
            <div className="flex items-center gap-2 px-3 pt-2.5 pb-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              <span className="text-[10px] font-bold text-[#0F172A]">Cronograma estratégico</span>
              <span className="ml-auto text-[7px] font-medium text-[#94A3B8]">12 semanas</span>
            </div>
            <div className="overflow-x-auto">
              <div style={{ minWidth: 520, position: "relative", padding: "6px 8px 10px" }}>
                <div style={{ position: "relative", display: "flex", gap: 4, marginBottom: 8 }}>
                  {phases.map((p, i) => (
                    <div
                      key={p.label}
                      className={`mockup-slide-in${inView ? " active" : ""}`}
                      style={{
                        width: `${p.width}%`,
                        transitionDelay: `${2400 + i * 200}ms`,
                        background: p.bg,
                        border: `1px solid ${p.color}`,
                        borderRadius: 5,
                        padding: "3px 6px",
                      }}
                    >
                      <span className="font-bold" style={{ fontSize: 8, color: p.color }}>{p.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ position: "relative", height: 96 }}>
                  {[0, 1, 2, 3, 4].map((g) => (
                    <div key={g} style={{ position: "absolute", left: `${g * 25}%`, top: 0, bottom: 0, width: 1, background: "#F1F5F9" }} />
                  ))}

                  {tracks.map((t, i) => (
                    <div key={t.label} style={{ position: "absolute", top: i * 12, left: `${t.left}%`, width: `${t.width}%`, height: 8 }}>
                      <div
                        className="mockup-bar-grow"
                        style={{
                          height: 8,
                          borderRadius: 3,
                          background: t.bar,
                          borderLeft: `2px solid ${t.color}`,
                          width: inView ? "100%" : "0%",
                          transitionDelay: `${2800 + i * 120}ms`,
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: 4,
                          overflow: "hidden",
                        }}
                      >
                        <span style={{ fontSize: 6, lineHeight: 1, color: t.color, whiteSpace: "nowrap", fontWeight: 600 }}>{t.label}</span>
                      </div>
                    </div>
                  ))}

                  {nodes.map((n, i) => (
                    <div
                      key={i}
                      className={`mockup-fade-in${inView ? " active" : ""}`}
                      style={{
                        position: "absolute",
                        left: `${n.left}%`,
                        top: `${n.top}px`,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: n.color,
                        boxShadow: `0 0 0 2px white, 0 0 0 3px ${n.color}55`,
                        transitionDelay: `${3400 + i * 90}ms`,
                      }}
                    />
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  {["S1", "S3", "S6", "S9", "S12"].map((w) => (
                    <span key={w} style={{ fontSize: 6, color: "#CBD5E1", fontWeight: 600 }}>{w}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}

function ProcesoFrame({ step, label, color, children, inView, delay }: { step: number; label: string; color: string; children: React.ReactNode; inView: boolean; delay: number }) {
  return (
    <div className={`mockup-fade-in${inView ? " active" : ""} rounded-2xl overflow-hidden flex flex-col`} style={{ background: "#0a0a0a", boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)", transitionDelay: `${delay}ms` }}>
      <div className="flex items-center gap-2.5 px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-extrabold flex-shrink-0" style={{ background: color, color: "#000000" }}>{step}</div>
        <span className="text-[13px] font-bold tracking-tight text-white">{label}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="block h-[7px] w-[7px] rounded-full bg-[#FF5F57]" />
          <span className="block h-[7px] w-[7px] rounded-full bg-[#FEBC2E]" />
          <span className="block h-[7px] w-[7px] rounded-full bg-[#28C840]" />
        </div>
      </div>
      <div className="flex-1 p-3" style={{ background: "#F8FAFC" }}>{children}</div>
    </div>
  );
}

function FlowArrow({ direction }: { direction: "right" | "down" }) {
  const isRight = direction === "right";
  return (
    <div className={`flex items-center justify-center ${isRight ? "px-1" : "py-1"}`}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 2px 4px rgba(212,160,23,0.25))" }}>
        {isRight ? <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></> : <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="6 13 12 19 18 13" /></>}
      </svg>
    </div>
  );
}

function SistemaComercialMockup() {
  const { ref, inView } = useInView(0.3);
  const kanbanColumns = [
    { title: "Nuevo", color: "#94A3B8", cards: [{ name: "María G.", tag: "Salud Visa", time: "hace 2m" }] },
    { title: "Contactado", color: "#0EA5E9", cards: [{ name: "Pedro M.", tag: "RC Médica", time: "hace 18m" }] },
    { title: "Calificado", color: "#D4A017", cards: [{ name: "Lucía F.", tag: "Salud Visa", time: "hoy" }] },
    { title: "Cerrado", color: "#22C55E", cards: [{ name: "Carlos R.", tag: "Salud Visa", time: "ayer" }] },
  ];
  const chart = [
    { label: "L", pct: 35 },
    { label: "M", pct: 48 },
    { label: "X", pct: 42 },
    { label: "J", pct: 64 },
    { label: "V", pct: 72 },
    { label: "S", pct: 88 },
    { label: "D", pct: 96 },
  ];
  return (
    <div ref={ref} className="pulso-fade-up w-full max-w-4xl mx-auto" style={{ transitionDelay: "200ms" }}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:grid-rows-[auto_auto_auto] items-stretch gap-0">
        <div className="md:col-start-1 md:row-start-1">
          <ProcesoFrame step={1} label="Anuncio" color="#D4A017" inView={inView} delay={400}>
            <div className="rounded-lg bg-white p-3 h-full flex flex-col" style={{ border: "1px solid #E2E8F0" }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "#E8F0FE", color: "#1A73E8" }}>Anuncio</span>
                <span className="text-[10px] text-[#202124]">altafe.eu</span>
              </div>
              <div className="text-[13px] font-bold leading-snug mb-1" style={{ color: "#1A0DAB" }}>Seguro de Salud para Expatriados</div>
              <div className="text-[10px] leading-relaxed text-[#4D5156] mb-3">Cobertura internacional desde el primer día. Atención en español y asesor dedicado para tu trámite de visa.</div>
              <button className="mt-auto self-start rounded-full px-3 py-1.5 text-[10px] font-bold text-white" style={{ background: "#1A73E8" }}>Visitar sitio</button>
            </div>
          </ProcesoFrame>
        </div>

        <div className="hidden md:flex md:col-start-2 md:row-start-1 items-center">
          <FlowArrow direction="right" />
        </div>
        <div className="flex md:hidden justify-center"><FlowArrow direction="down" /></div>

        <div className="md:col-start-3 md:row-start-1">
          <ProcesoFrame step={2} label="Bot de WhatsApp con IA" color="#25D366" inView={inView} delay={700}>
            <div className="rounded-lg overflow-hidden h-full flex flex-col" style={{ border: "1px solid #E2E8F0" }}>
              <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#075E54" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#25D366" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1H3v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM4 16h16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"/></svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-none">Alta Fe</div>
                  <div className="text-[8px] text-[#A7D8C9] leading-none mt-0.5">en línea</div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5 p-2.5" style={{ background: "#ECE5DD" }}>
                <div className="self-end max-w-[85%] rounded-lg rounded-tr-none px-2.5 py-1.5 text-[10px] leading-snug" style={{ background: "#DCF8C6", color: "#0F172A" }}>Hola, vi el anuncio y quiero información</div>
                <div className="self-start max-w-[85%] rounded-lg rounded-tl-none px-2.5 py-1.5 text-[10px] leading-snug bg-white" style={{ color: "#0F172A" }}>¡Hola! Soy el asistente de Alta Fe. ¿En qué país resides actualmente?</div>
                <div className="self-end max-w-[85%] rounded-lg rounded-tr-none px-2.5 py-1.5 text-[10px] leading-snug" style={{ background: "#DCF8C6", color: "#0F172A" }}>España</div>
              </div>
            </div>
          </ProcesoFrame>
        </div>

        <div className="hidden md:flex md:col-start-1 md:col-span-3 md:row-start-2 justify-center">
          <FlowArrow direction="down" />
        </div>
        <div className="flex md:hidden justify-center"><FlowArrow direction="down" /></div>

        <div className="md:col-start-1 md:row-start-3">
          <ProcesoFrame step={3} label="Pipeline CRM" color="#D4A017" inView={inView} delay={1000}>
            <div className="grid grid-cols-4 gap-1.5 h-full">
              {kanbanColumns.map((col) => (
                <div key={col.title} className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="block h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: col.color }} />
                    <span className="text-[7px] font-bold uppercase tracking-wide truncate" style={{ color: col.color }}>{col.title}</span>
                  </div>
                  {col.cards.map((card) => (
                    <div key={card.name} className="rounded-md bg-white p-1.5" style={{ border: "1px solid #E2E8F0", borderLeft: `2px solid ${col.color}` }}>
                      <div className="text-[8px] font-bold text-[#0F172A] truncate">{card.name}</div>
                      <div className="mt-0.5 inline-block rounded px-1 py-0.5 text-[6px] font-semibold" style={{ background: "rgba(212,160,23,0.12)", color: "#D4A017" }}>{card.tag}</div>
                      <div className="text-[7px] text-[#94A3B8] mt-0.5">{card.time}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ProcesoFrame>
        </div>

        <div className="hidden md:flex md:col-start-2 md:row-start-3 items-center">
          <FlowArrow direction="right" />
        </div>
        <div className="flex md:hidden justify-center"><FlowArrow direction="down" /></div>

        <div className="md:col-start-3 md:row-start-3">
          <ProcesoFrame step={4} label="Dashboard de resultados" color="#D4A017" inView={inView} delay={1300}>
            <div className="rounded-lg bg-white p-3 h-full flex flex-col" style={{ border: "1px solid #E2E8F0" }}>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="text-base font-extrabold text-[#0F172A]"><MockupNumber value={128} inView={inView} delay={1500} /></div>
                  <div className="text-[7px] font-semibold uppercase tracking-wide text-[#94A3B8]">Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-extrabold text-[#22C55E]"><MockupNumber value={34} inView={inView} delay={1700} /></div>
                  <div className="text-[7px] font-semibold uppercase tracking-wide text-[#94A3B8]">Conversiones</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-extrabold text-[#D4A017]">{inView ? "4.2x" : "0x"}</div>
                  <div className="text-[7px] font-semibold uppercase tracking-wide text-[#94A3B8]">ROAS</div>
                </div>
              </div>
              <div className="mt-auto flex items-end justify-between gap-1.5" style={{ height: 56 }}>
                {chart.map((bar, i) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                    <div className="w-full rounded-t mockup-bar-grow" style={{ background: "linear-gradient(180deg, #E8B923, #D4A017)", height: inView ? `${bar.pct}%` : "0%", transitionDelay: `${1500 + i * 80}ms` }} />
                    <span className="text-[7px] font-semibold text-[#94A3B8]">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ProcesoFrame>
        </div>
      </div>
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
    <section id="superpoderes" className="px-6 py-20 md:py-28" style={{ background: "#FFFFFF" }}>
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
    <section id="resultados" className="px-6 py-20 md:py-28" ref={sectionRef} style={{ background: "#FFFFFF" }}>
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
