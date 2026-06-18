"use client";

import { useEffect, useRef, useState } from "react";

function LightbulbIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#437AEF"
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
      stroke="#437AEF"
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
      stroke="#437AEF"
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

function ChartIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#437AEF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 17v-4" />
      <path d="M11 17V9" />
      <path d="M15 17v-6" />
      <path d="M19 17v-2" />
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
          background: "linear-gradient(90deg, transparent, #437AEF, transparent)",
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}

const FEATURES = [
  {
    icon: <LightbulbIcon />,
    title: "Estrategia y Marca",
    description:
      "Diagnóstico, brief creativo y research de mercado con IA. Tu marca comunica lo que vale.",
  },
  {
    icon: <RocketIcon />,
    title: "Marketing Digital con IA",
    description:
      "Campañas en Google y Meta, landings optimizadas y SEO continuo. Todo gestionado y medido.",
  },
  {
    icon: <ChatIcon />,
    title: "CRM y Automatización",
    description:
      "Bot de WhatsApp 24/7, pipeline de leads y seguimiento automático. Ningún lead se pierde.",
  },
  {
    icon: <ChartIcon />,
    title: "Panel de Control",
    description:
      "ROAS, conversiones, leads y métricas en tiempo real. Sabes exactamente qué funciona.",
  },
];

const STATS = [
  { value: "98%", label: "de leads atendidos en menos de 2 min" },
  { value: "+40%", label: "conversión con seguimiento automático" },
  { value: "24/7", label: "tu bot vende mientras duermes" },
  { value: "$0", label: "en equipo de marketing adicional" },
];

const STEPS = [
  {
    number: "1",
    title: "Diagnóstico gratuito",
    description:
      "Analizamos tu negocio, competencia y oportunidades digitales sin costo.",
  },
  {
    number: "2",
    title: "Activamos tu plataforma",
    description:
      "Configuramos campañas, CRM, bot y dashboard en menos de una semana.",
  },
  {
    number: "3",
    title: "Resultados desde el día 1",
    description:
      "Leads reales, métricas claras y optimización continua con IA.",
  },
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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

        @keyframes pulso-cta-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(67, 122, 239, 0);
          }
          50% {
            box-shadow: 0 0 20px 4px rgba(67, 122, 239, 0.35);
          }
        }

        .pulso-cta-pulse {
          animation: pulso-cta-glow 3s ease-in-out infinite;
        }

        .pulso-feature-card {
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          border-color: #E2E8F0;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
        }
        .pulso-feature-card:hover {
          box-shadow: 0 12px 32px rgba(67,122,239,0.15), 0 4px 12px rgba(0,0,0,0.06);
          border-color: #437AEF;
          transform: translateY(-4px);
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
          background: linear-gradient(90deg, #798AFF, #437AEF);
        }

        .pulso-steps-grid {
          position: relative;
        }
        @media (min-width: 768px) {
          .pulso-steps-grid::before {
            content: '';
            position: absolute;
            top: 32px;
            left: 20%;
            right: 20%;
            height: 2px;
            background: repeating-linear-gradient(90deg, #CBD5E1 0px, #CBD5E1 8px, transparent 8px, transparent 16px);
            z-index: 0;
          }
        }

        @keyframes pulso-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .pulso-hero-bg {
          background: linear-gradient(135deg, #798AFF 0%, #5268FF 25%, #437AEF 50%, #798AFF 75%, #5268FF 100%);
          background-size: 300% 300%;
          animation: pulso-gradient-shift 8s ease infinite;
        }

        .pulso-gradient-text {
          background: linear-gradient(135deg, #FFFFFF 0%, #C8D9FE 50%, #E0E7FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes pulso-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .pulso-logo-float {
          animation: pulso-float 4s ease-in-out infinite;
        }
      `}</style>

      <Header onNavigate={scrollTo} />
      <main>
        <HeroSection />
        <SectionDivider />
        <FeaturesSection />
        <SectionDivider />
        <PlatformPreview />
        <SectionDivider />
        <StatsSection />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}

function Header({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <header
      className="absolute left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
            <path d="M7 16L15 6l8 10" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 20L15 10l8 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-white">
            impulso
          </span>
        </div>
        <button
          onClick={() => onNavigate("cta-final")}
          className="rounded-[10px] bg-white px-5 py-2.5 text-sm font-bold text-[#437AEF] transition-all hover:shadow-lg hover:shadow-white/20"
        >
          Solicitar Demo
        </button>
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
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(10,28,67,0.15) 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-[1380px]">
        <div className="max-w-3xl">
          <h1 className="pulso-hero-headline text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white md:text-7xl">
            Tu equipo de marketing
            <br />
            completo.
            <br />
            <span className="pulso-gradient-text">
              Potenciado por IA.
            </span>
          </h1>
          <p
            className="pulso-hero-subtitle mt-8 max-w-xl text-lg font-medium leading-relaxed md:text-xl"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Estrategia, campañas, CRM y métricas en una sola plataforma.
            Diseñado para pymes que quieren crecer sin complicarse.
          </p>
          <button className="pulso-hero-button pulso-cta-pulse mt-10 rounded-[10px] bg-white px-8 py-4 text-base font-bold text-[#437AEF] transition-all hover:shadow-lg hover:shadow-white/20">
            Solicitar Demo
          </button>
        </div>

        <div className="pulso-hero-mockup mt-16 md:mt-20">
          <div
            className="overflow-hidden rounded-[20px] shadow-2xl"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <div
              className="flex items-center gap-2 px-5 py-3"
              style={{ background: "rgba(10, 28, 67, 0.6)" }}
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

function FeaturesSection() {
  return (
    <section id="superpoderes" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-sm font-semibold uppercase tracking-widest text-[#437AEF]"
          >
            4 superpoderes
          </span>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-4xl"
          >
            Todo lo que necesitas. Nada que no.
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-[#475569]"
          >
            Cuatro módulos integrados que cubren cada etapa de tu marketing
            digital.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="pulso-fade-up pulso-feature-card group rounded-2xl border bg-white p-8"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: "#E1EAFE" }}
              >
                {f.icon}
              </div>
              <h3
                className="mt-5 text-xl font-bold text-[#0F172A]"
              >
                {f.title}
              </h3>
              <p
                className="mt-3 leading-relaxed text-[#475569]"
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformPreview() {
  return (
    <section
      id="plataforma"
      className="bg-[#F2F6FE] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-sm font-semibold uppercase tracking-widest text-[#437AEF]"
          >
            Plataforma
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight">
            <span className="text-[#0F172A]">
              Del primer mensaje al cierre,
            </span>
            <br />
            <span className="text-[#437AEF]">
              completamente automático.
            </span>
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-[#475569]"
          >
            Todo empieza con una buena conversación.
          </p>
        </div>

        <div className="mt-14">
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            <div className="flex flex-col gap-3">
              <div
                className="pulso-fade-up flex flex-col rounded-2xl p-5"
                style={{ background: "#5A8CF6", transitionDelay: "0ms" }}
              >
                <span className="text-sm font-bold text-white">El Lead Llega</span>
                <span className="mt-1 text-xs font-normal" style={{ color: "rgba(255,255,255,0.75)" }}>Captación</span>
                <div className="mt-auto flex items-center justify-center py-4">
                  <svg width="120" height="120" viewBox="0 0 72 72" fill="none">
                    <rect x="10" y="6" width="52" height="60" rx="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <path d="M10 20h52" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <circle cx="20" cy="13" r="2" fill="rgba(255,255,255,0.5)" />
                    <circle cx="28" cy="13" r="2" fill="rgba(255,255,255,0.5)" />
                    <circle cx="36" cy="13" r="2" fill="rgba(255,255,255,0.5)" />
                    <rect x="18" y="28" width="36" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
                    <rect x="18" y="28" width="24" height="6" rx="3" fill="rgba(255,255,255,0.6)" />
                    <rect x="18" y="40" width="36" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
                    <rect x="18" y="40" width="16" height="6" rx="3" fill="rgba(255,255,255,0.4)" />
                    <rect x="18" y="52" width="36" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
                    <rect x="18" y="52" width="30" height="6" rx="3" fill="rgba(255,255,255,0.5)" />
                  </svg>
                </div>
              </div>
              <div
                className="pulso-fade-up flex flex-col rounded-2xl p-5"
                style={{ background: "#0A1C43", transitionDelay: "120ms" }}
              >
                <span className="text-sm font-bold text-white">La IA Conversa y Vende</span>
                <span className="mt-1 text-xs font-normal" style={{ color: "rgba(255,255,255,0.6)" }}>Conversación</span>
                <div className="mt-auto flex items-center justify-center py-4">
                  <svg width="120" height="120" viewBox="0 0 72 72" fill="none">
                    <rect x="4" y="8" width="38" height="26" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <rect x="12" y="18" width="14" height="2.5" rx="1.25" fill="rgba(255,255,255,0.5)" />
                    <rect x="12" y="24" width="22" height="2.5" rx="1.25" fill="rgba(255,255,255,0.3)" />
                    <path d="M42 28l-8 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <rect x="30" y="38" width="38" height="26" rx="6" fill="rgba(67,122,239,0.25)" stroke="rgba(67,122,239,0.5)" strokeWidth="1.5" />
                    <rect x="38" y="47" width="18" height="2.5" rx="1.25" fill="rgba(255,255,255,0.6)" />
                    <rect x="38" y="53" width="12" height="2.5" rx="1.25" fill="rgba(255,255,255,0.4)" />
                    <circle cx="60" cy="14" r="8" fill="rgba(67,122,239,0.4)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <path d="M57 14l2.5 2.5L63 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div
                className="pulso-fade-up flex flex-col rounded-2xl p-5"
                style={{ background: "#C8D9FE", transitionDelay: "240ms" }}
              >
                <span className="text-sm font-bold text-[#0F172A]">Lead Calificado en 2 min</span>
                <span className="mt-1 text-xs font-normal text-[#475569]">Calificación</span>
                <div className="mt-auto flex items-center justify-center py-4">
                  <svg width="110" height="100" viewBox="0 0 72 64" fill="none">
                    <rect x="6" y="4" width="60" height="56" rx="8" fill="rgba(67,122,239,0.06)" stroke="#437AEF" strokeWidth="1.5" />
                    <rect x="14" y="16" width="20" height="3" rx="1.5" fill="#437AEF" opacity="0.4" />
                    <rect x="14" y="24" width="32" height="3" rx="1.5" fill="#437AEF" opacity="0.2" />
                    <rect x="14" y="36" width="20" height="3" rx="1.5" fill="#437AEF" opacity="0.4" />
                    <rect x="14" y="44" width="28" height="3" rx="1.5" fill="#437AEF" opacity="0.2" />
                    <circle cx="54" cy="44" r="10" fill="#437AEF" opacity="0.15" />
                    <path d="M49 44l3.5 3.5L59 41" stroke="#437AEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div
                className="pulso-fade-up flex flex-col rounded-2xl p-5"
                style={{ background: "#437AEF", transitionDelay: "150ms" }}
              >
                <span className="text-base font-bold text-white">Tu Ecosistema Conectado</span>
                <span className="mt-1 text-xs font-normal" style={{ color: "rgba(255,255,255,0.75)" }}>Centraliza todos tus canales en un solo lugar</span>
                <div className="mt-4 flex items-center justify-center" style={{ height: 180 }}>
                  <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="62" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="5 5" />
                    <circle cx="100" cy="38" r="22" fill="#25D366" />
                    <text x="100" y="44" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">WA</text>
                    <circle cx="162" cy="100" r="22" fill="#4285F4" />
                    <text x="162" y="106" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">G</text>
                    <circle cx="100" cy="162" r="22" fill="#1877F2" />
                    <text x="100" y="168" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">M</text>
                    <circle cx="38" cy="100" r="22" fill="#FF7A59" />
                    <text x="38" y="106" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">CRM</text>
                    <line x1="100" y1="60" x2="100" y2="88" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <line x1="140" y1="100" x2="112" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <line x1="100" y1="140" x2="100" y2="112" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <line x1="60" y1="100" x2="88" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="12" fill="rgba(255,255,255,0.2)" />
                    <circle cx="100" cy="100" r="5" fill="white" />
                  </svg>
                </div>
              </div>
              <div
                className="pulso-fade-up flex flex-1 flex-col justify-center rounded-2xl p-5"
                style={{ background: "#0A1C43", transitionDelay: "270ms" }}
              >
                <span className="text-base font-bold text-white">Todo Medido en Tiempo Real</span>
                <span className="mt-1 text-xs font-normal" style={{ color: "rgba(255,255,255,0.6)" }}>Dashboard con métricas que importan</span>
                <div className="mt-4 flex items-center justify-center" style={{ height: 160 }}>
                  <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
                    <rect x="10" y="10" width="140" height="100" rx="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
                    <line x1="10" y1="30" x2="150" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <circle cx="22" cy="20" r="4" fill="#FF5F57" />
                    <circle cx="34" cy="20" r="4" fill="#FEBC2E" />
                    <circle cx="46" cy="20" r="4" fill="#28C840" />
                    <rect x="22" y="42" width="36" height="24" rx="4" fill="rgba(67,122,239,0.3)" />
                    <text x="40" y="58" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="600">4.2x</text>
                    <rect x="66" y="42" width="36" height="24" rx="4" fill="rgba(67,122,239,0.3)" />
                    <text x="84" y="58" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="600">128</text>
                    <rect x="110" y="42" width="28" height="24" rx="4" fill="rgba(67,122,239,0.3)" />
                    <text x="124" y="58" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="600">$12</text>
                    <polyline points="22,95 50,80 80,88 110,72 138,78" stroke="#437AEF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="50" cy="80" r="3" fill="#437AEF" />
                    <circle cx="80" cy="88" r="3" fill="#437AEF" />
                    <circle cx="110" cy="72" r="3" fill="#437AEF" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div
                className="pulso-fade-up flex flex-col rounded-2xl p-5"
                style={{ background: "#1C4EBA", transitionDelay: "100ms" }}
              >
                <span className="text-sm font-bold text-white">Actualiza tu CRM Solo</span>
                <span className="mt-1 text-xs font-normal" style={{ color: "rgba(255,255,255,0.65)" }}>Sincronización</span>
                <div className="mt-auto flex items-center justify-center py-4">
                  <svg width="120" height="120" viewBox="0 0 72 72" fill="none">
                    <rect x="6" y="14" width="26" height="20" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
                    <rect x="12" y="20" width="14" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
                    <rect x="12" y="26" width="10" height="2" rx="1" fill="rgba(255,255,255,0.25)" />
                    <rect x="40" y="38" width="26" height="20" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
                    <rect x="46" y="44" width="14" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
                    <rect x="46" y="50" width="10" height="2" rx="1" fill="rgba(255,255,255,0.25)" />
                    <path d="M32 30l8 8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M37 38l3-3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M36 35l4 1" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div
                className="pulso-fade-up flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5"
                style={{ transitionDelay: "220ms" }}
              >
                <span className="text-sm font-bold text-[#0F172A]">Reserva la Reunión</span>
                <span className="mt-1 text-xs font-normal text-[#475569]">Agenda</span>
                <div className="mt-auto flex items-center justify-center py-4">
                  <svg width="110" height="100" viewBox="0 0 72 64" fill="none">
                    <circle cx="36" cy="32" r="26" stroke="#437AEF" strokeWidth="1.5" opacity="0.2" />
                    <path d="M36 6v8" stroke="#437AEF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                    <path d="M36 50v8" stroke="#437AEF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                    <circle cx="36" cy="32" r="4" fill="#437AEF" opacity="0.2" />
                    <path d="M36 32l12-8" stroke="#437AEF" strokeWidth="2" strokeLinecap="round" />
                    <path d="M36 32l-6 10" stroke="#437AEF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                    <circle cx="36" cy="32" r="2" fill="#437AEF" />
                  </svg>
                </div>
              </div>
              <div
                className="pulso-fade-up flex flex-col rounded-2xl p-5"
                style={{ background: "#475569", transitionDelay: "340ms" }}
              >
                <span className="text-sm font-bold text-white">Nunca Pierdes un Lead</span>
                <span className="mt-1 text-xs font-normal" style={{ color: "rgba(255,255,255,0.6)" }}>Seguimiento</span>
                <div className="mt-auto flex items-center justify-center py-4">
                  <svg width="110" height="100" viewBox="0 0 72 64" fill="none">
                    <path d="M8 48V20c0-2 1-3 3-3h10c2 0 3 1 3 3v28" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
                    <path d="M24 48V26c0-2 1-3 3-3h10c2 0 3 1 3 3v22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
                    <path d="M40 48V14c0-2 1-3 3-3h10c2 0 3 1 3 3v34" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" />
                    <path d="M56 48V10c0-2 1-3 3-3h4c2 0 3 1 3 3v38" stroke="rgba(67,122,239,0.7)" strokeWidth="1.5" fill="rgba(67,122,239,0.15)" />
                    <line x1="4" y1="48" x2="68" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <path d="M10 36l14-4 14-6 14-10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="52" cy="16" r="2.5" fill="rgba(67,122,239,0.8)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
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
            className="text-sm font-semibold uppercase tracking-widest text-[#437AEF]"
          >
            Resultados
          </span>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-4xl"
          >
            Números que hablan solos
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                className="text-4xl font-extrabold text-[#437AEF] md:text-5xl"
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

function HowItWorks() {
  return (
    <section
      className="bg-[#F1F5F9] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="text-sm font-semibold uppercase tracking-widest text-[#437AEF]"
          >
            Proceso
          </span>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-4xl"
          >
            Tres pasos. Cero complicaciones.
          </h2>
        </div>

        <div className="pulso-steps-grid mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="pulso-fade-up text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-extrabold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #798AFF 0%, #5268FF 100%)",
                }}
              >
                {step.number}
              </div>
              <h3
                className="mt-6 text-xl font-bold text-[#0F172A]"
              >
                {step.title}
              </h3>
              <p
                className="mt-3 leading-relaxed text-[#475569]"
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="bg-[#0A1C43] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px] text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          ¿Listo para potenciar tu negocio?
        </h2>
        <p
          className="mx-auto mt-5 max-w-lg text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Sin compromiso. Te mostramos todo en 15 minutos.
        </p>
        <button className="pulso-cta-pulse mt-10 rounded-[10px] bg-[#437AEF] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#1C4EBA]">
          Agendar una llamada
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="border-t border-t-[#152A54] bg-[#0A1C43] px-6 py-8"
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
